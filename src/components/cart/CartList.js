import React from 'react';
import {Table} from 'antd';
import {Badge, WhiteSpace} from 'antd-mobile';
import styles from './CartList.less';
import {getSessionStorage} from "../../utils/helper";
import addsvg from '../../assets/svg/add.svg';
import minussvg from '../../assets/svg/minus.svg';
import cartlistsvg from '../../assets/svg/cart-list.svg';
import cartlistdisabledsvg from '../../assets/svg/cart-list-disabled.svg';
import SVG from 'react-inlinesvg';

const CartList = ({confirmOrder,cartList,totalPurchasePrice, totalPurchaseNum,addToCartForCart,reduceToCartForCart}) => {

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
        <span key={text} className={styles["food-price"]}>&yen;{text}</span>
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

  const price = totalPurchaseNum==0?'':<span className={styles.total}>&yen;{totalPurchasePrice}</span>;

  return (
    <div>
      <WhiteSpace/>
        <div className={styles["cart-list"]}>
          <div  className={styles["cart-content"]}>
            {cartListPanel}
          </div>
          <div className={styles.btn}>
            <div className={styles.left}>
              <Badge text={totalPurchaseNum} overflowCount={55}  style={{ marginLeft: 52}}>
                <SVG src={totalPurchaseNum==0?cartlistdisabledsvg:cartlistsvg}></SVG>
              </Badge>
              {price}
            </div>
            <div className={totalPurchaseNum==0?styles["right-disable"]:styles.right} onClick={confirmOrder}>去结算</div>
          </div>
        </div>
      <WhiteSpace/>
    </div>
  )
};

export default CartList;
