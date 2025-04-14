import { fetchRateLimit } from '@api/rateLimitApi';
import type { GitHubRateLimit } from '@type/githubTypes';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { useEffect, useState } from 'react';

export function RateLimitStatus() {
  const [rate, setRate] = useState<GitHubRateLimit['rate'] | null>(null);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const data = await fetchRateLimit();
      setRate(data);
      setError(false);
    } catch (err) {
      console.error('Failed to fetch rate limit:', err);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="fixed top-0 right-0 left-0 z-50 bg-gray-800 p-2 text-center text-sm text-white shadow">
        ⚠️ Rate limit 정보를 불러올 수 없습니다.
      </div>
    );
  }

  if (!rate) return null;

  const { limit, remaining, reset } = rate;
  const ratio = remaining / limit;

  const resetTimeFormatted = format(
    new Date(reset * 1000),
    'yyyy-MM-dd HH:mm:ss'
  );
  const resetDistance = formatDistanceToNowStrict(new Date(reset * 1000));

  const getBannerStyle = () => {
    if (ratio < 0.1) return 'bg-red-500 text-white';
    if (ratio < 0.3) return 'bg-orange-400 text-white';
    return 'bg-green-500 text-white';
  };

  return (
    <div
      className={`fixed top-0 right-0 left-0 z-50 p-2 text-center text-sm shadow ${getBannerStyle()}`}
    >
      <span title={`초기화 시간: ${resetTimeFormatted}`}>
        💡 남은 API 요청: {remaining}/{limit}, 초기화까지 약 {resetDistance}{' '}
        남음
      </span>
    </div>
  );
}
