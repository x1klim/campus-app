import { useRef, useEffect, useState, useLayoutEffect } from 'react';
import styles from './SwipeableContainer.module.css';

const SwipeableContainer = ({
  items,
  renderItem,
  onSwipe,
  className,
}) => {
  const containerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  // Use layout effect for synchronous DOM manipulation before paint
  useLayoutEffect(() => {
    if (containerRef.current) {
      // Position to middle synchronously before browser paint
      containerRef.current.scrollLeft =
        containerRef.current.offsetWidth;
    }
  }, [items]);

  useEffect(() => {
    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  const handleScroll = () => {
    if (!containerRef.current) return;

    if (!isScrolling) {
      setIsScrolling(true);
    }

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    const timeout = setTimeout(() => {
      setIsScrolling(false);

      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - containerWidth;

      const TRIGGER_BUFFER = 10;
      const isAtStart = scrollLeft < TRIGGER_BUFFER;
      const isAtEnd = maxScroll - scrollLeft < TRIGGER_BUFFER;

      if (isAtStart) {
        onSwipe(-1);
      } else if (isAtEnd) {
        onSwipe(1);
      }
    }, 150);

    setScrollTimeout(timeout);
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className || ''}`}
      onScroll={handleScroll}
    >
      {items.map((item, index) => (
        <div
          key={`${item.id || index}`}
          className={styles.item}
          data-index={index}
          data-id={item.id || ''}
        >
          {renderItem(item, index === 1)}
        </div>
      ))}
    </div>
  );
};

export default SwipeableContainer;
