import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";

import ProtectedLayout from "../components/ProtectedLayout";

import DashboardPage from "../pages/DashboardPage";
import PortfolioPage from "../pages/PortfolioPage";
import MarketsPage from "../pages/MarketsPage";
import WatchlistPage from "../pages/WatchlistPage";
import TransactionsPage from "../pages/TransactionsPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import NewsPage from "../pages/NewsPage";
import AlertsPage from "../pages/AlertsPage";
import LearningHubPage from "../pages/LearningHubPage";
import SettingsPage from "../pages/SettingsPage";

// ⭐ NEW IMPORTS — API Key pages
import AddApiKeyPage from "../pages/AddApiKeyPage";
import ApiKeysListPage from "../pages/ApiKeysListPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/markets" element={<MarketsPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/learning" element={<LearningHubPage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* ⭐ NEW API KEY ROUTES */}
          <Route path="/add-key" element={<AddApiKeyPage />} />
          <Route path="/keys" element={<ApiKeysListPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
