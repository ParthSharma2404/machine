import poolsData from '../../../data/pools.json';
import PoolDetailClient from './PoolDetailClient';

export function generateStaticParams() {
  return poolsData.map((pool) => ({
    id: pool.pool,
  }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const pool = poolsData.find((p) => p.pool === resolvedParams.id);
  
  if (!pool) {
    return <div>Pool not found</div>;
  }

  return <PoolDetailClient pool={pool} />;
}
