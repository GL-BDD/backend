CREATE TABLE IF NOT EXISTS artisans (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phoneNumber VARCHAR(10) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    specialization VARCHAR(255) ,
    contact_info VARCHAR(255),
    portfolio VARCHAR(255),
    certifications VARCHAR(255),
    insurance_details VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phoneNumber VARCHAR(10) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS certifications(
    id SERIAL PRIMARY KEY,
    artisan_id INTEGER NOT NULL REFERENCES artisans(id) ON DELETE CASCADE,
    certification_name VARCHAR(255),
    date_issued DATE,
    date_expiry DATE
);

CREATE TABLE IF NOT EXISTS projects(
    id SERIAL PRIMARY KEY,
    artisan_id INTEGER NOT NULL REFERENCES artisans(id) ON DELETE CASCADE,
    client_id INTEGER REFERENCES clients(id) ON DELETE SET NULL,
    description TEXT,
    date DATE,
    price INTEGER,
    location VARCHAR(255),
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_images(
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    attachment BYTEA
);


-- ProjectProposal(ProposalID,Description,DateCreated,Status,#CustomerID,#ArtisanID)
CREATE TABLE IF NOT EXISTS project_preposal(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(255),
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    artisan_id INTEGER REFERENCES artisans(id) ON DELETE SET NULL,
    specialization VARCHAR(255)
);