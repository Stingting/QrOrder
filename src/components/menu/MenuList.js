import React, {Component} from 'react';
import {List,Avatar,Modal,message,Spin,Button} from 'antd';
import DishDetail from '../portal/DishDetail';
import styles from './MenuList.less';

const MenuList = ({loading, loadingMore, showLoadingMore, data, visible, showDishDetail, detail,
                    closeDetailDialog, onLoadMore, changeCollect, addToCart, reduceToCart}) => {

  const loadMore = showLoadingMore ? (
    <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
      {loadingMore && <Spin />}
      {!loadingMore && <Button onClick={()=>onLoadMore()}>加载更多菜式</Button>}
    </div>
  ) : null;

  return (
    <div className={styles.menu}>
      <div className={styles.head}><span>本店菜谱</span></div>
      <div className={styles.content}>
        <List
          className={styles["demo-loadmore-list"]}
          loading={loading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={data}
          size="middle"
          renderItem={item => (
            <List.Item className={styles.item}  onClick={() => showDishDetail(item.dashId)} >
              <List.Item.Meta
                avatar={<img src={item.pic}/>}
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


      {/*弹框组件要放在List标签外面，否则有冒泡事件，无法关闭弹窗*/}

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

export default MenuList;
