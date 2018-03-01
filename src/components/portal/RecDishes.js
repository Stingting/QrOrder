import React from 'react';
import {Card, List, Modal} from 'antd';
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
            <List.Item onClick={() => showDishDetail(item.id)}>
              <Card title={item.name}>
                <div>
                  <img width={150} height={150} src={item.pic} alt=""/>
                </div>
                <div>
                  <div>{item.desc}</div>
                  <div>&yen;{item.price}&nbsp;销量：{item.saleCount}份</div>
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
