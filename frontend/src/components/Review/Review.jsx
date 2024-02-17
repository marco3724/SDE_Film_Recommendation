import ReadMore from "../ReadMore/ReadMore";
import styles from './review.module.scss';
function Review({review, index}) {
  return (
       <div className={styles.review} key={index}>
            <div className={styles.header}>
                <div className={styles.right}>
                    <div className={styles.author}>{review.author}</div>
                    <div className={styles.time}>{review.time}</div>
                </div>
                <div className={styles.rating}>{review.rating}<span>/10</span></div>
            </div>
            <div><ReadMore maxLength={300}>{review.content}</ReadMore></div>
            
            
        </div>
  );
}
export default Review;