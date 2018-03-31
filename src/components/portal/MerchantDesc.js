import React from 'react';
import styles from './MerchantDesc.less'

const MerchantDesc = ({pic,name,desc}) => {
  const carouselPics = pic.map(p => <div><img src={p} width='100%' alt=''/></div>);
  return (
      <div className={styles["merchant-head"]}>
          <div className={styles.head}><img src={pic[0]} width={80} height={80} alt=''/></div>
          <div className={styles.msg}>
            <div className={styles.name}>{name}</div>
            <div className={styles.desc}>{desc}</div>
          </div>
     {/* <div>
        <Carousel autoplay className={styles.carousel}>
          {carouselPics}
        </Carousel>
      </div>*/}
    </div>
  )
};

export default MerchantDesc;
