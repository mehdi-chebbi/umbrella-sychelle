-- ============================================
-- PROJET UMBRELLA — Initialisation de la base
-- ============================================

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'viewer',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des contenus de pages
CREATE TABLE IF NOT EXISTS content (
  id SERIAL PRIMARY KEY,
  page_key VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(500),
  body TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Layer management (GeoServer sync + groups + legends)
-- ============================================

-- Layer groups (supports nested groups via parent_id)
CREATE TABLE IF NOT EXISTS layer_groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  parent_id INTEGER REFERENCES layer_groups(id) ON DELETE CASCADE,
  description TEXT,
  legend JSONB,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_layer_groups_name ON layer_groups(name);
CREATE INDEX IF NOT EXISTS idx_layer_groups_parent_id ON layer_groups(parent_id);
CREATE INDEX IF NOT EXISTS idx_layer_groups_sort_order ON layer_groups(sort_order);

-- Layers (synced from GeoServer, with metadata for stats/clipping)
CREATE TABLE IF NOT EXISTS layers (
  id SERIAL PRIMARY KEY,
  geoserver_name VARCHAR(255) NOT NULL UNIQUE,
  display_name VARCHAR(255),
  group_id INTEGER REFERENCES layer_groups(id) ON DELETE SET NULL,
  file_path VARCHAR(500),
  class_labels JSONB,
  legend JSONB,
  style_name VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_layers_geoserver_name ON layers(geoserver_name);
CREATE INDEX IF NOT EXISTS idx_layers_group_id ON layers(group_id);
CREATE INDEX IF NOT EXISTS idx_layers_is_active ON layers(is_active);
CREATE INDEX IF NOT EXISTS idx_layers_sort_order ON layers(sort_order);

-- Clipped layers cache (stores results of country clipping)
CREATE TABLE IF NOT EXISTS clipped_layers_cache (
  id SERIAL PRIMARY KEY,
  country_file VARCHAR(255) NOT NULL,
  layer_id INTEGER NOT NULL REFERENCES layers(id) ON DELETE CASCADE,
  clipped_layer_name VARCHAR(255) NOT NULL,
  file_size_bytes BIGINT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(country_file, layer_id)
);

CREATE INDEX IF NOT EXISTS idx_clipped_layers_cache_country ON clipped_layers_cache(country_file);
CREATE INDEX IF NOT EXISTS idx_clipped_layers_cache_layer ON clipped_layers_cache(layer_id);

-- ============================================
-- Données initiales
-- ============================================

-- Utilisateur administrateur par défaut (mot de passe : admin123)
INSERT INTO users (username, password, email, full_name, role)
VALUES (
  'admin',
  '$2a$10$RUhuPXX5aYcAaR7ESpdwreTbgciPZGq5LiNJV4MDbcOqkAdPyWW.O',
  'admin@umbrella.sc',
  'Administrateur',
  'admin'
)
ON CONFLICT (username) DO NOTHING;
