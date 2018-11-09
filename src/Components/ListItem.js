import React from "react";
import "../App.css";

const ListItem = ({ monument }) => {
  return (
    <div>
      <div className="buttons">
        <button key={monument.key} onClick={this.props.buttonClick()}>{monument.title}</button>
      </div>
    </div>
  );
};

export default ListItem;
