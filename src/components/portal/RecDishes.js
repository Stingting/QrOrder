import React, {Component} from 'react';
import { List, Card ,Icon, Modal} from 'antd';
import DishDetail from "./DishDetail";

const RecDishes = ({list, loading, detailModalVisible,showDishDetail, detail, closeDetailDialog}) => {
  return (
      <List
        loading = {loading}
        grid={{column: 3 }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Card title={item.name}>
              <div onClick = {() => showDishDetail(item.id)}>
                <img src={item.pic}/>
              </div>
              <Modal
                title={item.name}
                mask = {false}
                footer={null}
                visible={detailModalVisible}
                onOk={() => closeDetailDialog(true)}
                onCancel={() => closeDetailDialog(true)}
              >
                <DishDetail detail={detail}></DishDetail>
              </Modal>
              <div>
                &yen;{item.price}
              </div>
            </Card>
          </List.Item>
        )}
      />
    )
};
export default RecDishes;
