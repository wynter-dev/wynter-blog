'use client';

interface PageSizeSelectProps {
  pageSize: number;
}

export default function PageSizeSelect({pageSize}: PageSizeSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">보기 개수:</span>
      <select
        defaultValue={pageSize}
        onChange={(e) => {
          const size = e.target.value;
          window.location.href = `?pageSize=${size}`;
        }}
        className="border rounded-md px-2 py-1 text-sm"
      >
        {[10, 20, 30, 50].map((opt) => (
          <option key={opt} value={opt}>
            {opt}개
          </option>
        ))}
      </select>
    </div>

  );
}
