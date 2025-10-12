CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  category VARCHAR(100) DEFAULT 'Geral',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

INSERT INTO products (name, description, price, stock, category) VALUES
('Notebook Dell', 'Notebook Dell Inspiron 15 - Intel Core i5, 8GB RAM, 256GB SSD', 3499.90, 15, 'Eletrônicos'),
('Mouse Logitech', 'Mouse sem fio Logitech MX Master 3', 449.90, 30, 'Acessórios'),
('Teclado Mecânico', 'Teclado Mecânico Keychron K2 RGB', 799.00, 20, 'Acessórios'),
('Monitor LG 27"', 'Monitor LG UltraWide 27" Full HD', 1299.00, 10, 'Eletrônicos'),
('Webcam Logitech', 'Webcam Logitech C920 Full HD 1080p', 599.90, 25, 'Acessórios');