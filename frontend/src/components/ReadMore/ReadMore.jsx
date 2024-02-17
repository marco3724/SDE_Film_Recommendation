import React, { useState } from 'react';
import styles from './readmore.module.scss';
const ReadMore = ({ children, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div>
      {isTruncated ? (
        <div>
          {children.substring(0, maxLength)+"... "}
          <div className={styles.toggle} onClick={toggleTruncate}>more</div>
        </div>
      ) : (
        <div>
          {children}
          <div className={styles.toggle} onClick={toggleTruncate}>less...</div>
        </div>
      )}
    </div>
  );
};

export default ReadMore;
