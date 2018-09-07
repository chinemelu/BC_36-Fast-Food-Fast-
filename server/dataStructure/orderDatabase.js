export const ourItems = [{
  id: 50,
  name: 'Doughnut',
  price: 50,
}, {
  id: 51,
  name: 'Spaghetti',
  price: 650,
}, {
  id: 52,
  name: 'Chicken burrito',
  price: 250,
}, {
  id: 53,
  name: 'Coke',
  price: 100,
}, {
  id: 54,
  name: 'Chocolate Cake',
  price: 150,
},
{
  id: 55,
  name: 'Pancake',
  price: 350,
}];

export const orderDatabase = [{
  id: 1,
  numberOfItems: 3,
  status: 'pending',
  items: [{
    itemId: 51,
    name: 'Spaghetti',
    price: 650,
    quantity: 1,
  },
  {
    itemId: 50,
    name: 'Doughnut',
    price: 50,
    quantity: 1,
  },
  {
    itemId: 55,
    name: 'Pancake',
    price: 350,
    quantity: 1,
  }]
},
{
  id: 2,
  numberOfItems: 2,
  status: 'complete',
  items: [{
    itemId: 55,
    name: 'Pancake',
    price: 350,
    quantity: 3,
  }, {
    itemId: 52,
    name: 'Chicken burrito',
    price: 250,
    quantity: 1
  }]
},
{
  id: 3,
  numberOfItems: 2,
  status: 'declined',
  items: [{
    itemId: 54,
    name: 'Chocolate Cake',
    price: 150,
    quantity: 2,
  }, {
    itemId: 53,
    name: 'Coke',
    price: 100,
    quantity: 2,
  }]
},
{
  id: 4,
  numberOfItems: 2,
  status: 'complete',
  items: [{
    itemId: 52,
    name: 'Chicken burrito',
    price: 250,
    quantity: 2
  }, {
    itemId: 55,
    name: 'Pancake',
    price: 350,
    quantity: 2
  }]
},
{
  id: 1,
  numberOfItems: 1,
  status: 'pending',
  items: [{
    itemId: 51,
    name: 'Spaghetti',
    price: 350,
    quantity: 1
  }]
},
];
