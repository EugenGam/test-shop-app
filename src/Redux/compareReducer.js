function compareReducer(state = [], action) {
  switch (action.type) {
    case "ADD_COPMARE":
      return [
        ...state.filter((el) => el.id !== action.payload.id),
        action.payload,
      ];
    case "REMOVE_COPMARE":
      return state.filter((el) => el.id !== action.id);
    default:
      return state;
  }
}

export default compareReducer;
