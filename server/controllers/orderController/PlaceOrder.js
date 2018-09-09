import { orderDatabase, ourItems } from '../../dataStructure/dummyDatabase';

/**
 * @class OrderController
 */
class OrderController {
/**
   * @description place food order
   * @param {*} req http request
   * @param {*} res http response
   * @returns {JSON} returns a JSON object
   */
  static placeOrder(req, res) {
    const {
      name,
      price,
      quantity,
    } = req.body;

    // check if item exists in product database
    const itemFound = ourItems.filter(item => item.name === name);

    // initialise items
    const items = [];
    
    if (!itemFound.length) {
      return res.status(400).json({
        message: 'There is no such item!'
      });
    }

    const newItem = {
      name,
      price,
      quantity
    };

    const newOrder = {
      id: orderDatabase.slice(-1)[0].id + 1,
      status: 'pending',
      items: items.push(newItem)
    };

    res.status(201).json({
      message: 'You have successfully ordered',
      newOrder
    });
  }
}
export default OrderController;
