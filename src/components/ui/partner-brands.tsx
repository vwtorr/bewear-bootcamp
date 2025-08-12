type PartnerBrandCardProps = {
  image: string;
  name: string;
};

const ParnerBrandCard = ({ image, name }: PartnerBrandCardProps) => {
  return (
    <div className="flex flex-col items-center gap-2 flex-shrink-0">
      <div className="flex h-28 w-50 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
        <img
          src={image}
          alt={name}
          className="max-h-[60%] max-w-[60%] object-contain"
        />
      </div>
      <span className="text-sm text-gray-700">{name}</span>
    </div>
  );
};

export default function PartnerBrands() {
  const brands = [
    { name: "Nike", image: "/nike.png" },
    { name: "Adidas", image: "/adidas.png" },
    { name: "Puma", image: "/puma.png" },
    { name: "New Balance", image: "/new-balance.png" },
    { name: "Converse", image: "/converse.png" },
    { name: "Polo", image: "/polo.png" },
    { name: "Zara", image: "/zara.png" },
  ];

  return (
    <section className="py-8">
      <h2 className="mb-6 px-5 font-semibold">Marcas parceiras</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-14">
        {brands.map((brand) => (
          <ParnerBrandCard
            key={brand.name}
            image={brand.image}
            name={brand.name}
          />
        ))}
      </div>
    </section>
  );
}