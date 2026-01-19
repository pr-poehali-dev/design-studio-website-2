-- Таблица для дополнительных файлов портфолио
CREATE TABLE IF NOT EXISTS portfolio_attachments (
    id SERIAL PRIMARY KEY,
    portfolio_item_id INTEGER NOT NULL REFERENCES portfolio_items(id),
    file_url TEXT NOT NULL,
    file_name VARCHAR(300) NOT NULL,
    file_type VARCHAR(50),
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_attachments_item ON portfolio_attachments(portfolio_item_id);
CREATE INDEX idx_portfolio_attachments_order ON portfolio_attachments(portfolio_item_id, display_order);