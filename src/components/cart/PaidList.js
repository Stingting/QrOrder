import React from 'react';
import {List} from 'antd';
import {Modal, Result, WingBlank} from 'antd-mobile';
import DishDetail from "../portal/DishDetail";
import SVG from 'react-inlinesvg';
import nodatasvg from '../../assets/svg/nodata.svg';
import rightarrow from '../../assets/svg/arrow-right.svg';
import styles from './PaidList.less'

const PaidList = ({paidList,deleteDish,showDishDetail,visible,closeDetailDialog,detail,changeCollect,addToCart,reduceToCart,toOrderDetail}) => {
  // const text = "您确定要删除吗？";
  let paidContent;
  if(paidList.length>0) {
    paidContent = paidList.map((item, key) => (
      <div key={key} className={styles["paid-list"]}>
        <div className={styles.title}
             key={key} onClick={() => toOrderDetail(item.id)}>{item.tableName}<img src={rightarrow} alt=""/></div>
        <div className={styles.item}>
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
                  title={<span className={styles.dishname}>{item.name}</span>}
                  description={
                    <div className={styles.desc}>
                      <div className={styles.row1}>{item.desc}</div>
                      <div className={styles.row2}>{/*{item.type.name}&nbsp;*/}月售:&nbsp;{item.saleCount}</div>
                      <div className={styles.row3}>&yen;{item.price}</div>
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
      img={<SVG src={nodatasvg}></SVG>}
      title="您暂时没有订单"
      message="可以去菜单列表看看"
    />;
  }

  return (
    <div>
      <WingBlank>
        {paidContent}
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
  );
};
export default PaidList;
