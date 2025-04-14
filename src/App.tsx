import { IssueList } from '@components/IssueList';
import { RateLimitStatus } from '@components/RateLimitStatus';
import { Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <>
      <RateLimitStatus />
      <main className="mx-auto max-w-2xl p-6 pt-16">
        {' '}
        <h1 className="mb-4 text-2xl font-bold">📝 GitHub 이슈 목록</h1>
        <Routes>
          <Route path="/" element={<IssueList />} />
          <Route path="/issues/:issueNumber" element={<IssueList />} />
          <Route path="/issues/new" element={<IssueList />} />
        </Routes>
      </main>
    </>
  );
}
