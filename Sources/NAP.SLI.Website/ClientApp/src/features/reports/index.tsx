import React from 'react';
import { Navigate, Route, useSearchParams } from 'react-router-dom';
import { PrivateRoutes } from 'app/routes';
import WinLossDetailPage from './win-loss-detail/Page';
import MatchWinLossDetailPage from './match-win-loss-detail/Page';
import WinLossByBetTypePage from './win-loss-by-bet-type/Page';
import WinLossAnalysisPage from './win-loss-analysis/Page';
import BetListPage from './bet-list/Page';
import BetListByDatePage from './bet-list/date/Page';
import BetListByMatchPage from './bet-list/match/Page';
import BetListByBetTypePage from './bet-list/match/Page';
import ResultsPage from './results/Page';

export const useCustomerParams = (): Customer => {
  const [searchParams] = useSearchParams();
  const custId = parseInt(searchParams.get('custId') || '0', 10);
  const roleId = parseInt(searchParams.get('roleId') || '0', 10);
  const username = searchParams.get('username') || '';
  return {
    custId,
    roleId,
    username,
  };
};

export const ReportsRoutes = () => {
  const { custId, roleId } = useCustomerParams();

  if (custId > 0 && [1, 2, 3, 4].indexOf(roleId) >= 0) {
    return (
      <PrivateRoutes>
        <Route path="win-loss-detail" element={<WinLossDetailPage />} />
        <Route
          path="match-win-loss-detail"
          element={<MatchWinLossDetailPage />}
        />
        <Route path="win-loss-by-bet-type" element={<WinLossByBetTypePage />} />
        <Route path="win-loss-analysis" element={<WinLossAnalysisPage />} />
        <Route path="bet-list">
          <Route index element={<BetListPage />} />
          <Route path="date" element={<BetListByDatePage />} />
          <Route path="match" element={<BetListByMatchPage />} />
          <Route path="bet-type" element={<BetListByBetTypePage />} />
        </Route>
        <Route path="results" element={<ResultsPage />} />
        <Route path="*" element={<Navigate to="." />} />
      </PrivateRoutes>
    );
  } else {
    return <Navigate to="/" />;
  }
};
