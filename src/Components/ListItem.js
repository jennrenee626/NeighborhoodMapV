import React, {Component}  from "react";
import "../App.css";

class ListItem extends Component {

  render() {
    return (
        <div className="buttons">
          <button tabindex="2" key={this.props.monument.key} onClick={this.props.buttonClick}>{this.props.monument.title}</button>
        </div>
    );
  };
}


export default ListItem;
