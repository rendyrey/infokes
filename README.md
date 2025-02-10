# Directory Explorer App

This is a simple directory explorer application built with Bun & Elisya and PostgreSQL database. 
The application allows users to view the contents of directories and subdirectories.

## Prerequisites
- Docker, since all services are dockerized in this repo for compatibility and simplicity in running this app

## What's in use
- Bun
- Elysia
- Vue
- PostgreSQL
- Typescript
- Drizzle ORM
- Zod (Request Validation)

## Getting Started

1. Clone the repository: `git clone https://github.com/rendyrey/infokes.git`
2. Run docker-compose up to run all services: `docker-compose up`
3. For running the tests, you can run: `docker exec -it infokes_backend bun test`
4. By default, the app url will be `localhost:8080`
5. Backend endpoints will be `localhost:3000`
6. Enjoy

## API Endpoints by Backend

### Get All Directories

- Endpoint: `GET /api/v1/directories`
- Description: Get all directories available in the system
- Response: Return all directories for the app
- Response Example:
```json
{
    "success": true,
    "message": "Directories fetched successfully",
    "data": [
        {
            "id": 1,
            "parent_id": null,
            "name": "direktori 1",
            "createdAt": "2025-02-10T05:48:56.790Z",
            "updatedAt": "2025-02-10T05:48:56.790Z"
        },
        {
            "id": 2,
            "parent_id": null,
            "name": "direktori 2",
            "createdAt": "2025-02-10T05:49:08.967Z",
            "updatedAt": "2025-02-10T05:49:08.967Z"
        },
        ...
    ]
}
```

### Add Directory

- URL: `POST /api/v1/directories`
- Body Params:
  - `name` (string): The directory name
  - `parent_id` (integer): Id of the parent directory, where the directory will be place, set `null` for root
- Description: Adds a new directory to the system with the specified name and parent directory ID.
- Response: Return success message and the particular directory record data
- Response Example:
```json
{
    "success": true,
    "message": "Directory created successfully",
    "data": {
        "id": 9,
        "parent_id": 1,
        "name": "direktoir 3",
        "createdAt": "2025-02-10T05:50:40.700Z",
        "updatedAt": "2025-02-10T05:50:40.700Z"
    }
}
```

### Get All Files from a Directory

- Endpoint: `GET /api/v1/files/:directory_id`
- Query Params:
  - `directory_id`: ID of the directory where the file will be located
- Description: Retrieves all files in a directory with the specified :directory_id.
- Response: Return all files in the directory
- Response Example:
```json
[
    {
        "id": 4,
        "directory_id": 8,
        "name": "teksfile1",
        "file_type": "txt",
        "createdAt": "2025-02-10T05:49:43.294Z",
        "updatedAt": "2025-02-10T05:49:43.294Z"
    },
    {
        "id": 5,
        "directory_id": 8,
        "name": "teksfile2",
        "file_type": "pdf",
        "createdAt": "2025-02-10T05:49:58.996Z",
        "updatedAt": "2025-02-10T05:49:58.996Z"
    },
    {
        "id": 6,
        "directory_id": 8,
        "name": "teksfile4",
        "file_type": "jpg",
        "createdAt": "2025-02-10T05:50:22.311Z",
        "updatedAt": "2025-02-10T05:50:22.311Z"
    }
]
```

### Add File to a Directory
- Endpoint: `POST /api/v1/files`
- Body Params:
  - `directory_id` (integer): ID of directory
  - `name`: Name of file
  - `file_type`: (string|enum) type of file
- Description: Adds a new file to the specified directory with the given name and file type.
- Response: Return success message & file data
- Response Example:
```json
{
    "success": true,
    "message": "File created successfully",
    "data": {
        "id": 7,
        "directory_id": 1,
        "name": "teksfile4",
        "file_type": "jpg",
        "createdAt": "2025-02-10T05:50:32.657Z",
        "updatedAt": "2025-02-10T05:50:32.657Z"
    }
}
```

### Delete Directory
- Endpoint: `DELETE /api/v1/directories/:id`
- Query Params:
  - `id`: ID of directory to delete
- Description: Deletes the specified directory and all its contents.
- Response: Return success message
- Response Example:
```json
{
    "success": true,
    "message": "Directory deleted successfully",
    "data": {
        "id": 1,
        "parent_id": null,
        "name": "root",
        "createdAt": "2025-02-10T05:48:00.281Z",
        "updatedAt": "2025-02-10T05:48:00.281Z"
    }
}
```

### Delete File
- Endpoint: `DELETE /api/v1/files/:id`
- Query Params:
  - `id`: ID of file to delete
- Description: Deletes the specified file from the directory.
- Response: Return success message
- Response Example:
```json
{
    "success": true,
    "message": "File deleted successfully",
    "data": {
        "id": 4,
        "directory_id": 8,
        "name": "teksfile1",
        "file_type": "txt",
        "createdAt": "2025-02-10T05:49:43.294Z",
        "updatedAt": "2025-02-10T05:49:43.294Z"
    }
}
```

### NOTES
All .env and any private only files included in the repo for simplicity in building and test the app, not because lack of system design skills. LOL
