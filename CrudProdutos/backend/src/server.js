import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import { testConnection } from './config/supabase.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.json({
    message: 'API CRUD de Produtos',
    version: '1.0.0',
    endpoints: {
      products: '/api/products'
    }
  });
});

app.use('/api/products', productRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

app.use((err, req, res, next) => {
  console.error('Erro:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: err.message
  });
});

const startServer = async () => {
  try {
    const connected = await testConnection();
    
    if (!connected) {
      console.warn('Aviso: Não foi possível conectar ao Supabase');
      console.warn('Verifique suas credenciais no .env');
    }

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`API disponível em http://localhost:${PORT}`);
      console.log(`Documentação em http://localhost:${PORT}/api/products`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();
