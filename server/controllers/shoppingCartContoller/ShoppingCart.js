/**
 * @class ShoppingCart
 */
class ShoppingCart {
  /**
   * @description add food item
   * @param {string} oldCart
   * @param {object} items
   * @returns {JSON} returns a JSON object
   */
  constructor(oldCart) {
    this.total = oldCart.total || 0;
    this.items = oldCart.items || {};
  }

  /**
   * @description add food item
   * @param {object} item
   * @param {integer} id
   * @returns {JSON} returns a JSON object
   */
  addItem(item, id) {
    if (!(id in this.items)) {
      this.items[id] = { item, quantity: 1 };
    } else {
      this.items[id].quantity += 1;
    }
    this.total += this.items[id].item.unitPrice;
  }

  /**
   * @description remove food item from cart
   * @param {object} item
   * @param {integer} id
   * @returns {JSON} returns a JSON object
   */
  removeItem(item, id) {
    this.total -= (this.items[id].item.unitPrice * this.items[id].quantity);
    delete this.items[id];
  }

  /**
   * @description generate array of items
   * @param {object} item
   * @param {integer} id
   * @returns {Array} returns an array
   */
  generateArray() {
    const arr = [];
    Object.keys(this.items).map((id) => {
      arr.push(this.items[id]);
    });
    return arr;
  }
}

export default ShoppingCart;
