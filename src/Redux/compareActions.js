export function addToCompare(payload) {
  return { type: "ADD_COPMARE", payload };
}

export function removeFromCompare(id) {
  return { type: "REMOVE_COPMARE", id };
}
