import TopBar from "./components/ui/TopBar"
import Navbar from "./components/ui/Navbar"
import HeroCarousel from "./components/ui/HeroCarousel"
import HeroContent from "./components/ui/HeroContent"
import AnimateInView from "./components/ui/AnimateInView"
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
      <section className="flex flex-col md:flex-row md:h-[650px] lg:h-[800px]">
        <HeroContent />
        <HeroCarousel />
      </section>

      {/* Shop by Category */}
      <section className="px-4 sm:px-8 lg:px-16 pt-12 pb-12 lg:pt-20 lg:pb-20" style={{ background: "var(--background)" }}>

        <AnimateInView className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 lg:mb-10">
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
                Our Collections
              </span>
            </div>
            <h2 className="section-heading" style={{ color: "var(--foreground)" }}>
              Shop by Category
            </h2>
          </div>
          <a href="#" className="view-all-link self-start sm:self-auto">View all collections</a>
        </AnimateInView>

        {/* Category grid */}
        <div className="category-grid">
          <AnimateInView className="md:row-span-2" variant="scale" delay={0.05}>
            <ProductCategoryCard
              title="Skincare"
              description="Rituals for radiant skin"
              imageUrl="/images/skincare.jpeg"
            />
          </AnimateInView>

          <AnimateInView variant="scale" delay={0.15}>
            <ProductCategoryCard
              title="Hair Care"
              description="Nourish from root to tip"
              imageUrl="/images/hair.jpeg"
            />
          </AnimateInView>

          <AnimateInView variant="scale" delay={0.25}>
            <ProductCategoryCard
              title="Fragrances"
              description="Scents that linger"
              imageUrl="/images/fragrance.jpeg"
            />
          </AnimateInView>

          <AnimateInView variant="scale" delay={0.2} >
            <ProductCategoryCard
              title="Makeup"
              description="Define your look"
              imageUrl="/images/Makeup.jpeg"
            />
          
          </AnimateInView>

           <AnimateInView variant="scale" delay={0.2} >
            <ProductCategoryCard
              title="Makeup"
              description="Define your look"
              imageUrl="/images/Makeup.jpeg"
            />
          
          </AnimateInView>
        </div>

      </section>


      {/* Best Selling Rituals */}
      <section className="px-4 sm:px-8 lg:px-16 pt-12 pb-16 lg:pt-20 lg:pb-24" style={{ background: "var(--surface-muted)" }}>

        <AnimateInView className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 lg:mb-10">
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
            <h2 className="section-heading" style={{ color: "var(--foreground)" }}>
              Best Selling Rituals
            </h2>
          </div>
          <a href="#" className="view-all-link self-start sm:self-auto">Shop all products</a>
        </AnimateInView>

        {/* Product grid */}
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
          {STATIC_PRODUCTS.map((product, i) => (
            <AnimateInView key={product.id} delay={i * 0.08} variant="up">
              <ProductCard {...product} />
            </AnimateInView>
          ))}
        </div>
      </section>

      {/* Philosophy Banner Section */}
      <section className="flex flex-col md:flex-row">

        <AnimateInView
          variant="left"
          className="w-full md:w-1/2 flex flex-col justify-center px-6 py-14 sm:px-10 md:px-16 md:py-20 gap-8"
          style={{ background: "var(--burgundy)" }}
          amount={0.15}
        >
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

          <h2 style={{
            fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
            lineHeight: 1.15,
            color: "#ffffff",
          }}>
            Beauty is a<br />
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>ritual, not a rush.</em>
          </h2>

          <p style={{
            fontFamily: "var(--font-sans), 'Jost', sans-serif",
            fontSize: "0.85rem",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.65)",
            maxWidth: "380px",
          }}>
            Nakyl was born from a simple belief — that every woman deserves skincare that honours her skin&apos;s intelligence. We formulate with intention, source with integrity, and create with love.
          </p>

          <span style={{ display: "block", width: "100%", height: 1, background: "rgba(255,255,255,0.12)" }} />

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
        </AnimateInView>

        <AnimateInView
          variant="right"
          className="w-full md:w-1/2 flex items-center justify-center px-6 py-14 sm:px-10 md:px-16 md:py-20"
          style={{ background: "var(--burgundy-dark)" }}
          amount={0.15}
        >
          <div className="flex flex-col items-center text-center gap-6" style={{ maxWidth: "420px" }}>
            <span style={{
              fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
              fontSize: "5rem",
              lineHeight: 0.6,
              color: "rgba(212,175,106,0.35)",
              alignSelf: "center",
            }}>&ldquo;</span>

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

            <span style={{ display: "block", width: 48, height: 1, background: "var(--gold)", opacity: 0.5 }} />

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
        </AnimateInView>

      </section>

      <Testimonials />
      <NewsletterBanner />

    </div>
  )
}
