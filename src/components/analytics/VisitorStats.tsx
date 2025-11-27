'use client';

import { useEffect, useState } from 'react';

export default function VisitorStats() {
  const [today, setToday] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    fetch('/api/analytics/visitors')
      .then(res => res.json())
      .then(data => {
        setToday(data.today);
        setTotal(data.total);
      });

    fetch('/api/analytics/active')
      .then(res => res.json())
      .then(data => setActive(data.active30m));
  }, []);

  return (
    <div className="flex flex-col gap-2 text-xs font-medium text-muted-foreground">
      <div className="md:flex hidden items-center whitespace-nowrap gap-1">
        Online
        <strong>{active.toLocaleString()}</strong>
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
      </div>
      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap">
          Today: <strong>{today.toLocaleString()}</strong>
        </span>
        <span className="whitespace-nowrap">
          Total: <strong>{total.toLocaleString()}</strong>
        </span>
      </div>
    </div>
  );
}
