import ShoppingCart from './ShoppingCart';
import { oldCart, ourItems } from '../../dataStructure/dummyDatabase';
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
}
export default cartController;
