import poolsData from '../../../data/pools.json';
import PoolDetailClient from './PoolDetailClient';

export function generateStaticParams() {
  return poolsData.map((pool) => ({
    id: pool.pool,
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  const pool = poolsData.find((p) => p.pool === params.id);
  
  if (!pool) {
    return <div>Pool not found</div>;
  }

  return <PoolDetailClient pool={pool} />;
}
