import React from 'react';
import {connect} from 'dva';
import {List} from 'antd';
import {Modal,WingBlank} from 'antd-mobile';
import styles from './UserCollection.less';
import DishDetail from "../portal/DishDetail";
import {Icon, NavBar, Popover, Result} from 'antd-mobile';
import SVG from 'react-inlinesvg';
import nodatasvg from '../../assets/svg/nodata.svg';

const Item = Popover.Item;

function UserCollection({dispatch,pcenter,menu}) {

  const {data} = pcenter;
  const {visible,detail} = menu;

  let result;
  if(data&&data.length>0) {
    result= <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item className={styles.item}  onClick={() => showDishDetail(item.id)} >
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
          </List.Item>
        )}
      />
  } else {
    result = <Result
      img={<SVG src={nodatasvg}></SVG>}
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
    //关闭菜式详情弹框
    dispatch({
      type : 'menu/closeDetailDialog'
    });
    //刷新收藏列表
    dispatch({
      type:'pcenter/getCollectList'
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
      <div className={styles['collect-content']}>
        <WingBlank>
          {result}
        </WingBlank>
      </div>
      <Modal
        title="菜式详情"
        visible={visible}
        footer={[]}
        closable={true}
        onClose={() => closeDetailDialog(true)}
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
