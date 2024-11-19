# Project UAS FE
Bertemakan lifestyle dimana kami memutuskan untuk membuat sebuah website yang berisikan resep-resep makanan sehat. Dengan memiliki fitur .........

## Cara Run Program
Cara menjalankan program :
1. pada terminal vs code run "npm install" 
2. untuk run angular bisa run "cd frontend" kemudian "npm install -g live-server" kemudian run "live-server"
3. setup env database pada file .env
4. untuk run backend bisa run "cd backend" kemudian run "nodemon server.js"


## Setup database di postgree SQL
Tabel Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    date_of_birth DATE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

