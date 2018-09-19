import orders from '../../dataStructure/orders';

/**
 * @class OrderController
 */
class OrderController {
/**
   * @description place food order
   * @param {object} req http request
   * @param {object} res http response
   * @returns {JSON} returns a JSON object
   */
  static placeOrder(req, res) {
    const { userId, items } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: 'userId field is required'
      });
    }
    if (!/^[0-9]*$/.test(userId)) {
      return res.status(400).json({
        message: 'Invalid id'
      });
    }

    if (!Array.isArray(items)) {
      return res.status(400).json({
        message: 'Items field must be an array'
      });
    }

    if (!items.length) {
      return res.status(400).json({
        message: 'Items field must contain at least one food item'
      });
    }

    for (let item of items) {
      if (typeof (item) !== 'object') {
        return res.status(400).json({
          message: 'item must be an object'
        });
      }
    };

    for (let item of items) {
      if (Object.keys(item).length === 0) {
        return res.status(400).json({
          message: 'Item must not be empty'
        });
      }
    };

    for (let item of items) {
  if (!item.name) {
        return res.status(400).json({
          message: 'Name field is required'
        });
      }
  };

  for (let item of items) {
    if (!item.price) {
        return res.status(400).json({
          message: 'Price field is required'
      });
    } 
  };

  for (let item of items) {
      if (!item.quantity) {
        return res.status(400).json({
          message: 'Quantity field is required'
        });
      }
    };

    for (let item of items) {
      if (!item.itemId) {
        return res.status(400).json({
          message: 'itemId field is required'
        });
      }
    }
  


  for (let item of items) {
  //  reference https://stackoverflow.com/questions/12313550/regular-expression-for-alphabets-with-only-one-space-between-words
      if (!/^([a-zA-Z]+(_[a-zA-Z]+)*)(\s([a-zA-Z]+(_[a-zA-Z]+)*))*$/.test(item.name)) {
        return res.status(400).json({
          message: 'Name must consist of alphabets with no space at the beginning or end of name'
        });
      }
  };

  for (let item of items) {
    if (!/^[0-9]*$/.test(item.price)) {
      return res.status(400).json({
        message: 'Price must be an integer'
      });
    } 
  };

  for (let item of items) {
    if (!/^[0-9]*$/.test(item.quantity)) {
      return res.status(400).json({
        message: 'Quantity must be an integer'
      });
    }
  };

  for (let item of items) {
    if (!/^[0-9]*$/.test(item.itemId)) {
      return res.status(400).json({
        message: 'itemId must be an integer'
      });
    }
  };

    const determineId = () => {
      if (orders.length > 0) {
        return orders.slice(-1)[0].id + 1;
      }
      return 1;
    };

    let total = 0;
    items.map((item) => {
      total += (parseInt(item.quantity, 10) * parseInt(item.price, 10));
    });

    const newOrder = {
      id: determineId(),
      status: 'pending',
      total,
      userId,
      items
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

  /**
   * @description fetch order
   * @param {object} req http request
   * @param {object} res http response
   * @returns {JSON} returns a JSON object
   */
  static fetchOrder(req, res) {
    const orderId = req.params.id;
    for (const order of orders) {
      if (order.id === parseInt(orderId, 10)) {
        return res.status(200).json(order);
      } 
    }
    return res.status(404).json({
      message: 'Order not found'
    });
  }

  /**
   * @description update order status
   * @param {object} req http request
   * @param {object} res http response
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
