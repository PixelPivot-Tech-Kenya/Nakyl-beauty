type ProductCategoryCardProps = {
  title: string;
  description: string;
  imageUrl: string;
};

const ProductCategoryCard: React.FC<ProductCategoryCardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-full">
      {/* Category image */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark overlay — sits at the bottom, bleeds up into the image */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "55%",
          background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 55%, transparent 100%)",
          borderRadius: "0 0 1rem 1rem",
        }}
      />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1">
        <h3
          style={{
            fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "1.55rem",
            letterSpacing: "0.04em",
            color: "#ffffff",
            lineHeight: 1.15,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-sans), 'Jost', sans-serif",
            fontWeight: 400,
            fontSize: "0.7rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.72)",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProductCategoryCard;
