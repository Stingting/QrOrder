import React, {Component, PropTypes} from 'react';

const RecDishes = (props) => {
  return (
    props.list.map((item)=>
      <div key={item.id} header={item.dishName}>
        <p>{item.dishName}</p>
      </div>
    )
  );
};
export default RecDishes;
