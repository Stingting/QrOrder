import React, {Component} from 'react';
import {List,Avatar,Modal,message,Spin,Button} from 'antd';
import styles from './MenuList.less';

const MenuList = ({loading, loadingMore,showLoadingMore, data,visible,showDishDetail, detail, closeDetailDialog,onLoadMore}) => {

  const loadMore = showLoadingMore ? (
    <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
      {loadingMore && <Spin />}
      {!loadingMore && <Button onClick={()=>onLoadMore()}>加载更多菜式</Button>}
    </div>
  ) : null;

  return (
    <List
      className={styles["demo-loadmore-list"]}
      loading={loading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={data}
      size="middle"
      renderItem={item => (
        <List.Item actions={[<a>edit</a>, <a>more</a>]}>
          <List.Item.Meta
            avatar={<Avatar src={item.pic} />}
            title={<a onClick={()=>showDishDetail(item.dashId)}>{item.name}</a>}
            description={item.desc}
            />
          <div>{item.name}</div>

          <Modal
            title={item.name}
            visible={visible}
            mask={false}
            onOk={()=>closeDetailDialog(true)}
            onCancel={()=>closeDetailDialog(true)}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>

        </List.Item>
      )}
    />
  )
};

export default MenuList;
