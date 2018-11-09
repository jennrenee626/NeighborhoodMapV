import React, {Component}  from "react";
import "../App.css";

class ListItem extends Component {

  render() {
    return (
      <div>
        <div className="buttons">
          <button key={this.props.monument.key} buttonClick={this.props.buttonClick}>{this.props.monument.title}</button>
        </div>
      </div>
    );
  };
}


export default ListItem;
