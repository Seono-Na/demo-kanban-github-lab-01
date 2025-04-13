import { Route, Routes } from 'react-router-dom';

import { IssueList } from '@components/IssueList';

export function App() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">📝 GitHub 이슈 목록</h1>
      <Routes>
        <Route path="/" element={<IssueList />} />
        <Route path="/issues/:issueNumber" element={<IssueList />} />
      </Routes>{' '}
    </main>
  );
}