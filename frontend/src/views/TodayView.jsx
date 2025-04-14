import styles from './TodayView.module.css';

const TodayView = () => {
  return (
    <>
      <div className={styles.gradient}></div>
      <div className={styles.container}>
        <div className={styles.resizeHandle}></div>
        <h3 className={styles.title}>После этого</h3>
      </div>
    </>
  );
};

export default TodayView;
