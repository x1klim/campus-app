import styles from './TabBar.module.css';
import { useTranslation } from 'react-i18next';

const TabBar = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();

  const tabs = [
    // {
    //   id: 'today',
    //   label: t('navigation.today'),
    //   icon: '􀎟',
    // },
    {
      id: 'schedule',
      label: t('navigation.schedule'),
      icon: '􀉉',
    },
    {
      id: 'settings',
      label: t('navigation.settings'),
      icon: '􀍟',
    },
  ];

  return (
    <nav className={styles.tabBar}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tabButton} ${
            activeTab === tab.id ? styles.active : ''
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span className={styles.tabIcon}>{tab.icon}</span>
          <span className={styles.tabLabel}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default TabBar;
