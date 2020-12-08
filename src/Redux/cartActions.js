export function addProduct(payload) {
  return { type: "ADD_PRODUCT", payload };
}

export function deleteProduct(id) {
  return { type: "DELETE_PRODUCT", id };
}
