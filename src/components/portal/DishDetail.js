import React , {Component} from 'react';

const DishDetail = ({detail}) => {

  return (
    <div>
      <div>{detail.name}</div>
      <div><img src={detail.pic}/></div>
    </div>
  )
};

export default DishDetail;
