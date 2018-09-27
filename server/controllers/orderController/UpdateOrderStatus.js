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
    + 'id, order_status, updated_at';
    const params = [orderStatus, orderId];
    db(text, params, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.stack });
      }

      if (!result.rows.length) {
        return res.status(404).json({
          message: 'Order not found'
        });
      }
      res.status(200).json({
        message: 'You have successfully updated the order status',
        updated: result.rows[0]
      });
    });
  }
}

export default UpdateOrderStatusController;
