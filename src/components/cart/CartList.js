import React from 'react';
import {Button, Table} from 'antd';
import styles from './CartList.less';
import {getSessionStorage} from "../../utils/helper";
import addsvg from '../../assets/svg/add.svg';
import minussvg from '../../assets/svg/minus.svg';
import {WhiteSpace} from 'antd-mobile';

const CartList = ({confirmOrder,cartList,addToCartForCart,reduceToCartForCart}) => {

  function getColumns(userId) {

    const columns = [{
      title: '菜名',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: (text, record) => (
        <div className={styles["column-list"]} key={text}>{text}</div>
      ),
    }, {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => (
        <span key={text}>&yen;{text}</span>
      ),
      width: '20%',
    },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        render: (text, record) => (
          <div>
            <span className={styles.addorplus} style={{display:userId === getSessionStorage("userId")?'inline':'none'}}>
              <img src={minussvg} alt='' onClick={() => reduceToCartForCart(record)}/>
              <span className={styles.count}>{record.num}</span>
              <img src={addsvg} alt='' onClick={() => addToCartForCart(record)}/>
            </span>
            <span className={styles.addorplus} style={{display:userId === getSessionStorage("userId")?'none':'inline'}}>
              <span className={styles.count}> &times;{record.num}</span>
            </span>
          </div>
        ),
        width: '50%',
      }];
    return columns;
  }
  const cartListPanel = cartList.map((item,key) => (
    <div key={key}>
      <div className={styles.tag}>{item.nickName}</div>
      <div>
        <Table rowKey="id" dataSource={item.list} columns={getColumns(item.userId)} pagination={false} showHeader={false}/>
      </div>
    </div>

  ));

  return (
    <div>
      <WhiteSpace/>
        <div className={styles["cart-list"]}>
          {cartListPanel}
          <div className={styles.btn}>
            <Button type="primary" size="default" onClick={confirmOrder} >去结算</Button>
          </div>
        </div>
      <WhiteSpace/>
    </div>
  )
};

export default CartList;
