import { orders } from '../../dataStructure/dummyDatabase';

/**
 * @class OrderController
 */
class OrderController {
/**
   * @description fetch order
   * @param {*} req http request
   * @param {*} res http response
   * @returns {JSON} returns a JSON object
   */
  static fetchOrder(req, res) {
    const orderId = req.params.id;
    const selectedOrder = orders.filter(order => order.id === parseInt(orderId, 10));
    if (!selectedOrder.length) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }
    res.status(200).json(selectedOrder[0]);
  }
}

export default OrderController;
