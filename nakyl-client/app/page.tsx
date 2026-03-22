import Image from "next/image"
import TopBar from "./components/ui/TopBar"
import Navbar from "./components/ui/Navbar"
import ProductCategoryCard from "./components/ui/ProductCategoryCard"
import ProductCard from "./components/product/ProductCard"
import { STATIC_PRODUCTS } from "./data/products"
import Testimonials from "./components/ui/Testimonials"
import NewsletterBanner from "./components/ui/NewsletterBanner"


export default function Home(){
  return(
    <div>
      <TopBar/>
      <Navbar/>
      {/* Hero Section */}
      <section className="flex h-200">
        <div className="bg-primary text-white w-1/2 flex flex-col justify-center px-16 py-24 gap-6">
          <p className="text-xs tracking-[0.3em] uppercase text-white/60">Nakyl Beauty</p>
          <h1 className="text-5xl font-light leading-tight">Rituals that<br />transform.</h1>
          <p className="text-sm leading-relaxed text-white/70 max-w-sm">Luxury beauty rooted in science — formulated for the woman who refuses to compromise. Each product is a ritual, not just a routine.</p>
          <button className="mt-2 self-start bg-black text-white text-xs tracking-widest uppercase px-8 py-4">Explore collection</button>
        </div>
        <div className="relative w-1/2">
          <Image
            src="/images/model1.jpeg"
            alt="Nakyl model"
            width={1000}
            height={800}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/90 to-transparent" />
        </div>
      </section> 
      
        {/* Shop by Category */}
      <section className="px-16 pt-20 pb-20" style={{ background: "var(--background)" }}>

        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div className="flex flex-col gap-3">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span style={{ display: "block", width: 32, height: 1, background: "var(--gold)" }} />
              <span style={{
                fontFamily: "var(--font-sans), 'Jost', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--text-taupe)",
              }}>
                Our Collections
              </span>
            </div>

            {/* Heading */}
            <h2 style={{
              fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "2.6rem",
              letterSpacing: "0.04em",
              color: "var(--foreground)",
              lineHeight: 1.1,
            }}>
              Shop by Category
            </h2>
          </div>

          {/* View all link */}
          <a href="#" className="view-all-link">
            View all collections
          </a>
        </div>

        {/* Category grid */}
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "320px 320px" }}
          >
            {/* Skincare — tall, spans both rows */}
            <div className="row-span-2">
              <ProductCategoryCard
                title="Skincare"
                description="Rituals for radiant skin"
                imageUrl="/images/skincare.jpeg"
              />
            </div>

            {/* Hair Care — top middle */}
            <ProductCategoryCard
              title="Hair Care"
              description="Nourish from root to tip"
              imageUrl="/images/hair.jpeg"
            />

            {/* Fragrances — top right */}
            <ProductCategoryCard
              title="Fragrances"
              description="Scents that linger"
              imageUrl="/images/fragrance.jpeg"
            />

            {/* Makeup — bottom, spans middle + right columns */}
            <div className="col-span-2">
              <ProductCategoryCard
                title="Makeup"
                description="Define your look"
                imageUrl="/images/Makeup.jpeg"
              />
            </div>
          </div>

      </section>


      {/* Best Selling Rituals */}
      <section className="px-16 pt-20 pb-24" style={{ background: "var(--surface-muted)" }}>

        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span style={{ display: "block", width: 32, height: 1, background: "var(--gold)" }} />
              <span style={{
                fontFamily: "var(--font-sans), 'Jost', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--text-taupe)",
              }}>
                most loved
              </span>
            </div>
            <h2 style={{
              fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "2.6rem",
              letterSpacing: "0.04em",
              color: "var(--foreground)",
              lineHeight: 1.1,
            }}>
              Best Selling Rituals
            </h2>
          </div>
          <a href="#" className="view-all-link">Shop all products</a>
        </div>

      {/* Product grid */}
      <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
        {STATIC_PRODUCTS.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>

    {/* Philosophy Banner Section */}
    <section className="flex min-h-130">

      {/* Left side */}
      <div className="w-1/2 flex flex-col justify-center px-16 py-20 gap-8" style={{ background: "var(--burgundy)" }}>

        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <span style={{ display: "block", width: 32, height: 1, background: "var(--gold)" }} />
          <span style={{
            fontFamily: "var(--font-sans), 'Jost', sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
          }}>
            Our Philosophy
          </span>
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: "2.8rem",
          lineHeight: 1.15,
          color: "#ffffff",
        }}>
          Beauty is a<br />
          <em style={{ color: "var(--gold)", fontStyle: "italic" }}>ritual, not a rush.</em>
        </h2>

        {/* Description */}
        <p style={{
          fontFamily: "var(--font-sans), 'Jost', sans-serif",
          fontSize: "0.85rem",
          lineHeight: 1.8,
          color: "rgba(255,255,255,0.65)",
          maxWidth: "380px",
        }}>
          Nakyl was born from a simple belief — that every woman deserves skincare that honours her skin&apos;s intelligence. We formulate with intention, source with integrity, and create with love.
        </p>

        {/* Divider */}
        <span style={{ display: "block", width: "100%", height: 1, background: "rgba(255,255,255,0.12)" }} />

        {/* CTA Button */}
        <button style={{
          alignSelf: "flex-start",
          background: "transparent",
          border: "1px solid var(--gold)",
          color: "var(--gold)",
          padding: "14px 32px",
          fontSize: "0.65rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          fontFamily: "var(--font-sans), 'Jost', sans-serif",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          transition: "background 0.25s, color 0.25s",
        }}>
          Read Our Story
          <span style={{ fontSize: "0.85rem" }}>→</span>
        </button>
      </div>

      {/* Right side */}
      <div className="w-1/2 flex items-center justify-center px-16 py-20" style={{ background: "var(--burgundy-dark)" }}>
        <div className="flex flex-col items-center text-center gap-6" style={{ maxWidth: "420px" }}>

          {/* Decorative quote mark */}
          <span style={{
            fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
            fontSize: "5rem",
            lineHeight: 0.6,
            color: "rgba(212,175,106,0.35)",
            alignSelf: "center",
          }}>&ldquo;</span>

          {/* Quote text */}
          <p style={{
            fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "1.6rem",
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.88)",
            letterSpacing: "0.02em",
          }}>
            Every ingredient tells a story. Every formula is a love letter to your skin.
          </p>

          {/* Thin divider */}
          <span style={{ display: "block", width: 48, height: 1, background: "var(--gold)", opacity: 0.5 }} />

          {/* Attribution */}
          <p style={{
            fontFamily: "var(--font-sans), 'Jost', sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
          }}>
            Nakyl Founder &nbsp;·&nbsp; Nairobi, Kenya
          </p>
        </div>
      </div>

    </section>
    
   
    <Testimonials />

  {/* NewsLetter banner */}
  <NewsletterBanner />


    </div>
  )
}