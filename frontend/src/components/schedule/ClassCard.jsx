import { useState, memo } from 'react';
import * as Motion from 'motion/react';
import {
  getClassTypeLabel,
  formatTeacherName,
  formatSubjectName,
  formatLocation,
  formatTimeSlot,
} from '../../utils/scheduleUtils';
import styles from './ClassCard.module.css';
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
  duration: 0.3,
  type: 'spring',
  bounce: 0.3,
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
      filter: { duration: 0.25, delay: 0.05 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    filter: 'blur(10px)',
    transition: {
      height: { duration: 0.2 },
      opacity: { duration: 0.15 },
      filter: { duration: 0.15 },
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

// Main component
export const ClassCard = memo(
  ({ classItem, preExpanded = false }) => {
    const [isExpanded, setIsExpanded] = useState(preExpanded);
    const { t } = useTranslation();

    const toggleExpanded = () => setIsExpanded((prev) => !prev);

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
            <span className={styles.timeSlot}>
              {formatTimeSlot(classItem.time_slot)}
            </span>
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
