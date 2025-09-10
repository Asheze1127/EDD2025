
import { notFound } from 'next/navigation';
import RouteDetailClientPage from './RouteDetailClientPage';
import { Route } from '@/types';

// This function generates static paths at build time.
export async function generateStaticParams() {
  // In a real app, you would fetch all route IDs from your database here.
  // Returning an empty array since we don't have a data source yet.
  return [];
}

async function getRouteById(id: string): Promise<Route | null> {
  // In a real app, you would fetch the specific route data from your API/DB here.
  // For now, we return null as we don't have a data source.
  return null;
}

// This is the server component page.
export default async function RouteDetailPage({ params }: { params: { id: string } }) {
  const route = await getRouteById(params.id);

  // If the route is not found, render the 404 page.
  if (!route) {
    notFound();
  }

  // Render the client component and pass the route data as a prop.
  return <RouteDetailClientPage route={route} />;
}
