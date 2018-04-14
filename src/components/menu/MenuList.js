import React from 'react';
import {Layout, List} from 'antd';
import {Modal} from 'antd-mobile';
import DishDetail from '../portal/DishDetail';
import styles from './MenuList.less';

const {Content, Sider} = Layout;

const MenuList = ({data, visible, showDishDetail, detail,
                    closeDetailDialog, changeCollect, addToCart, reduceToCart,types, currentType,currentDishes,changeCurrentType}) => {

  //选中分类切换菜式
  function handleTypeClick(key) {
    changeCurrentType(key);
  }

  //侧边分类栏
  const siderMenu = types.map((key) => (
    <li key={key} onClick={()=>handleTypeClick(key)} className={key===currentType?styles["li-selected"]:''}>{key}</li>
  ));

  return (
    <div className={styles.menu}>
          <Layout>
            <Sider width={100} style={{height: '100vh', position: 'fixed', left: 0 , background: '#fff'}}>
              <ul>
              {siderMenu}
              </ul>
            </Sider>
            <Content  style={{marginLeft:100}}>
              <div className={styles.content}>
                <div className={styles["dish-head"]}>{currentType}</div>
                <div className={styles["dish-content"]}>
                <List
                  itemLayout="horizontal"
                  dataSource={currentDishes}
                  size="middle"
                  renderItem={item => (
                    <List.Item className={styles.item}  onClick={() => showDishDetail(item.id)} >
                      <List.Item.Meta
                        avatar={<img width={100} height={100} alt={item.name} src={item.pic}/>}
                        title={<span className={styles.dishname}>{item.name}</span>}
                        description={<div className={styles.desc}>
                          <div className={styles.row1}>{item.desc}</div>
                          <div className={styles.row2}>{/*{item.type.name}&nbsp;*/}月售:&nbsp;{item.saleCount}</div>
                          <div className={styles.row3}>&yen;{item.price}</div>
                        </div>}
                      />
                    </List.Item>
                  )}
                />
                </div>
              </div>
          </Content>
        </Layout>
      {/*弹框组件要放在List标签外面，否则有冒泡事件，无法关闭弹窗*/}
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

export default MenuList;
