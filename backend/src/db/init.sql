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

-- ============================================
-- Données initiales
-- ============================================

-- Utilisateur administrateur par défaut (mot de passe : admin123)
INSERT INTO users (username, password, email, full_name, role)
VALUES (
  'admin',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'admin@umbrella.sc',
  'Administrateur',
  'admin'
)
ON CONFLICT (username) DO NOTHING;
