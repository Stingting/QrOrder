import React from 'react';
import MenuBanner from './MenuBanner';
import {connect} from "dva";
import {Layout} from 'antd';
import styles from '../../assets/less/global.less';
import { ActivityIndicator } from 'antd-mobile';

const {Content} = Layout;

function MainLayout({ children, location,loading}) {

  //获取loading对象的global,聊天室页面不显示加载
  const isLoading = loading.global && !loading.models.chat;

  return (
    <Layout>
      <Content className={styles.content}>
        {children}
      </Content>
      {/*<Footer className={styles.footer}>*/}
        <MenuBanner></MenuBanner>
      {/*</Footer>*/}
      {/*全局正在加载组件*/}
      <ActivityIndicator toast text="" animating={isLoading}/>
    </Layout>
  );
}
//loading对象为dva-loading组件的对象，处理effects请求的加载状态，全局的
function mapStateToProps({chat,loading}) {
  return {chat,loading};
}
export default connect(mapStateToProps)(MainLayout);
