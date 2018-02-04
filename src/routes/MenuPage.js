import React from 'react';
import { connect } from 'dva';
import MenuList from '../components/menu/MenuList';
function MenuPage({ dispatch , fetch, location, menu}) {

  const {data} = menu;

  const menuListProps={data};

  return (
    <MenuList {...menuListProps}></MenuList>
  );
}
MenuPage.propTypes = {

};
function mapStateToProps({ menu}) {
  return {menu};
}
export default connect(mapStateToProps)(MenuPage);
