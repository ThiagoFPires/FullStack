import { supabase } from '../config/supabase.js';

class ProductService {
  
  async getAllProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getProductById(id) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createProduct(productData) {
    try {
      const { name, description, price, stock, category } = productData;

      if (!name || !price) {
        throw new Error('Nome e preço são obrigatórios');
      }

      const { data, error } = await supabase
        .from('products')
        .insert([
          {
            name,
            description: description || '',
            price: parseFloat(price),
            stock: parseInt(stock) || 0,
            category: category || 'Geral'
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateProduct(id, productData) {
    try {
      const { name, description, price, stock, category } = productData;

      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (price !== undefined) updateData.price = parseFloat(price);
      if (stock !== undefined) updateData.stock = parseInt(stock);
      if (category !== undefined) updateData.category = category;

      const { data, error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteProduct(id) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true, message: 'Produto deletado com sucesso' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default new ProductService();