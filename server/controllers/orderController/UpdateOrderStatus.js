import db from '../../models/db';

/**
 * @class UpdateOrderStatusController
 */
class UpdateOrderStatusController {
  /**
   * @description update order status
   *
   * @param {object} req http request
   * @param {object} res http response
   *
   * @returns {JSON} returns a JSON object
   */
  static updateOrderStatus(req, res) {
    const orderId = req.params.id;
    const { orderStatus } = req.body;
    const text = 'UPDATE orders SET order_status=$1 WHERE id = $2  RETURNING\n'
    + 'order_status';
    const params = [orderStatus, orderId];
    db(text, params, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.stack, success: false });
      }

      if (!result.rows.length) {
        return res.status(404).json({
          message: 'Order not found',
          success: false,
          status: 404
        });
      }
      res.status(200).json({
        message: 'You have successfully updated the order status',
        updated: result.rows[0],
        success: true,
        status: 200
      });
    });
  }
}

export default UpdateOrderStatusController;
