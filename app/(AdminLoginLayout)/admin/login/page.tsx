'use client';

import {useEffect, useState} from 'react';
import {Loader2} from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('admin-auth='));
    if (cookie && cookie.split('=')[1] === 'true') {
      window.location.href = '/admin';
    }
  }, []);

  const submit = async () => {
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({password}),
    });

    if (res.ok) {
      window.location.href = '/admin';
      return;
    }

    setError('비밀번호가 올바르지 않습니다.');
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
      <div className="w-full max-w-sm backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">

        <h1 className="text-2xl font-semibold text-white text-center mb-6 tracking-tight">
          관리자 로그인
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
          />

          {error && (
            <p className="text-red-400 text-sm mt-1 text-center">{error}</p>
          )}

          <button
            onClick={submit}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                로그인 중...
              </>
            ) : (
              '로그인'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
