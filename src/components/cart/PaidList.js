import React from 'react';
import {List,Avatar, Collapse,Popconfirm,Button,Modal} from 'antd';
import DishDetail from "../portal/DishDetail";
import moment from "moment";

const Panel = Collapse.Panel;
const PaidList = ({paidList,deleteDish,showDishDetail,visible,closeDetailDialog,detail,changeCollect,addToCart,reduceToCart}) => {
  const text = "您确定要删除吗？";
  const panel = paidList.map((item,key) => (
    <Panel header={<div>{item.tableName}，订单号：{item.id}， 订单总价:&yen;{item.price}， 下单时间：{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</div> } key={key}>
      <List
        itemLayout="horizontal"
        dataSource={item.list}
        renderItem={item => (
          <List.Item  onClick={()=>showDishDetail(item.id)} actions={{/*[<Popconfirm placement="top" title={text} onConfirm={() => deleteDish(item.id)} okText="确定" cancelText="取消">
                                <Button type="danger">删除</Button>
                              </Popconfirm>]*/}}>
            <List.Item.Meta
              avatar={<img width={100} height={100} alt={item.name} src={item.pic}/>}
              title={<span style={{fontWeight: 'bold',fontSize: 16}}>{item.name}</span>}
              description=
                {
                  <div>
                    <div>{item.desc}</div>
                    <div>{item.type.name}&nbsp;月售:&nbsp;{item.saleCount}</div>
                    <div><span style={{color: 'red'}}>&yen;{item.price}</span></div>
                  </div>
                }
            />
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
  );
};
export default PaidList;
