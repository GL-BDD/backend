--clients(client_id,username,email,password,address,phone_number)
CREATE TABLE
    IF NOT EXISTS clients (
        client_id SERIAL PRIMARY KEY, --changed
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone_number VARCHAR(10) UNIQUE NOT NULL, --changed
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

--artisans(artisan_id,username,email,password,phone_number,specialization,description,created_at)
CREATE TABLE
    IF NOT EXISTS artisans (
        artisan_id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone_number VARCHAR(10) UNIQUE NOT NULL, --changed
        specialization VARCHAR(255), -- TODO: add enum
        --    contact_info VARCHAR(255), changed removed
        --    portfolio VARCHAR(255), changed removed
        --    certifications VARCHAR(255), changed removed
        --    insurance_details VARCHAR(255), changed removed
        description TEXT, --changed added
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

--portfolio_projects(portfolio_projects_id,description,date,price,location,#artisan_id)
CREATE TABLE
    IF NOT EXISTS portfolio_projects (
        portfolio_project_id SERIAL PRIMARY KEY,
        description TEXT,
        date DATE,
        price INTEGER,
        location VARCHAR(255),
        artisan_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (artisan_id) REFERENCES artisans (artisan_id) ON DELETE CASCADE
    );

--project_proposals(proposal_id,Description,start_date,end_date,specialization,accepted_status,#client_id,#artisan_id)
CREATE TABLE
    IF NOT EXISTS project_proposals (
        proposal_id SERIAL PRIMARY KEY,
        description VARCHAR(255),
        start_date DATE, --changed added
        end_date DATE, --changed added
        specialization VARCHAR(255),
        accepted_status VARCHAR(255) NOT NULL DEFAULT 'cree' CHECK (accepted_status IN ('cree', 'accepte', 'refuse')),
        client_id INTEGER,
        artisan_id INTEGER DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients (client_id) ON DELETE CASCADE,
        FOREIGN KEY (artisan_id) REFERENCES artisans (artisan_id) ON DELETE CASCADE
    );

--accepted_projects(accepted_id,accepted_price,status,#proposal_id,#artisan_id)
CREATE TABLE
    IF NOT EXISTS accepted_projects (
        accepted_id SERIAL PRIMARY KEY,
        accepted_price INTEGER,
        status VARCHAR(255) NOT NULL DEFAULT 'ouvert' CHECK (
            status IN (
                'ouvert',
                'considere',
                'commence',
                'en cours',
                'termine'
            )
        ),
        proposal_id INTEGER UNIQUE REFERENCES project_proposals (proposal_id) ON DELETE CASCADE,
        artisan_id INTEGER REFERENCES artisans (artisan_id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

--Invoices(invoice_id,Amount,invoice_file,payment_status,#accepted_id)
CREATE TABLE
    IF NOT EXISTS invoices (
        invoice_id SERIAL PRIMARY KEY,
        amount INTEGER,
        invoice_file BYTEA,
        payment_status VARCHAR(255), --TODO: add enum
        accepted_id INTEGER REFERENCES accepted_projects (accepted_id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

--portfolio_project_images(image_id,Attachment,encoding,mime_type,#projet_id)
CREATE TABLE
    IF NOT EXISTS portfolio_project_images ( -- changed added
        image_id SERIAL PRIMARY KEY,
        attachment BYTEA,
        encoding VARCHAR(255),
        mime_type VARCHAR(255),
        project_id INTEGER REFERENCES portfolio_projects (portfolio_project_id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- project_proposal_images(image_id,Attachment,encoding,mime_type,#projet_id)
CREATE TABLE
    IF NOT EXISTS project_proposal_images ( --changed all
        image_id SERIAL PRIMARY KEY,
        attachment BYTEA,
        encoding VARCHAR(255),
        mime_type VARCHAR(255),
        project_id INTEGER REFERENCES project_proposals (proposal_id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- accepted_project_images(image_id,Attachment,encoding,mime_type,#projet_id)
CREATE TABLE
    IF NOT EXISTS accepted_project_images ( --changed added
        image_id SERIAL PRIMARY KEY,
        attachment BYTEA,
        encoding VARCHAR(255),
        mime_type VARCHAR(255),
        project_id INTEGER REFERENCES accepted_projects (accepted_id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- certifications(certification_id,certification_name,issue_date,Attachment,#artisan_id)
CREATE TABLE
    IF NOT EXISTS certifications (
        certification_id SERIAL PRIMARY KEY,
        certification_name VARCHAR(255),
        issue_date DATE,
        attachment BYTEA,
        mime_type VARCHAR(255),
        artisan_id INTEGER NOT NULL REFERENCES artisans (artisan_id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- quotes(quote_id,price,unit,created_date,#proposal_id,#artisan_id)
CREATE TABLE
    IF NOT EXISTS quotes (
        quote_id SERIAL PRIMARY KEY,
        price INTEGER NOT NULL, --changed
        unit VARCHAR(255) NOT NULL CHECK (unit IN ('heure', 'jour', 'projet', 'metre')),
        -- description TEXT, changed removed
        artisan_id INTEGER REFERENCES artisans (artisan_id) ON DELETE CASCADE,
        proposal_id INTEGER NOT NULL REFERENCES project_proposals (proposal_id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- CREATE TABLE IF NOT EXISTS project_images( --changed deleted
--     id SERIAL PRIMARY KEY,
--     project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
--     attachment BYTEA
-- );