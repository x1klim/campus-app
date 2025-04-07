import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { ScheduleProvider } from './contexts/ScheduleContext';
import TodayView from './views/TodayView';
import ScheduleView from './views/ScheduleView';
import SettingsView from './views/SettingsView';
import TabBar from './components/navigation/TabBar';
import styles from './App.module.css';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path === '/schedule') return 'schedule';
    if (path === '/settings') return 'settings';
    return 'today';
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case 'today':
        navigate('/');
        break;
      case 'schedule':
        navigate('/schedule');
        break;
      case 'settings':
        navigate('/settings');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.viewContainer}>
        <Routes>
          <Route path="/" element={<TodayView />} />
          <Route path="/schedule" element={<ScheduleView />} />
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </div>
      <TabBar activeTab={activeTab} setActiveTab={handleTabChange} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScheduleProvider>
        <AppContent />
      </ScheduleProvider>
    </Router>
  );
}

export default App;
