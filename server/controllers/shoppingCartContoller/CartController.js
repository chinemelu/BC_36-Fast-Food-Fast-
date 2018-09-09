import ShoppingCart from './ShoppingCart';
import { oldCart, ourItems } from '../../dataStructure/dummyDatabase';

/**
 * @class OrderController
 */
class cartController {
/**
   * @description place food order
   * @param {*} req http request
   * @param {*} res http response
   * @returns {JSON} returns a JSON object
   */
  static addItem(req, res) {
    const itemId = req.params.id;
    const cart = new ShoppingCart(oldCart);

    const selectedItem = ourItems.filter(item => item.id === parseInt(itemId, 10));

    if (!selectedItem.length) {
      return res.status(404).json({
        message: 'Item not found'
      });
    }
    cart.addItem(selectedItem[0], itemId);

    res.json(cart);
  }
}
export default cartController;
