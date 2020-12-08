import { Component } from "react";
import { connect } from "react-redux";
import { addProduct } from "../../Redux/cartActions";
import { addToCompare, removeFromCompare } from "../../Redux/compareActions";
import "./style.scss";

class Item extends Component {
  state = {
    id: "",
    name: "",
    img: "",
    color: [],
    chosedColor: "Цвет",
    descr: "",
    price: "",
    volume: "",
    qty: "",
    bought: null,
    totalPrice: "",
    defChecked: true,
    compared: false,
    openedModal: false,
  };

  componentDidMount() {
    this.setState({ ...this.props.data, totalPrice: this.props.data.price });
  }

  handleCompare() {
    if (!this.state.compared) {
      this.props.onCompare(this.state);
      this.setState({ compared: true });
    } else {
      this.props.removeCompare(this.state.id);
      this.setState({ compared: false });
    }
  }

  volumeIncrement() {
    this.setState((prevState) => ({
      qty: Number(prevState.qty) + 1,
      totalPrice:
        Number(prevState.totalPrice) +
        (Number(prevState.price) * Number(this.state.volume)) / 100,
    }));
  }

  volumeDecrement() {
    if (this.state.qty > 1) {
      this.setState((prevState) => ({
        qty: Number(prevState.qty) - 1,
        totalPrice:
          Number(prevState.totalPrice) -
          (Number(prevState.price) * Number(this.state.volume)) / 100,
      }));
    }
  }

  handleCheck(e) {
    this.setState({
      volume: e.target.value,
      totalPrice:
        (Number(this.state.price) *
          Number(e.target.value) *
          Number(this.state.qty)) /
        100,
      defChecked: null,
    });
  }

  openModal() {
    this.setState({ openedModal: true });
  }

  closeModal() {
    this.setState({ openedModal: false });
  }

  handleChooseColor(e) {
    this.setState({ chosedColor: e.target.dataset.value });
    this.closeModal();
  }

  handleBuy() {
    this.setState({ bought: true, disabledButton: true });
    this.props.onBuy(this.state);
  }

  handleChangeImg(e) {
    if (Number(e.target.dataset.value) === 0) {
      e.target.src = this.state.img[1];
      e.target.dataset.value = "1";
    } else {
      e.target.src = this.state.img[0];
      e.target.dataset.value = "0";
    }
  }

  generateModal() {
    let optionTemplate = this.state.color.map((el) => (
      <li
        data-value={el}
        className="item__option"
        onClick={(e) => this.handleChooseColor(e)}
      >
        {el}
      </li>
    ));
    return [...optionTemplate];
  }

  render() {
    const {
      name,
      descr,
      totalPrice,
      id,
      qty,
      bought,
      img,
      defChecked,
      compared,
      chosedColor,
      openedModal,
    } = this.state;
    return (
      <div className="item">
        <div className="item__header">
          <div className={bought ? "item__rel" : "item__rel-disabled"}>NEW</div>
          <div
            className={!compared ? "item__status" : "item__status-compared"}
            onClick={() => this.handleCompare()}
          ></div>
        </div>
        <img
          className="item__image"
          data-value="0"
          src={img[0]}
          width="231"
          height="235"
          alt={name}
          onMouseEnter={(e) => this.handleChangeImg(e)}
          onMouseLeave={(e) => this.handleChangeImg(e)}
        />
        <h2 className="item__title">{name}</h2>
        <p className="item__description">{descr}</p>
        <div className="item__params">
          <ul
            className="item__modallist"
            onMouseLeave={() => this.closeModal()}
          >
            <li
              className={!openedModal ? "item__color" : "item__color-closed"}
              onClick={() => this.openModal()}
            >
              {chosedColor}
            </li>
            {openedModal ? this.generateModal() : null}
          </ul>
          <p className="item__price">{totalPrice} грн</p>
        </div>
        <div className="item__volumelist-container">
          <ul className="item__volumelist">
            <li>
              <input
                checked={defChecked}
                onClick={(e) => this.handleCheck(e)}
                className="item__checkbox"
                id={`firstCheckbox-id${id}`}
                type="radio"
                name={`radio-${id}`}
                value="100"
              />
              <label htmlFor={`firstCheckbox-id${id}`}></label>
              100 мл
            </li>
            <li>
              <input
                onClick={(e) => this.handleCheck(e)}
                className="item__checkbox"
                id={`secondCheckbox-id${id}`}
                type="radio"
                name={`radio-${id}`}
                value="200"
              />
              <label htmlFor={`secondCheckbox-id${id}`}></label>
              200 мл
            </li>
            <li>
              <input
                onClick={(e) => this.handleCheck(e)}
                className="item__checkbox"
                id={`thirdCheckbox-id${id}`}
                type="radio"
                name={`radio-${id}`}
                value="300"
              />
              <label htmlFor={`thirdCheckbox-id${id}`}></label>
              300 мл
            </li>
          </ul>
        </div>
        <div className="item__footer">
          <div className="item__qty">
            <button
              className="item__qty-button-left"
              onClick={() => this.volumeDecrement()}
            >
              -
            </button>
            <p className="item__qty-value">{qty}</p>
            <button
              className="item__qty-button-right"
              onClick={() => this.volumeIncrement()}
            >
              +
            </button>
          </div>
          <button className={"item__button"} onClick={() => this.handleBuy()}>
            купить
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.items,
});

const mapDispatchToProps = {
  onBuy: addProduct,
  onCompare: addToCompare,
  removeCompare: removeFromCompare,
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
