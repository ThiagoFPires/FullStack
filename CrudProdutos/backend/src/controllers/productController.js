import productService from '../services/productService.js';

class ProductController {

  async getAll(req, res) {
    try {
      const result = await productService.getAllProducts();

      if (!result.success) {
        return res.status(500).json({
          success: false,
          message: 'Erro ao buscar produtos',
          error: result.error
        });
      }

      return res.status(200).json({
        success: true,
        data: result.data
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'ID do produto é obrigatório'
        });
      }

      const result = await productService.getProductById(id);

      if (!result.success) {
        return res.status(404).json({
          success: false,
          message: 'Produto não encontrado',
          error: result.error
        });
      }

      return res.status(200).json({
        success: true,
        data: result.data
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  async create(req, res) {
    try {
      const productData = req.body;

      if (!productData.name || !productData.price) {
        return res.status(400).json({
          success: false,
          message: 'Nome e preço são obrigatórios'
        });
      }

      const result = await productService.createProduct(productData);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: 'Erro ao criar produto',
          error: result.error
        });
      }

      return res.status(201).json({
        success: true,
        message: 'Produto criado com sucesso',
        data: result.data
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const productData = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'ID do produto é obrigatório'
        });
      }

      const result = await productService.updateProduct(id, productData);

      if (!result.success) {
        return res.status(404).json({
          success: false,
          message: 'Erro ao atualizar produto',
          error: result.error
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Produto atualizado com sucesso',
        data: result.data
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'ID do produto é obrigatório'
        });
      }

      const result = await productService.deleteProduct(id);

      if (!result.success) {
        return res.status(404).json({
          success: false,
          message: 'Erro ao deletar produto',
          error: result.error
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Produto deletado com sucesso'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }
}

export default new ProductController();