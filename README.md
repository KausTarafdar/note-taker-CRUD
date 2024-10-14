# CRUD REST API for Note-Taking

This project was build as the internship assignment for RaftLabs

**Technologies Used**
NodeJS Application written in TypeScript

- **Server** : ExpressJS
- **Database** : SQLite

## Project Overview

\_baseURL_ : The continuous element of your website's address
***example*** - http://localhost:8000 for local development

### Routes

*Postman Collection provided to try and test the API locally*

#### **User Routes**

- `POST /u/signup` :- Asks for a username and password to signup the user.

  ***Example Usage :-***

  ```json
  Request:
  {
      "username": "kaustav",
      "password": "1234567"
  }

  Response:
  {
      "status": "success",
      "message": "User is signed up",
      "data": {
          "id": "2ec7dcb7-e1cf-43d8-9c80-b8848b1a0173",
          "username": "kaustav",
          "created_at": "2024-10-14T12:18:56.696Z",
          "jwt": "eyJhbGciOiJIUzI1NiJ9.MmVjN2RjYjctZTFjZi00M2Q4LTljODAtYjg4NDhiMWEwMTcz.SzgS0iyCB8ewWEwvGh7gR6l8iZWrjQy6gmrE5GjhF0Y"
      }
  }
  ```

- `POST /u/login` :- Asks for a username and password to login the user.

  ***Example Usage :-***

  ```json
  Request:
  {
      "username": "kaustav",
      "password": "1234567"
  }

  Response:
  {
      "status": "success",
      "message": "User successufully logged in",
      "data": {
          "id": "2ec7dcb7-e1cf-43d8-9c80-b8848b1a0173",
          "username": "kaustav",
          "created_at": "2024-10-14T12:19:42.392Z",
          "jwt": "eyJhbGciOiJIUzI1NiJ9.MmVjN2RjYjctZTFjZi00M2Q4LTljODAtYjg4NDhiMWEwMTcz.SzgS0iyCB8ewWEwvGh7gR6l8iZWrjQy6gmrE5GjhF0YeyJhbGciOiJIUzI1NiJ9.MmVjN2RjYjctZTFjZi00M2Q4LTljODAtYjg4NDhiMWEwMTcz.SzgS0iyCB8ewWEwvGh7gR6l8iZWrjQy6gmrE5GjhF0YeyJhbGciOiJIUzI1NiJ9.MmVjN2RjYjctZTFjZi00M2Q4LTljODAtYjg4NDhiMWEwMTcz.SzgS0iyCB8ewWEwvGh7gR6l8iZWrjQy6gmrE5GjhF0Y"
      }
  }


  ```



#### **Note Routes**

- `POST /n/new/note`  :-  Provides signed in user with the route to create a new route.

***Example Body :-***

```json
Header:
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.MmVjN2RjYjctZTFjZi00M2Q4LTljODAtYjg4NDhiMWEwMTcz.SzgS0iyCB8ewWEwvGh7gR6l8iZWrjQy6gmrE5GjhF0Y"
}

Request :
{
    "note": "This is a note"
}


Response:
{
    {
    "status": "success",
    "message": "Note successfully added",
    "data": {
        "id": "65f20f3f-b005-4d3f-8dd1-5e5525ef9018",
        "user_id": "2ec7dcb7-e1cf-43d8-9c80-b8848b1a0173",
        "data": "This is a note"
    }
}
```

- `GET /n/notes` :- Gets all the notes for the currently logged in user. Takes query `page: number` and `limit: number` for response pagination.

***Example Usage :-***

```json
Response:
{
    {
    "status": "success",
    "message": "successfully fetched all user notes",
    "data": [
        {
            "id": "d15cdc2d-b6d3-4574-abfe-9f4f2af21d22",
            "user_id": "f1cf5157-854f-49e8-bb51-924a7c0f0335",
            "data": "Prepare the CRUD functionality",
            "created_at": "2024-10-14 13:16:02",
            "updated_at": "2024-10-14 13:18:37"
        },
        {
            "id": "c5de2f16-567c-438d-a502-0496535bcb52",
            "user_id": "f1cf5157-854f-49e8-bb51-924a7c0f0335",
            "data": "Create the GraphQL api",
            "created_at": "2024-10-14 13:17:12",
            "updated_at": "2024-10-14 13:17:12"
        },
}
```

- `POST /n/note` :- Updates an existing note made by the user.

***Example Usage :-***

```json
Header:
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.MmVjN2RjYjctZTFjZi00M2Q4LTljODAtYjg4NDhiMWEwMTcz.SzgS0iyCB8ewWEwvGh7gR6l8iZWrjQy6gmrE5GjhF0Y"
}

Request :
{
    "id": "d15cdc2d-b6d3-4574-abfe-9f4f2af21d22",
    "note": "updated my CRUD Api"
}


Response:
{
    "status": "success",
    "message": "Note successfully updated",
    "data": {
        "id": "d15cdc2d-b6d3-4574-abfe-9f4f2af21d22",
        "user_id": "f1cf5157-854f-49e8-bb51-924a7c0f0335",
        "data": "updated my CRUD Api"
    }
}
```

- `DELETE /n/note/:note_id` :- Deletes the note with id provided as url paramter.

***Example Usage :-***

```json
Response :
{
    "status": "success",
    "message": "Note id { d15cdc2d-b6d3-4574-abfe-9f4f2af21d22 } deleted successfully",
    "data": {}
}
```

## Installation

#### Steps for local usage

1. Clone this repository:

```sh
git clone https://github.com/KausTarafdar/pocket-url.git
```

2. Install dependencies:

```sh
npm install
```

3. Usage:
- Create a `.env` file in the root directory and add the following :-

```
PORT=/Set your PORT no. - default - 8000 /
JWT_SECRET=/ generate any hash string /
```
4. DB:
- Run the script `reset_db.sh` to create a fresh SQLite DB and run migrations for the required tables.
```sh
bash reset_db.sh
```
5. Start Server:
- To start in development mode run :-

```sh
npm run start:dev
```

Starts the server using **tsx watch** allowing the server to run constantly tracking file changes.

- To start in deployment run :-

```sh
npm run start:prod
```