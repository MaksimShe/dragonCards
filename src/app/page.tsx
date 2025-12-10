'use client';

import dynamic from 'next/dynamic';

const ResponsiveLayout = dynamic(() => import('./ResponsiveLayout'), {
  ssr: false,
});

export default function Home() {
  return <ResponsiveLayout />;
}