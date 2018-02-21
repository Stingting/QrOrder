import React from 'react';
import {Layout,Button,List,Avatar,Icon} from 'antd';
import { connect } from 'dva';
import styles from './PayDetail.less';

const { Header, Content, Footer, Sider} = Layout;


function PayDetail ({dispatch,details,cart}) {
  /**
   * 返回
   */
  function backToUnpaidList() {
    dispatch({
      type:'cart/backToUnpaidList'
    })
  };

  return (
    <Layout>
      <Header className={styles["detail-head"]}>
        <span onClick={backToUnpaidList} className={styles["head-font"]}><Icon type="left"/>订单详情</span>
      </Header>
      <Content>
        <List
          itemLayout="horizontal"
          dataSource={cart.detail}
          renderItem={item => (
            <List.Item actions={[<a>edit</a>, <a>more</a>]}>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">{item.price}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div>content</div>
            </List.Item>
          )}
        />
      </Content>
      <Footer>
        <Button type="danger">支付</Button>
      </Footer>
    </Layout>
  );
};

function mapStateToProps({cart}) {
  return {cart};
}
export default connect(mapStateToProps)(PayDetail);
