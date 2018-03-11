import React from 'react';
import {Table,Icon,Button} from 'antd';
import styles from './CartList.less';
import {getSessionStorage} from "../../utils/helper";

const CartList = ({confirmOrder,cartList,addToCartForCart,reduceToCartForCart}) => {

  function getColumns(userId) {

    const columns = [{
      title: '菜名',
      dataIndex: 'name',
      key: 'name',
      width: 30
    }, {
      title: '价格',
      dataIndex: 'price',
      width: 30,
      key: 'price',
      render: (text, record) => (
        <span key={text}>&yen;{text}</span>
      )
    },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        width: 30,
        render: (text, record) => (
          <div>
            <span className={styles.addorplus} style={{display:userId === getSessionStorage("userId")?'inline':'none'}}>
              <Icon type="minus-circle-o" style={{fontSize: 20}} onClick={() => reduceToCartForCart(record)}/>
              <span className={styles.count}>{record.num}</span>
              <Icon type="plus-circle" style={{fontSize: 20, color: 'orange'}}
                    onClick={() => addToCartForCart(record)}/>
            </span>
            <span className={styles.addorplus} style={{display:userId === getSessionStorage("userId")?'none':'inline'}}>
              <span className={styles.count}> &times;{record.num}</span>
            </span>
          </div>
        )
      }];
    return columns;
  }
  const cartListPanel = cartList.map((item,key) => (
    <div>
      <div className={styles.tag}>{item.nickName}</div>
      <div>
        <Table dataSource={item.list} columns={getColumns(item.userId)} pagination={false} showHeader={false}/>
      </div>
    </div>

  ));

  return (
      <div className={styles["cart-list"]}>
        {cartListPanel}
        <div className={styles.btn}>
          <Button type="primary" size="default" onClick={confirmOrder} >去结算</Button>
        </div>
      </div>
  )
};

export default CartList;
