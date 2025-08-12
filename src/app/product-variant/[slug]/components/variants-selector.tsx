"use client"

import { productVariantTable } from "@/db/schema";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

interface VariantSelectorProps {
  variants: (typeof productVariantTable.$inferSelect)[];
}

const VariantSelector = ({ variants }: VariantSelectorProps) => {
  const { slug } = useParams();
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link href={`/product-variant/${variant.slug}`} key={variant.id}
        className={slug === variant.slug ? "border border-solid border-primary-500" : ""}
        >
          <Image
            height={68}
            width={68}
            src={variant.imageUrl}
            alt={variant.name}
            className="rounted-xl"
          ></Image>
        </Link>
      ))}
    </div>
  );
};

export default VariantSelector;
