import { useState } from 'react';
import { ScheduleProvider } from './contexts/ScheduleContext';
import TodayView from './views/TodayView';
import ScheduleView from './views/ScheduleView';
import SettingsView from './views/SettingsView';
import TabBar from './components/navigation/TabBar';
import styles from './App.module.css';

function App() {
  const [activeTab, setActiveTab] = useState('schedule');

  const renderActiveView = () => {
    switch (activeTab) {
      case 'today':
        return <TodayView />;
      case 'schedule':
        return <ScheduleView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <ScheduleView />;
    }
  };

  return (
    <ScheduleProvider>
      <div className={styles.appContainer}>
        <div className={styles.viewContainer}>
          {renderActiveView()}
        </div>
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </ScheduleProvider>
  );
}

export default App;
