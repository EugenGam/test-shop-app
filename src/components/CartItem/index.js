import { Component } from "react";
import { connect } from "react-redux";
import { deleteProduct } from "../../Redux/cartActions";
import "./style.scss";

class CartItem extends Component {
  state = {
    id: "",
    name: "",
    img: "",
    color: [],
    price: "",
    volume: "",
    qty: "",
    totalPrice: "",
    chosedColor: "",
  };

  componentDidMount() {
    this.setState({ ...this.props.data });
  }

  qtyIncrement() {
    this.setState((prevState) => ({
      qty: Number(prevState.qty) + 1,
      totalPrice:
        (Number(prevState.totalPrice) / Number(prevState.qty)) *
        (Number(prevState.qty) + 1),
    }));
  }

  qtyDecrement() {
    if (Number(this.state.qty) > 1) {
      this.setState((prevState) => ({
        qty: Number(prevState.qty) - 1,
        totalPrice:
          (Number(prevState.totalPrice) / Number(prevState.qty)) *
          (Number(prevState.qty) - 1),
      }));
    }
  }

  handleDelete() {
    this.props.onDelete(this.state.id);
  }

  render() {
    const { name, totalPrice, volume, qty, img, chosedColor } = this.state;
    return (
      <div className="cartitem__container">
        <ul className="cartitem__list">
          <li className="cartitem__item">
            <img
              className="cartitem__img"
              height="150"
              width="153"
              src={img[0]}
              alt={name}
            />
          </li>
          <li className="cartitem__item">
            <span className="cartitem__name">{name}</span>
          </li>
          <li className="cartitem__item">
            <span className="cartitem__color">{chosedColor}</span>
          </li>
          <li className="cartitem__item">
            <span className="cartitem__volume">{volume} мл</span>
          </li>
          <li className="cartitem__item">
            <div className="cartitem__qty">
              <button
                className="cartitem__qty-button-left"
                onClick={() => this.qtyDecrement()}
              >
                -
              </button>
              <p className="cartitem__qty-value">{qty}</p>
              <button
                className="cartitem__qty-button-right"
                onClick={() => this.qtyIncrement()}
              >
                +
              </button>
            </div>
          </li>
          <li className="cartitem__item">
            <span className="cartitem__price">{totalPrice} грн</span>
          </li>
          <li className="cartitem__item">
            <button
              className="cartitem__delete"
              onClick={() => this.handleDelete()}
            ></button>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.items,
});

const mapDispatchToProps = {
  onDelete: deleteProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
