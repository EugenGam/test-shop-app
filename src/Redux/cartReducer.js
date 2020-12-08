function cartReducer(state = [], action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...state, action.payload];
    case "DELETE_PRODUCT":
      return state.filter((el) => el.id !== action.id);
    default:
      return state;
  }
}

export default cartReducer;
