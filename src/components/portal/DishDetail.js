import React , {Component} from 'react';

const DishDetail = ({detail}) => {

  return (
    <div>
      <span>{detail.dishName}</span>
      <span><img src={detail.image}/></span>
    </div>
  )
};

export default DishDetail;
