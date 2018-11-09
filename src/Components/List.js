import React, {Component} from "react";
import "../App.css";
import ListItem from "./ListItem";

class List extends Component {

render() {
  return (
    <div>
      {this.props.searchedMonuments.map(monument => {
        return <ListItem key={monument.key} monument={monument} buttonClick={this.props.buttonClick}/>;
      })}
    </div>
  );
};
}

export default List;
