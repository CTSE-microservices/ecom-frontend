import React, { Suspense } from 'react';
import ProductsContent from './ProductsContent';

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-40 flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#E63022]/25 border-t-[#E63022]" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
