import { dummyRoutes } from '@/data/routes';
import { notFound } from 'next/navigation';
import RouteDetailClientPage from './RouteDetailClientPage';

// This function generates static paths for all routes at build time.
export async function generateStaticParams() {
  return dummyRoutes.map(route => ({ id: route.id }));
}

// This is the server component page.
export default function RouteDetailPage({ params }: { params: { id: string } }) {
  const route = dummyRoutes.find(r => r.id === params.id);

  // If the route is not found, render the 404 page.
  if (!route) {
    notFound();
  }

  // Render the client component and pass the route data as a prop.
  return <RouteDetailClientPage route={route} />;
}