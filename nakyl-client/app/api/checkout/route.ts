import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@/app/lib/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { items, shippingAddress } = await request.json()

    // Verify the user is authenticated — use server session, never trust client-passed userId
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = user.id

    const shipping = items.reduce((sum: number, i: { price: number; quantity: number }) =>
      sum + i.price * i.quantity, 0) >= 3000 ? 0 : 350

    // Build Stripe line items from cart
    const lineItems = items.map((item: {
      name: string
      image_url: string
      price: number
      quantity: number
    }) => ({
      price_data: {
        currency: "kes",
        product_data: {
          name: item.name,
          images: item.image_url.startsWith("http") ? [item.image_url] : [],
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses smallest currency unit
      },
      quantity: item.quantity,
    }))

    // Create order record in Supabase with status "pending"
    const totalAmount = items.reduce(
      (sum: number, i: { price: number; quantity: number }) => sum + i.price * i.quantity, 0
    ) + shipping

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        status: "pending",
        total_amount: totalAmount,
        shipping_address: shippingAddress,
      })
      .select()
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
    }

    // Insert order items — only pass product_id if it's a valid UUID
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    const orderItems = items.map((item: {
      id: string
      price: number
      quantity: number
    }) => ({
      order_id: order.id,
      product_id: UUID_REGEX.test(item.id) ? item.id : null,
      quantity: item.quantity,
      unit_price: item.price,
    }))

    await supabase.from("order_items").insert(orderItems)

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
      metadata: {
        order_id: order.id,
        user_id: userId,
      },
      ...(shipping > 0 && {
        shipping_options: [{
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: shipping * 100, currency: "kes" },
            display_name: "Standard Delivery",
          },
        }],
      }),
    })

    // Save the Stripe session ID to the order
    await supabase
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
