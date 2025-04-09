import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ScheduleProvider } from './contexts/ScheduleContext';
import {
  initializeBetaFeatures,
  isBetaFeatureEnabled,
} from './utils/betaFeatures';
import TodayView from './views/TodayView';
import ScheduleView from './views/ScheduleView';
import SettingsView from './views/SettingsView';
import InstallPWAView from './views/InstallPWAView';
import TabBar from './components/navigation/TabBar';
import styles from './App.module.css';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    // If Today tab is hidden in beta and we're on that page, redirect to schedule
    if (path === '/today' && isBetaFeatureEnabled('hideTodayTab')) {
      return 'schedule';
    }
    if (path === '/today') return 'today';
    if (path === '/settings') return 'settings';
    return 'schedule';
  });

  // Check if the app is running as a PWA
  const [isPwa, setIsPwa] = useState(false);
  const isDevelopment = import.meta.env.MODE === 'development';
  const bypassPrompt =
    localStorage.getItem('pwa-install-bypass') === 'true';

  useEffect(() => {
    // Check if the app is running in standalone mode (PWA)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone ||
      document.referrer.includes('android-app://');

    setIsPwa(isStandalone);
  }, []);

  // Effect to handle beta features initialization
  useEffect(() => {
    // Initialize beta features (only happens for new users)
    initializeBetaFeatures();

    // If today tab is hidden and we're on today view, redirect to schedule
    if (
      location.pathname === '/today' &&
      isBetaFeatureEnabled('hideTodayTab')
    ) {
      navigate('/');
    }
  }, [location.pathname, navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case 'today':
        navigate('/today');
        break;
      case 'schedule':
        navigate('/');
        break;
      case 'settings':
        navigate('/settings');
        break;
      default:
        navigate('/');
    }
  };

  // If not in PWA mode and not bypassed in development, redirect to install prompt
  if (
    !isPwa &&
    !location.pathname.includes('/install') &&
    !(isDevelopment && bypassPrompt)
  ) {
    return <Navigate to="/install" replace />;
  }

  // Conditionally include or hide the Today tab route
  const hideTodayTab = isBetaFeatureEnabled('hideTodayTab');

  return (
    <div className={styles.appContainer}>
      <div className={styles.viewContainer}>
        <Routes>
          {!hideTodayTab && (
            <Route path="/today" element={<TodayView />} />
          )}
          <Route path="/" element={<ScheduleView />} />
          <Route path="/settings" element={<SettingsView />} />
          <Route path="/install" element={<InstallPWAView />} />
        </Routes>
      </div>
      {(isPwa || (isDevelopment && bypassPrompt)) && (
        <TabBar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          hideTodayTab={hideTodayTab}
        />
      )}
    </div>
  );
}

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('title');
  }, [t]);

  return (
    <Router>
      <ScheduleProvider>
        <AppContent />
      </ScheduleProvider>
    </Router>
  );
}

export default App;
