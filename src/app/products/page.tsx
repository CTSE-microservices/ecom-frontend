import React, { Suspense } from 'react';
import ProductsContent from './ProductsContent';

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-40 flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#FF3B30]/25 border-t-[#FF3B30]" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
