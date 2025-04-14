import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './InstallPWAView.module.css';
import campusBetaLogo from '../assets/campus_beta.png';

function InstallPWAView() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Skip in development mode or if already installed
  const isDevelopment = import.meta.env.MODE === 'development';
  const bypassPrompt =
    localStorage.getItem('pwa-install-bypass') === 'true';

  useEffect(() => {
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (isDevelopment && bypassPrompt)
    ) {
      navigate('/');
    }
  }, [navigate, bypassPrompt, isDevelopment]);

  const handleBypassPrompt = () => {
    localStorage.setItem('pwa-install-bypass', 'true');
    navigate('/');
  };

  // Detect platform
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (/Macintosh/i.test(navigator.userAgent) &&
      navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(navigator.userAgent);

  let platformKey = 'desktop';
  if (isIOS) platformKey = 'ios';
  if (isAndroid) platformKey = 'android';

  return (
    <>
      <div className={styles.hero}>
        <img
          src={campusBetaLogo}
          alt="Campus Logo"
          className={styles.logo}
        />
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('install.title')}</h1>
        <p className={styles.description}>
          {t('install.description')}
        </p>

        <div className={styles.instructions}>
          <ol>
            {[1, 2, 3].map((step) => (
              <li key={step}>
                {t(`install.${platformKey}.step${step}`)}
              </li>
            ))}
          </ol>
        </div>

        <button
          className={styles.continueButton}
          onClick={handleBypassPrompt}
        >
          {t('install.continue')}
        </button>
      </div>
    </>
  );
}

export default InstallPWAView;
