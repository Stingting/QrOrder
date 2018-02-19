import React, {Component} from 'react';
import { List, Card ,Icon, Modal} from 'antd';
import DishDetail from "./DishDetail";
import styles from './RecDishes.less';

const RecDishes = ({list, loading, showDishDetail,visible, detail, closeDetailDialog,changeCollect,addToCart,reduceToCart}) => {
  return (
    <div className={styles["rec-dishes"]}>
      <div className={styles.title}>推荐菜式</div>
      <div className={styles.content}>
        <List
          loading={loading}
          grid={{column: 1}}
          dataSource={list}
          renderItem={item => (
            <List.Item>
              <Card title={item.name}>
                <div onClick={() => showDishDetail(item.dashId)}>
                  <img src={item.pic}/>
                </div>
                <div>
                  &yen;{item.price}
                </div>
              </Card>
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
