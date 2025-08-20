"use client";
import { productTable, productVariantTable } from "@/db/schema";
import ProductItem from "./product-item";
import { useRef, useState, MouseEvent, TouchEvent, useCallback, useEffect } from "react";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
  sectionClassName?: string;
}

const ProductList = ({ title, products, sectionClassName }: ProductListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [initialScrollLeft, setInitialScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  // Função para atualizar o scroll de forma suave
  const updateScroll = useCallback((clientX: number) => {
    if (!scrollRef.current || !isDragging) return;
    
    const deltaX = startX - clientX;
    const newScrollLeft = initialScrollLeft + deltaX;
    
    scrollRef.current.scrollLeft = newScrollLeft;
    
    // Se moveu mais de 5px, considera como drag
    if (Math.abs(deltaX) > 5) {
      setHasMoved(true);
    }
  }, [isDragging, startX, initialScrollLeft]);

  // Mouse handlers
  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (!scrollRef.current) return;
    
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    setInitialScrollLeft(scrollRef.current.scrollLeft);
    
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    e.preventDefault();
    setCurrentX(e.clientX);
    updateScroll(e.clientX);
  }, [isDragging, updateScroll]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    
    // Pequeno delay para permitir que clicks sejam processados corretamente
    setTimeout(() => {
      setHasMoved(false);
    }, 50);
  }, []);

  // Touch handlers
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!scrollRef.current) return;
    
    const touch = e.touches[0];
    setIsDragging(true);
    setHasMoved(false);
    setStartX(touch.clientX);
    setCurrentX(touch.clientX);
    setInitialScrollLeft(scrollRef.current.scrollLeft);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    setCurrentX(touch.clientX);
    updateScroll(touch.clientX);
    
    // Previne scroll da página apenas se já detectou movimento
    if (hasMoved) {
      e.preventDefault();
    }
  }, [isDragging, updateScroll, hasMoved]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    
    // Pequeno delay para permitir que clicks sejam processados corretamente
    setTimeout(() => {
      setHasMoved(false);
    }, 50);
  }, []);

  // Previne click se foi um drag
  const handleClick = useCallback((e: MouseEvent) => {
    if (hasMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, [hasMoved]);

  // Cleanup listeners globais quando necessário
  useEffect(() => {
    const handleGlobalMouseMove = (e: globalThis.MouseEvent) => {
      if (isDragging) {
        updateScroll(e.clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, updateScroll, handleMouseUp]);

  return (
    <div className="space-y-6">
      <h3 className={`px-5 font-semibold ${sectionClassName}`}>{title}</h3>
      <div
        ref={scrollRef}
        className={`flex w-full gap-4 overflow-x-auto group ${sectionClassName || ''} no-scrollbar select-none touch-pan-x ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onClick={handleClick}
      >
        {products.map((product) => (
          <div 
            key={product.id} 
            className="flex-shrink-0 w-64 min-w-64"
            style={{ 
              pointerEvents: hasMoved ? 'none' : 'auto',
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