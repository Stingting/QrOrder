import React from 'react';
import { connect } from 'dva';
import {List,Avatar,Modal,message,Spin,Button, Icon} from 'antd';
import styles from './UserCollection.less';
import DishDetail from "../portal/DishDetail";

function UserCollection({dispatch,pcenter,menu}) {

  const {loadingMore,showLoadingMore,loading,data} = pcenter;
  const {visible,detail} = menu;

  function showDishDetail(id) {
    dispatch({
      type : 'menu/getDishDetail', //指定action,namespace+action
      payload : id
    })
  }
  function closeDetailDialog( closeFlag) {
    dispatch({
      type : 'menu/closeDetailDialog'
    })
  }

  //收藏或取消收藏
  function changeCollect(foodId,isCollect) {
    dispatch({
      type:'menu/changeCollect',
      isCollect:isCollect,
      foodId:foodId
    })
  }

  /**
   * 增加购买数量
   */
  function addToCart(dishId,dishType) {
    dispatch({
      type:'menu/addToCart',
      dishId:dishId,
      dishType:dishType
    })
  }

  /*
   *减少购买数量
   */
  function reduceToCart(dishId, dishType) {
    dispatch({
      type:'menu/reduceToCart',
      dishId:dishId,
      dishType:dishType
    })
  }

  //返回个人中心
  function collectBack() {
    dispatch({
      type: 'pcenter/backToPcenter'
    })
  }
  return (
    <div>
      <div className={styles['collect-head']}>
        <span className={styles['head-font']} onClick={collectBack}><Icon type="left"/>我的收藏</span>
      </div>
      <div>
        <List
          className={styles["demo-loadmore-list"]}
          loading={loading}
          itemLayout="horizontal"
          dataSource={data}
          size="middle"
          renderItem={item => (
            <List.Item className={styles.item}  onClick={() => showDishDetail(item.id)} >
              <List.Item.Meta
                avatar={<img width={150} height={150} alt={item.name} src={item.pic}/>}
                title={<span className={styles.dishname}>{item.name}</span>}
                description={<div>
                  <div>{item.desc}</div>
                  <div>{item.type}&nbsp;月售&nbsp;{item.saleCount}</div>
                  <div><span style={{color: 'red'}}>&yen;{item.price}</span>
                  </div>
                </div>}
              />
            </List.Item>
          )}
        />
      </div>
      <Modal
        title="菜式详情"
        visible={visible}
        mask={true}
        maskStyle={{backgroundColor:'rgba(232,230,225,0.5)'}}
        footer={null}
        onOk={() => closeDetailDialog(true)}
        onCancel={() => closeDetailDialog(true)}
      >
      <DishDetail detail = {detail} changeCollect={changeCollect} addToCart={addToCart} reduceToCart={reduceToCart}/>
      </Modal>
    </div>
  )
};

function mapStateToProps({pcenter,menu}) {
  return {pcenter,menu};
}
export default connect(mapStateToProps)(UserCollection);
