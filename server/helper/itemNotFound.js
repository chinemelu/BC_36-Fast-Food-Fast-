import { ourItems } from '../dataStructure/dummyDatabase';

const itemNotFound = (req, res, next) => {
  const itemId = req.params.id;
  const selectedItem = ourItems.filter(item => item.id === parseInt(itemId, 10));

  if (!selectedItem.length) {
    res.status(404).json({
      message: 'Item not found'
    });
  } else {
    next();
  }
};
export default itemNotFound;
