import React from 'react';
import styles from './DishDetail.less';
import {Icon} from 'antd';

const DishDetail = ({detail, changeCollect,addToCart,reduceToCart}) => {

  return (
    <div className={styles['dish-detail']}>
      <div className={styles.img}><img width={150} height={150} src={detail.pic} alt=""/></div>
      <div className={styles.dishname}>{detail.name}</div>
      <div className={styles.salecount}>销量&nbsp;{detail.saleCount} &nbsp;剩余数量&nbsp;{detail.num}</div>
      <div>
        <div className={styles.price}>&yen;{detail.price}</div>
        <div className={styles.operate}>
          <span className={styles.cart} onClick={()=>addToCart(detail.id,detail.type)} style={{'display' : detail.selectedCount===0?'inline':'none'}}>
            <Icon type="shopping-cart" style={{fontSize: 20}}/>加入购物车
          </span>
          <span className={styles.addorplus} style={{'display' : detail.selectedCount===0?'none':'inline'}}>
            <Icon type="minus-circle-o" style={{fontSize: 20}} onClick={()=>reduceToCart(detail.id,detail.type)}/>
            <span className={styles.count}>{detail.selectedCount}</span>
            <Icon type="plus-circle" style={{fontSize: 20, color: 'orange'}} onClick={()=>addToCart(detail.id,detail.type)}/>
          </span>
          <span className={styles.collect} style={{display: detail.isCollect === true ? 'none' : 'inline'}} onClick={()=>changeCollect(detail.id,true)}>
            <Icon type="heart-o" style={{fontSize: 20, color: 'red'}}/>收藏
          </span><span className={styles.collect} style={{display: detail.isCollect === true ? 'inline' : 'none'}} onClick={()=>changeCollect(detail.id,false)}>
            <Icon type="heart" style={{fontSize: 20, color: 'red'}}/>已收藏
          </span>
        </div>
      </div>
    </div>
  )
};

export default DishDetail;
