import React, {Component}  from "react";
import "../App.css";

class ListItem extends Component {

  render() {
    return (
        <div className="buttons">
          <button type = "button" tabIndex="2" key={this.props.monument.key} onClick={e => this.props.buttonClick(e, this.props.monument)}>{this.props.monument.title}</button>
        </div>
    );
  };
}


export default ListItem;
