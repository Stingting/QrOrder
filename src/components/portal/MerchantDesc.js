import React from 'react';
import {Carousel} from 'antd';
import styles from './MerchantDesc.less'

const MerchantDesc = ({pic,name,desc}) => {
  const carouselPics = pic.map(p => <div><img src={p} width='100%'/></div>);
  return (
    <div>
      <div className={styles["merchant-head"]}>
          <div className={styles.name}>{name}</div>
          <div className={styles.desc}>{desc}</div>
      </div>
      <div>
        <Carousel autoplay className={styles.carousel}>
          {carouselPics}
        </Carousel>
      </div>
    </div>
  )
};

export default MerchantDesc;
