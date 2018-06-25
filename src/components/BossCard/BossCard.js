import React from "react";
import "./BossCard.css";

const BossCard = props => (
  <div onClick={() => props.setSelected(props.id)} className="images">
    <div className="img-container">
      <img alt={props.name} src={props.image} />
    </div>
  </div>
);

export default BossCard;
