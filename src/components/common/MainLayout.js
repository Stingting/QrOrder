import React from 'react';
import MenuBanner from './MenuBanner';

import {Layout} from 'antd';
import styles from '../../assets/less/global.less';

const {Content} = Layout;

function MainLayout({ children, location }) {
  return (
    <Layout>
      <Content className={styles.content}>
        {children}
      </Content>
      {/*<Footer className={styles.footer}>*/}
        <MenuBanner></MenuBanner>
      {/*</Footer>*/}
    </Layout>
  );
}

export default MainLayout;
