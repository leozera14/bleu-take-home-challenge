'use client';

import { getAllTransactions } from '@/hooks/index';
import { ComponentStateHandler } from '@/utils/component-state-handler';
import { formatNftTimestamp } from '@/utils/format-nft-timestamp';
import { useMemo } from 'react';

export default function Transactions() {
  const { data, error, fetching } = getAllTransactions();

  const rows = useMemo(() => {
    if (!data) return [];
    return [
      ...data.mints.items.map((r) => ({ ...r, type: 'Mint' as const, user: r.to })),
      ...data.stakes.items.map((r) => ({ ...r, type: 'Stake' as const, user: r.staker })),
      ...data.unstakes.items.map((r) => ({ ...r, type: 'Unstake' as const, user: r.staker })),
    ].sort((a, b) => b.createdAt - a.createdAt);
  }, [data]);

  if (fetching) return <ComponentStateHandler loading="Loading all transactions..." />;

  if (error) return <ComponentStateHandler error="Error fetching all transactions..." />;

  if (rows.length === 0) return <ComponentStateHandler length="No transactions to show..." />;

  return (
    <div className="flex flex-col gap-y-6">
      <ul className="space-y-4">
        {rows.map((tx) => (
          <li
            key={tx.id}
            className="border-2 border-primary/20 hover:border-primary/40 p-4 rounded-lg flex justify-between items-center"
          >
            <div className="space-y-1">
              <p className="font-mono">
                {tx.type} #{tx.tokenId}
              </p>
              <p className="text-sm text-muted">
                by {tx.user.slice(0, 12)}…{tx.user.slice(-8)}
              </p>
            </div>
            <div className="text-sm text-sub-text">{formatNftTimestamp(Number(tx.createdAt))}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
