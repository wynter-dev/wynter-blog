'use client';

import {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

/* -------------------------------
 * API Response Types
 * ------------------------------ */

interface SummaryResponse {
  today: number;
  yesterday: number;
  diff: number;
}

interface WeeklyRow {
  date: string;
  users: number;
}

export default function AdminAnalyticsPage() {
  const [summary, setSummary] = useState<SummaryResponse>({
    today: 0,
    yesterday: 0,
    diff: 0,
  });
  const [weekly, setWeekly] = useState<WeeklyRow[]>([]);
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    fetch('/api/analytics/active')
      .then(res => res.json())
      .then(data => setActive(data.active30m));

    // Summary
    fetch('/api/analytics/summary')
      .then(res => res.json())
      .then((data: SummaryResponse) => setSummary(data));

    // Weekly
    fetch('/api/analytics/weekly')
      .then(res => res.json())
      .then((rows: Array<{ dimensionValues: { value: string }[]; metricValues: { value: string }[] }>) => {
        const formatted: WeeklyRow[] = rows.map(r => ({
          date: r.dimensionValues[0].value,
          users: Number(r.metricValues[0].value),
        }));
        setWeekly(formatted);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">사용자 지표</h1>
      <Card>
        <CardHeader>
          <CardTitle>방문자 요약</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6 text-lg">
            <div>활성 사용자: {active}</div>
            <div>오늘: {summary?.today}</div>
            <div>어제: {summary?.yesterday}</div>
            <div>
              증감:{' '}
              {summary?.diff >= 0 ? `+${summary?.diff}` : summary?.diff}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Chart */}
      <Card>
        <CardHeader>
          <CardTitle>최근 7일 방문자 추세</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weekly}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#ff4d6d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
}
