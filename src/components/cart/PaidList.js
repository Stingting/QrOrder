import React from 'react';
import {Icon, List, Modal} from 'antd';
import DishDetail from "../portal/DishDetail";
import {Result} from 'antd-mobile';
import nodataSrc from '../../assets/img/nodata.png';

const PaidList = ({paidList,deleteDish,showDishDetail,visible,closeDetailDialog,detail,changeCollect,addToCart,reduceToCart,toOrderDetail}) => {
  const text = "您确定要删除吗？";
  const paidContent = paidList.map((item,key) => (
    <div>
      <div style={{backgroundColor:'#f2f2f2',height:30,lineHeight:'30px',paddingLeft:10}}
           key={key} onClick={()=>toOrderDetail(item.id)}>{item.tableName}<Icon type="right"/></div>
      <div style={{backgroundColor:'white'}}>
      <List
        itemLayout="horizontal"
        dataSource={item.list}
        renderItem={item => (
          <List.Item  onClick={()=>showDishDetail(item.id)} actions={{/*[<Popconfirm placement="top" title={text} onConfirm={() => deleteDish(item.id)} okText="确定" cancelText="取消">
                                <Button type="danger">删除</Button>
                              </Popconfirm>]*/}}>
            <List.Item.Meta
              avatar={<img width={100} height={100} alt={item.name} src={item.pic}/>}
              title={<span style={{fontWeight: 'bold',fontSize: 12}}>{item.name}</span>}
              description=
                {
                  <div>
                    <div>{item.desc}</div>
                    <div>{item.type.name}&nbsp;月售:&nbsp;{item.saleCount}</div>
                    <div><span style={{color: 'red'}}>&yen;{item.price}</span></div>
                  </div>
                }
            />
            <div>
              &times;{item.num}
            </div>
          </List.Item>
        )}
      />
      </div>
    </div>
  ));

  return (
    <div>
      <div style={{'display': paidList.length>0?'inline':'none'}}>
          {paidContent}
      </div>
      <div style={{'display':paidList.length>0?'none':'inline'}}>
        result = <Result
        img={<img src={nodataSrc} width={50} height={50}/>}
        title="您暂时没有订单"
        message="可以去菜单列表看看"
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
  );
};
export default PaidList;
