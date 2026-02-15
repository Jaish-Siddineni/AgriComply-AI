CREATE DATABASE IF NOT EXISTS agricomply_db;
USE agricomply_db;

-- 1. Users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. The Shared Vault (Stores all files)
CREATE TABLE documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    file_name VARCHAR(255),
    file_path VARCHAR(255),
    tag VARCHAR(50), -- e.g., 'PAN', 'Aadhaar', 'GSTR-1'
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 3. Track A: Compliance Rules
CREATE TABLE compliance_rules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rule_name VARCHAR(100), -- e.g., 'GST Filing Oct'
    required_doc_tag VARCHAR(50), -- e.g., 'GSTR-3B'
    penalty_amount DECIMAL(10,2),
    due_date DATE
);

-- 4. Track B: Schemes & Loans
CREATE TABLE schemes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scheme_name VARCHAR(100), -- e.g., 'Tractor Loan'
    description TEXT,
    required_docs_json JSON -- e.g., ["PAN", "LandRecord", "Quotation"]
);

-- Seed Data
INSERT INTO compliance_rules (rule_name, required_doc_tag, due_date) VALUES 
('Income Tax Filing', 'ITR-V', '2025-07-31'),
('GST October Return', 'GSTR-3B', '2025-11-20');

INSERT INTO schemes (scheme_name, required_docs_json) VALUES 
('Kisan Credit Card', '["PAN", "LandRecord"]'),
('Tractor Loan', '["Aadhaar", "Quotation", "LandRecord"]');