import React , {Component} from 'react';
import styles from './DishDetail.less';
import {Icon} from 'antd';

const DishDetail = ({detail, changeCollect,addToCart,reduceToCart}) => {

  return (
    <div className={styles['dish-detail']}>
      <div className={styles.img}><img src={detail.pic}/></div>
      <div className={styles.dishname}>{detail.name}</div>
      <div className={styles.salecount}>销量&nbsp;{detail.saleCount}</div>
      <div>
        <div className={styles.price}>&yen;{detail.price}</div>
        <div className={styles.operate}>
          <span className={styles.cart} onClick={()=>addToCart(detail.dashId,detail.type)} style={{'display' : detail.count===0?'inline':'none'}}>
            <Icon type="shopping-cart" style={{fontSize: 20}}/>加入购物车
          </span>
          <span className={styles.addorplus} style={{'display' : detail.count===0?'none':'inline'}}>
            <Icon type="minus-circle-o" style={{fontSize: 20}} onClick={()=>reduceToCart(detail.dashId,detail.type)}/>
            <span className={styles.count}>{detail.count}</span>
            <Icon type="plus-circle" style={{fontSize: 20, color: 'orange'}} onClick={()=>addToCart(detail.dashId,detail.type)}/>
          </span>
          <span className={styles.collect} style={{display: detail.isCollect == true ? 'none' : 'inline'}} onClick={()=>changeCollect()}>
            <Icon type="heart-o" style={{fontSize: 20, color: 'red'}}/>收藏
          </span><span className={styles.collect} style={{display: detail.isCollect == true ? 'inline' : 'none'}} onClick={()=>changeCollect()}>
            <Icon type="heart" style={{fontSize: 20, color: 'red'}}/>已收藏
          </span>
        </div>
      </div>
    </div>
  )
};

export default DishDetail;
