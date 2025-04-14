import { useState, memo, useEffect, useRef } from 'react';
import * as Motion from 'motion/react';
import {
  getClassTypeLabel,
  formatTeacherName,
  formatSubjectName,
  formatLocation,
  formatTimeSlot,
} from '../../utils/scheduleUtils';
import styles from './ClassCard.module.css';
import i18n from '../../i18n/config';
import { useTranslation } from 'react-i18next';

// Animation variants
const mainButtonVariants = {
  tap: { scale: 0.98 },
};

const expandIconVariants = {
  expanded: { rotate: 180 },
  collapsed: { rotate: 0 },
};

const expandIconTransition = {
  duration: 0.2,
  type: 'spring',
  bounce: 0.2,
};

const subgroupInfoVariants = {
  initial: { height: 0, opacity: 0, filter: 'blur(10px)' },
  animate: {
    height: 'auto',
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      height: {
        duration: 0.3,
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
      opacity: { duration: 0.2 },
      filter: { duration: 0.25, delay: 0.05, clamp: true },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    filter: 'blur(10px)',
    transition: {
      height: { duration: 0.2 },
      opacity: { duration: 0.15 },
      filter: { duration: 0.15, clamp: true },
    },
  },
};

const timeSlotVariants = {
  initial: { opacity: 0, filter: 'blur(5px)' },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.15,
      filter: { duration: 0.15, clamp: true },
    },
  },
  exit: {
    opacity: 0,
    filter: 'blur(5px)',
    transition: {
      duration: 0.1,
      filter: { duration: 0.1, clamp: true },
    },
  },
};

const timeSlotContainerVariants = {
  collapsed: {
    height: '1.15em',
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    },
  },
  expanded: {
    height: '2.4em',
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    },
  },
};

const detailsVariants = {
  initial: {
    height: 0,
    opacity: 0,
    scale: 0.8,
    filter: 'blur(14px)',
    marginTop: 0,
  },
  animate: {
    height: 'auto',
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    marginTop: 5,
    transition: {
      duration: 0.3,
      type: 'spring',
      stiffness: 300,
      damping: 25,
      filter: { duration: 0.3, clamp: true },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    scale: 0.8,
    filter: 'blur(14px)',
    marginTop: 0,
    transition: {
      duration: 0.3,
      type: 'spring',
      stiffness: 300,
      damping: 25,
      filter: { duration: 0.3, clamp: true },
    },
  },
};

const SubgroupInfo = memo(({ subgroup }) => {
  const { t } = useTranslation();

  return (
    <Motion.motion.span
      className={styles.subgroupInfo}
      variants={subgroupInfoVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {t('subgroupInfo', { subgroup })}
    </Motion.motion.span>
  );
});

const ClassDetails = memo(({ classItem }) => {
  return (
    <Motion.motion.div
      className={styles.details}
      variants={detailsVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className={styles.detailsLeading}>
        <span className={styles.location}>
          {formatLocation(classItem.location)}
        </span>
      </div>
      <div className={styles.detailsTrailing}>
        <span>{getClassTypeLabel(classItem.class_type)}</span>
        <span className={styles.detailsSeparator}>∙</span>
        <span className={styles.teacher}>
          {formatTeacherName(classItem.teacher)}
        </span>
      </div>
    </Motion.motion.div>
  );
});

// Time slot component
const TimeSlotDisplay = memo(({ timeSlot, isExpanded }) => {
  const hasRenderedRef = useRef(false);

  // Set hasRendered to true after first render
  useEffect(() => {
    hasRenderedRef.current = true;
  }, []);

  // Only animate transitions after first render
  const getInitialState = () => {
    if (!hasRenderedRef.current) {
      return isExpanded ? 'animate' : 'animate';
    }
    return 'initial';
  };

  return (
    <Motion.motion.div
      className={styles.timeSlotContainer}
      animate={isExpanded ? 'expanded' : 'collapsed'}
      variants={timeSlotContainerVariants}
      initial="collapsed"
    >
      <Motion.AnimatePresence mode="wait">
        {isExpanded ? (
          <Motion.motion.span
            key="expanded-time"
            className={`${styles.timeSlot} ${
              i18n.language === 'en' ? styles.enTimeSlot : ''
            }`}
            variants={timeSlotVariants}
            initial={getInitialState()}
            animate="animate"
            exit="exit"
            dangerouslySetInnerHTML={{
              __html: formatTimeSlot(timeSlot, true),
            }}
          />
        ) : (
          <Motion.motion.span
            key="collapsed-time"
            className={styles.timeSlot}
            variants={timeSlotVariants}
            initial={getInitialState()}
            animate="animate"
            exit="exit"
          >
            {formatTimeSlot(timeSlot)}
          </Motion.motion.span>
        )}
      </Motion.AnimatePresence>
    </Motion.motion.div>
  );
});

// Main component
export const ClassCard = memo(
  ({ classItem, preExpanded = false }) => {
    const [isExpanded, setIsExpanded] = useState(preExpanded);
    const { t } = useTranslation();

    const toggleExpanded = () => {
      setIsExpanded((prev) => !prev);
    };

    const hasSubgroup = Boolean(classItem.subgroup);

    return (
      <Motion.motion.button
        className={styles.container}
        onClick={toggleExpanded}
        whileTap={mainButtonVariants.tap}
        transition={{ duration: 0.2 }}
        aria-expanded={isExpanded}
        aria-label={`${formatSubjectName(classItem.subject)} ${t(
          'class'
        )}`}
      >
        <div className={styles.mainInfo}>
          <div className={styles.mainInfoLeading}>
            <span className={styles.subjectName}>
              {formatSubjectName(classItem.subject)}
            </span>
            <Motion.AnimatePresence>
              {isExpanded && hasSubgroup && (
                <SubgroupInfo subgroup={classItem.subgroup} />
              )}
            </Motion.AnimatePresence>
          </div>
          <div className={styles.mainInfoTrailing}>
            <TimeSlotDisplay
              timeSlot={classItem.time_slot}
              isExpanded={isExpanded}
            />
            <Motion.motion.span
              className={styles.expandIcon}
              variants={expandIconVariants}
              animate={isExpanded ? 'expanded' : 'collapsed'}
              transition={expandIconTransition}
            >
              {'􀆈'}
            </Motion.motion.span>
          </div>
        </div>

        <Motion.AnimatePresence>
          {isExpanded && <ClassDetails classItem={classItem} />}
        </Motion.AnimatePresence>
      </Motion.motion.button>
    );
  }
);
