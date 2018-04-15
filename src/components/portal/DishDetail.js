import React from 'react';
import styles from './DishDetail.less';
import addsvg from '../../assets/svg/add.svg';
import minussvg from '../../assets/svg/minus.svg';
import collectsvg from '../../assets/svg/collect.svg';
import collectactivesvg from '../../assets/svg/collect-active.svg';
import cartsvg from '../../assets/svg/cart-fill.svg';
import { WingBlank, WhiteSpace } from 'antd-mobile';

const DishDetail = ({detail, changeCollect,addToCart,reduceToCart}) => {

  return (
    <div className={styles['dish-detail']}>
      <div className={styles.img}><img src={detail.pic} alt=""/></div>
      <WhiteSpace/>
      <WingBlank>
      <div className={styles.dishname}>{detail.name}</div>
      <div className={styles.salecount}>销量&nbsp;{detail.saleCount} &nbsp;剩余数量&nbsp;{detail.num}</div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <div className={styles.price}>&yen;{detail.price}</div>
        </div>
        <div className={styles.right}>
            <div className={styles.cart} onClick={()=>addToCart(detail)} style={{'display' : detail.selectedCount===0?'inline':'none'}}>
              <img src={cartsvg} alt=""/><span style={{paddingLeft:6}}>加入购物车</span>
            </div>
            <div className={styles.addorplus} style={{'display' : detail.selectedCount===0?'none':'inline'}}>
              <img src={minussvg} alt="" onClick={()=>reduceToCart(detail)}/>
              <span className={styles.count}>{detail.selectedCount}</span>
              <img src={addsvg} alt="" onClick={()=>addToCart(detail)}/>
            </div>
            <div className={styles.collect} style={{display: detail.isCollect === true ? 'none' : 'inline'}} onClick={()=>changeCollect(detail.id,true)}>
              <img src={collectsvg} alt=""/>
            </div>
            <div className={styles.collect} style={{display: detail.isCollect === true ? 'inline' : 'none'}} onClick={()=>changeCollect(detail.id,false)}>
              <img src={collectactivesvg} alt=""/>
            </div>
        </div>
      </div>
      </WingBlank>
    </div>
  )
};

export default DishDetail;
