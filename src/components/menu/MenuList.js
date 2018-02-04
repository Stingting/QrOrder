import React, {Component} from 'react';
import {List,Avatar} from 'antd';

const MenuList = ({loading, loadMore, data}) => {
  return (
    <List
      className="demo-loadmore-list"
      loading={loading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={data}
      renderItem={item => (
        <List.Item actions={[<a>edit</a>, <a>more</a>]}>
          <div>{item.name}</div>
        </List.Item>
      )}
    />
  )
};

export default MenuList;
