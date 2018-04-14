import React from 'react';
import {List} from 'antd';
import {Modal,WingBlank} from 'antd-mobile';
import DishDetail from "./DishDetail";
import styles from './RecDishes.less';
import recsvg from '../../assets/svg/recommend.svg';

const RecDishes = ({list, showDishDetail,visible, detail, closeDetailDialog,changeCollect,addToCart,reduceToCart}) => {
  return (
    <div className={styles["rec-dishes"]}>
      <WingBlank>
        <div className={styles.title}><img src={recsvg} alt=''/>推荐菜式</div>
        <div className={styles.content}>
            <List
              dataSource={list}
              renderItem={item => (
                <List.Item onClick={() => showDishDetail(item.id)}>
                  <List.Item.Meta
                    avatar={<img width={100} height={100} alt={item.name} src={item.pic}/>}
                    title={<span className={styles.dishname}>{item.name}</span>}
                    description={<div className={styles.desc}>
                      <div className={styles.row1}>{item.desc}</div>
                      <div className={styles.row2}>{/*{item.type.name}&nbsp;*/}月售:&nbsp;{item.saleCount}</div>
                      <div className={styles.row3}>&yen;{item.price}</div>
                    </div>}
                  />
                </List.Item>
              )}
            />
        </div>
      </WingBlank>
      <Modal
        title="菜式详情"
        visible={visible}
        footer={[]}
        closable={true}
        onClose={() => closeDetailDialog(true)}
      >
        <DishDetail detail = {detail} changeCollect={changeCollect} addToCart={addToCart} reduceToCart={reduceToCart}></DishDetail>
      </Modal>
    </div>
    )
};
export default RecDishes;
