import React from 'react';
import {List,Avatar, Collapse,Popconfirm,Button,Modal} from 'antd';
import DishDetail from "../portal/DishDetail";
const Panel = Collapse.Panel;
const PaidList = ({paidList,deleteDish,showDishDetail,detailModalVisible,closeDetailDialog,detail}) => {
  const text = "您确定要删除吗？";
  const panel = paidList.map((item,key) => (
    <Panel header={item.nickName + ", 订单总价：" + item.price + "元"} key={key}>
      <List
        itemLayout="horizontal"
        dataSource={item.list}
        renderItem={item => (
          <List.Item actions={[<Popconfirm placement="top" title={text} onConfirm={() => deleteDish(item.dashId)} okText="确定" cancelText="取消">
                                <Button type="danger">删除</Button>
                              </Popconfirm>]}>
            <List.Item.Meta
              onClick={()=>showDishDetail(item.dashId)}
              avatar={<Avatar  src={item.pic}/>}
              title={item.name}
              description={"价格：" + item.price + "元，" + "种类：" + item.type + "，购买数量："+ item.count}
            />

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

          </List.Item>
        )}
      />
    </Panel>
  ));

  return (
    <div>
      <div style={{'display': paidList.length>0?'inline':'none'}}>
        <Collapse accordion>
          {panel}
        </Collapse>
      </div>
      <div style={{'display':paidList.length>0?'none':'inline'}}>暂无已支付订单数据</div>
    </div>
  );
};
export default PaidList;
