
import express from 'express';
import authRoutes from './adapters/routes/auth.js';
import postRoutes from './adapters/routes/post.js';
import commentRoutes from './adapters/routes/comment.js';
import { config } from './config.js';
import connect from './infrastructure/database/conexion.js';

const app = express();

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
;

connect();

app.use(express.json());

app.use('/api/auth/', authRoutes);
app.use('/api/posts/', postRoutes);
app.use('/api/comments', commentRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
