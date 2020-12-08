import { Component } from "react";
import Item from "../Item";
import Products from "../../products";
import "./style.scss";

class ItemList extends Component {
  state = {
    itemsList: [],
  };

  componentDidMount() {
    this.setState({ itemsList: [...Products] });
  }

  showItems() {
    let list = [];
    this.state.itemsList.forEach((item) => {
      list.push(<Item data={item} key={item.id} />);
    });
    return [...list];
  }
  render() {
    return <div className="itemList__container">{this.showItems()}</div>;
  }
}

export default ItemList;
