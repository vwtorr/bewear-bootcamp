"use client";
import { productTable, productVariantTable } from "@/db/schema";
import ProductItem from "./product-item";
import { useRef, useState, MouseEvent, TouchEvent, useCallback } from "react";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Função para iniciar o drag (mouse ou touch)
  const handleDragStart = useCallback((clientX: number) => {
    if (!scrollRef.current) return;
    
    setIsDragging(true);
    setStartX(clientX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }, []);

  // Função para processar o movimento do drag
  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging || !scrollRef.current) return;
    
    const x = clientX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Velocidade do scroll
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  // Função para finalizar o drag
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handlers para mouse
  const handleMouseDown = (e: MouseEvent) => {
    handleDragStart(e.pageX);
    e.preventDefault(); // Previne seleção de texto
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleDragMove(e.pageX);
    }
  };

  // Handlers para touch (mobile)
  const handleTouchStart = (e: TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) {
      e.preventDefault(); // Previne scroll da página
      handleDragMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="px-5 font-semibold">{title}</h3>
      <div
        ref={scrollRef}
        className={`flex w-full gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden select-none touch-pan-x ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
        style={{
          scrollBehavior: isDragging ? 'auto' : 'smooth',
        }}
      >
        {products.map((product) => (
          <div 
            key={product.id} 
            className="flex-shrink-0 w-64 min-w-64"
            style={{ 
              pointerEvents: isDragging ? 'none' : 'auto',
              userSelect: 'none' 
            }}
          >
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;