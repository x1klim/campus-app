import { useMemo } from 'react';
import SwipeableContainer from '../common/SwipeableContainer';
import styles from './SwipeableWeekView.module.css';

const SwipeableWeekView = ({ onWeekChange, renderWeek }) => {
  // Create array with previous week, current week, and next week
  const weeks = useMemo(() => {
    const prevWeekOffset = -1;
    const currentWeekOffset = 0;
    const nextWeekOffset = 1;

    return [prevWeekOffset, currentWeekOffset, nextWeekOffset];
  }, []);

  const handleSwipe = (direction) => {
    onWeekChange(direction);
  };

  return (
    <div className={styles.container}>
      <SwipeableContainer
        items={weeks}
        renderItem={(weekOffset) => (
          <div className={styles.weekWrapper}>
            {renderWeek(weekOffset)}
          </div>
        )}
        onSwipe={handleSwipe}
        className={styles.swipeContainer}
      />
    </div>
  );
};

export default SwipeableWeekView;
