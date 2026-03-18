import React, { Suspense } from 'react';
import ProductsContent from './ProductsContent';

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-40 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
