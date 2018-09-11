import ShoppingCart from './ShoppingCart';
import { oldCart, ourItems, orders } from '../../dataStructure/dummyDatabase';
import itemNotFound from '../../helper/itemNotFound';

/**
 * @class OrderController
 */
class cartController {
/**
   * @description add food item to cart
   * @param {*} req http request
   * @param {*} res http response
   * @returns {JSON} returns a JSON object
   */
  static addItem(req, res) {
    const itemId = req.params.id;
    const cart = new ShoppingCart(oldCart);

    const selectedItem = ourItems.filter(item => item.id === parseInt(itemId, 10));

    itemNotFound(req, res, () => {
      cart.addItem(selectedItem[0], itemId);
      res.json(cart);
    });
  }

  /**
   * @description remove food item from cart
   * @param {*} req http request
   * @param {*} res http response
   * @returns {JSON} returns a JSON object
   */
  static removeItem(req, res) {
    const itemId = req.params.id;
    const cart = new ShoppingCart(oldCart);

    const selectedItem = ourItems.filter(item => item.id === parseInt(itemId, 10));

    itemNotFound(req, res, () => {
      if (!(itemId in oldCart.items)) {
        return res.status(404).json({
          message: 'Item not in cart'
        });
      }
      cart.removeItem(selectedItem[0], itemId);
      res.json(cart);
    });
  }

  /**
   * @description place food order
   * @param {*} req http request
   * @param {*} res http response
   * @returns {JSON} returns a JSON object
   */
  static placeOrder(req, res) {
    const cart = new ShoppingCart(oldCart);

    const determineId = () => {
      if (orders.length > 0) {
        return orders.slice(-1)[0].id + 1;
      }
      return 1;
    };

    if (Object.keys(cart.items).length === 0) {
      return res.status(400).json({
        message: 'There are no items in the shopping cart'
      });
    }

    const newOrder = {
      id: determineId(),
      status: 'pending',
      cart: cart.generateArray()
    };

    orders.push(newOrder);

    res.status(201).json({
      message: 'You have successfully ordered the item(s)',
      newOrder
    });
  }

  /**
   * @description fetch all food orders
   * @param {*} req http request
   * @param {*} res http response
   * @returns {JSON} returns a JSON object
   */
  static fetchAllOrders(req, res) {
    if (orders.length) {
      return res.status(200).json(orders);
    }
    res.status(200).json({
      message: 'There are no available food orders'
    });
  }
}

export default cartController;
