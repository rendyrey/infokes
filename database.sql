-- Create two databases: one for development, one for testing
CREATE DATABASE database;
CREATE DATABASE database_test;

-- Grant privileges to the default PostgreSQL user
GRANT ALL PRIVILEGES ON DATABASE database TO postgres;
GRANT ALL PRIVILEGES ON DATABASE database_test TO postgres;
