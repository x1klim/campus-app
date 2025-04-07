import { useState } from 'react';
import {
  getClassTypeLabel,
  formatTeacherName,
  formatSubjectName,
  formatLocation,
} from '../../utils/scheduleUtils';
import styles from './ClassCard.module.css';
export const ClassCard = ({ classItem, preExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(preExpanded);

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
        </div>
        <div className={styles.mainInfoTrailing}>
          <span className={styles.timeSlot}>
            {classItem.time_slot.name}
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
    // <div className={styles.container}>
    //   <div className={styles.timeColumn}>
    //     <div className={styles.time}>
    //       {formatTime(classItem.time_slot.start_time)}
    //     </div>
    //     <div className={styles.duration}>
    //       {formatTime(classItem.time_slot.start_time)} -{' '}
    //       {formatTime(classItem.time_slot.end_time)}
    //     </div>
    //   </div>

    //   <div className={styles.content}>
    //     <div className={styles.header}>
    //       <h3 className={styles.subject}>
    //         {formatSubjectName(classItem.subject)}
    //       </h3>
    //       <span className={styles.badge}>
    //         {getClassTypeLabel(classItem.class_type)}
    //       </span>
    //     </div>

    //     <div className={styles.details}>
    //       <div className={styles.teacher}>
    //         <svg
    //           className={styles.icon}
    //           viewBox="0 0 24 24"
    //           fill="none"
    //           stroke="currentColor"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth={2}
    //             d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    //           />
    //         </svg>
    //         {formatTeacherName(classItem.teacher)}
    //       </div>

    //       <div className={styles.location}>
    //         <svg
    //           className={styles.icon}
    //           viewBox="0 0 24 24"
    //           fill="none"
    //           stroke="currentColor"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth={2}
    //             d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    //           />
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth={2}
    //             d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    //           />
    //         </svg>
    //         {formatLocation(classItem.location)}
    //       </div>

    //       {classItem.subgroup && (
    //         <div className={styles.subgroup}>
    //           <svg
    //             className={styles.icon}
    //             viewBox="0 0 24 24"
    //             fill="none"
    //             stroke="currentColor"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    //             />
    //           </svg>
    //           Subgroup {classItem.subgroup}
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};
