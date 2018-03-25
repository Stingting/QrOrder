import React from 'react';
import {Icon, List} from 'antd';
import {Modal} from 'antd-mobile';
import DishDetail from "../portal/DishDetail";
import {Result} from 'antd-mobile';
import nodataSrc from '../../assets/img/nodata.png';

const PaidList = ({paidList,deleteDish,showDishDetail,visible,closeDetailDialog,detail,changeCollect,addToCart,reduceToCart,toOrderDetail}) => {
  // const text = "您确定要删除吗？";
  let paidContent;
  if(paidList.length>0) {
    paidContent = paidList.map((item, key) => (
      <div key={key}>
        <div style={{backgroundColor: '#f2f2f2', height: 30, lineHeight: '30px', paddingLeft: 10}}
             key={key} onClick={() => toOrderDetail(item.id)}>{item.tableName}<Icon type="right"/></div>
        <div style={{backgroundColor: 'white'}}>
          <List
            itemLayout="horizontal"
            dataSource={item.list}
            renderItem={item => (
              <List.Item onClick={() => showDishDetail(item.id)} actions={{
                /*[<Popconfirm placement="top" title={text} onConfirm={() => deleteDish(item.id)} okText="确定" cancelText="取消">
                                                <Button type="danger">删除</Button>
                                              </Popconfirm>]*/
              }}>
                <List.Item.Meta
                  avatar={<img width={100} height={100} alt={item.name} src={item.pic}/>}
                  title={<span style={{fontWeight: 'bold', fontSize: 12}}>{item.name}</span>}
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
  } else {
    paidContent = <Result
      img={<img src={nodataSrc} width={50} height={50} alt=''/>}
      title="您暂时没有订单"
      message="可以去菜单列表看看"
    />;
  }

  return (
    <div>
      {paidContent}
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
  );
};
export default PaidList;
