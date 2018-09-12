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

  /**
   * @description update order status
   * @param {*} req http request
   * @param {*} res http response
   * @returns {JSON} returns a JSON object
   */
  static updateOrderStatus(req, res) {
    const orderId = req.params.id;
    const { orderStatus } = req.body;
    const selectedOrder = orders.filter(order => order.id === parseInt(orderId, 10));

    if (!selectedOrder.length) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    if (!orderStatus) {
      return res.status(400).json({
        message: 'Order status is required'
      });
    }
    if (orderStatus !== 'completed' && orderStatus !== 'pending' && orderStatus !== 'declined') {
      return res.status(400).json({
        message: "Order status should be either 'completed', 'pending' or 'declined'"
      });
    }
    selectedOrder[0].status = orderStatus;
    res.status(200).json(selectedOrder[0]);
  }
}

export default OrderController;
