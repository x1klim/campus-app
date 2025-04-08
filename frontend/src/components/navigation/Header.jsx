import { useEffect, useState, useCallback } from 'react';
import styles from './Header.module.css';

const SCROLL_THRESHOLD = 16;

const Header = ({ title, constantBorder = false, children }) => {
  const [hasBorder, setHasBorder] = useState(constantBorder);

  const handleScroll = useCallback(() => {
    if (constantBorder) return;
    const scrollPosition = window.scrollY;
    setHasBorder(scrollPosition > SCROLL_THRESHOLD);
  }, [constantBorder]);

  useEffect(() => {
    if (constantBorder) return;
    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [constantBorder, handleScroll]);

  return (
    <div
      className={`${styles.header} ${
        hasBorder ? styles.withBorder : ''
      }`}
    >
      <h1 className={styles.title}>{title}</h1>
      {children}
    </div>
  );
};

export default Header;
