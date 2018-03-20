import React from 'react';
import {List, Modal} from 'antd';
import DishDetail from "./DishDetail";
import styles from './RecDishes.less';

const RecDishes = ({list, loading, showDishDetail,visible, detail, closeDetailDialog,changeCollect,addToCart,reduceToCart}) => {
  return (
    <div className={styles["rec-dishes"]}>
      <div className={styles.title}>推荐菜式</div>
      <div className={styles.content}>
        <List
          loading={loading}
          dataSource={list}
          renderItem={item => (
            <List.Item onClick={() => showDishDetail(item.id)}>
              <List.Item.Meta
                avatar={<img width={100} height={100} alt={item.name} src={item.pic}/>}
                title={<span className={styles.dishname}>{item.name}</span>}
                description={<div>
                  <div>{item.desc}</div>
                  <div>{item.type.name}&nbsp;月售:&nbsp;{item.saleCount}</div>
                  <div><span style={{color: 'red'}}>&yen;{item.price}</span>
                  </div>
                </div>}
              />
            </List.Item>
          )}
        />
      </div>
      <Modal
        title="菜式详情"
        mask={true}
        maskStyle={{backgroundColor:'rgba(232,230,225,0.5)'}}
        footer={null}
        visible={visible}
        onOk={() => closeDetailDialog(true)}
        onCancel={() => closeDetailDialog(true)}
      >
        <DishDetail detail = {detail} changeCollect={changeCollect} addToCart={addToCart} reduceToCart={reduceToCart}></DishDetail>
      </Modal>
    </div>
    )
};
export default RecDishes;
