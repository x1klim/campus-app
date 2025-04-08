import { useState } from 'react';
import {
  getClassTypeLabel,
  formatTeacherName,
  formatSubjectName,
  formatLocation,
  formatTimeSlot,
} from '../../utils/scheduleUtils';
import styles from './ClassCard.module.css';
import { useTranslation } from 'react-i18next';

export const ClassCard = ({ classItem, preExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(preExpanded);
  const { t } = useTranslation();

  return (
    <button
      className={styles.container}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className={styles.mainInfo}>
        <div className={styles.mainInfoLeading}>
          <span className={styles.subjectName}>
            {formatSubjectName(classItem.subject)}
          </span>
          {classItem.subgroup && (
            <span
              className={`${styles.subgroupInfo} ${
                isExpanded ? styles.subgroupInfoExpanded : ''
              }`}
            >
              {t('subgroupInfo', {
                subgroup: classItem.subgroup,
              })}
            </span>
          )}
        </div>
        <div className={styles.mainInfoTrailing}>
          <span className={styles.timeSlot}>
            {formatTimeSlot(classItem.time_slot)}
          </span>
          <span className={styles.expandIcon}>
            {isExpanded ? '􀆇' : '􀆈'}
          </span>
        </div>
      </div>

      <div
        className={`${styles.details} ${
          isExpanded ? styles.detailsExpanded : ''
        }`}
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
      </div>
    </button>
  );
};
