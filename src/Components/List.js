import React from "react";
import "../App.css";
import ListItem from "./ListItem";

const List = ({ searchedMonuments, buttonClick }) => {
  return (
    <div>
      {searchedMonuments.map(monument => {
        return <ListItem key={monument.key} monument={monument} buttonClick={buttonClick}/>;
      })}
    </div>
  );
};

export default List;
