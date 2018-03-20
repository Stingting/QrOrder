import React from 'react';
import {connect} from 'dva';
import {List, Modal} from 'antd';
import styles from './UserCollection.less';
import DishDetail from "../portal/DishDetail";
import { Popover, NavBar, Icon ,Result} from 'antd-mobile';
import nodataSrc from '../../assets/img/nodata.png';
const Item = Popover.Item;

function UserCollection({dispatch,pcenter,menu}) {

  const {loadingMore,showLoadingMore,loading,data} = pcenter;
  const {visible,detail} = menu;

  let result;
  if(data&&data.length>0) {
    result= <div className={styles['collect-content']}>
      <List
        className={styles["demo-loadmore-list"]}
        loading={loading}
        itemLayout="horizontal"
        dataSource={data}
        size="middle"
        renderItem={item => (
          <List.Item className={styles.item}  onClick={() => showDishDetail(item.id)} >
            <List.Item.Meta
              avatar={<img width={100} height={100} alt={item.name} src={item.pic}/>}
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
  } else {
    result = <Result
      img={<img src={nodataSrc} width={50} height={50}/>}
      title="您没有收藏的菜式"
      message="可以去菜单列表看看"
    />
  }

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

  /**
   * 返回首页
   */
  function onSelect(opt) {
    dispatch({
      type:'cart/backToHome'
    })
  }

  return (
    <div>
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => collectBack()}
        rightContent={
          <Popover mask
                   overlayClassName="fortest"
                   overlayStyle={{color: 'currentColor'}}
                   overlay={[
                     (<Item key="1" value="home" data-seed="logId">首页</Item>)
                   ]}
                   align={{
                     overflow: {adjustY: 0, adjustX: 0},
                     offset: [-10, 0],
                   }}
                   onSelect={onSelect}>
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}>
              <Icon type="ellipsis"/>
            </div>
          </Popover>
        }
      >我的收藏</NavBar>
      {result}
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
