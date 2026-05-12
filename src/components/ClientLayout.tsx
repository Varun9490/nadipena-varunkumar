'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), {
  ssr: false,
});
const Cursor = dynamic(() => import('@/components/Cursor'), {
  ssr: false,
});

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <LoadingScreen />
      <Cursor />
      {children}
    </>
  );
}
