import { Component } from "react";
import { connect } from "react-redux";
import { addProduct } from "../../Redux/cartActions";
import CartItem from "../CartItem";
import "./style.scss";

class Cart extends Component {
  state = {
    products: [],
  };

  componentDidUpdate() {
    if (this.state.products !== this.props.cart) {
      this.setState({ products: this.props.cart });
    }
  }

  showCart() {
    let list = [];
    this.state.products.forEach((item) => {
      list.push(<CartItem data={item} key={item.id} />);
    });
    return [...list];
  }

  render() {
    return (
      <div className="cart__container">
        <h2 className="cart__title">Корзина:</h2>
        {this.showCart()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = {
  onDelete: addProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
