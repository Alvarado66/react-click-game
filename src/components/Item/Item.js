import React from "react";
import "./Item.css";

const Item = ({ name, image, onClick }) => {

  return (
    <div className="card width">
      <img
        className="click-item img-fluid card-img-top"
        src={image}
        alt={name}
        name={name}
        onClick={() => onClick(name)}

      />;

    </div>
  )
};

export default Item;