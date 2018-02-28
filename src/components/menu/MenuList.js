import React from 'react';
import {Avatar, Layout, List, Modal,Menu} from 'antd';
import DishDetail from '../portal/DishDetail';
import styles from './MenuList.less';

const { Header, Content, Footer, Sider} = Layout;

const MenuList = ({loading, loadingMore, showLoadingMore, data, visible, showDishDetail, detail,
                    closeDetailDialog, changeCollect, addToCart, reduceToCart,types, currentType,currentDishes,changeCurrentType}) => {

  //侧边分类栏
  const siderMenu = types.map((key) => (
    <Menu.Item key={key}>{key}</Menu.Item>
  ));

  //选中分类切换菜式
  function handleTypeClick(e) {
    changeCurrentType(e.key);
  }
  return (
    <div className={styles.menu}>
      <div className={styles.head}><span>本店菜谱</span></div>
        <div style={{paddingTop:60}}>
          <Layout>
            <Sider  width={100} style={{ background: '#fff' }}>
              <Menu
                onClick={handleTypeClick}
                selectedKeys={[currentType]}>
                {siderMenu}
              </Menu>
            </Sider>
            <Content>
            <div className={styles.content}>
              <List
                className={styles["demo-loadmore-list"]}
                itemLayout="horizontal"
                dataSource={currentDishes}
                size="middle"
                renderItem={item => (
                  <List.Item className={styles.item}  onClick={() => showDishDetail(item.id)} >
                    <List.Item.Meta
                      avatar={<Avatar src={item.pic}/>}
                      title={<span className={styles.dishname}>{item.name}</span>}
                      description={<div>
                        <div>{item.desc}</div>
                        <div>{item.type.name}&nbsp;月售:&nbsp;{item.saleCount}</div>
                        <div><span style={{color: 'red'}}>&yen;{item.price}</span>
                        </div>
                      </div>}
                    />
                  </List.Item>
                )}
              />
            </div>
          </Content>
        </Layout>
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
