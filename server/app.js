import express from 'express';
import bodyparser from 'body-parser';
import logger from 'morgan';

import orderRoutes from './routes/orderRoutes';
import authRoutes from './routes/authRoutes';
import cartRoutes from './routes/cartRoutes';
import userRoutes from './routes/userRoutes';


const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/users', userRoutes);


app.use((req, res) => {
  res.status(404).json({
    message: 'This page is not available'
  });
});

const port = process.env.PORT || 3000;

app.set('port', port);

const server = app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

export default server;
