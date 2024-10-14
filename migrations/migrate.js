const sql3 = require('sqlite3').verbose()
const DB = new sql3.Database('./noteTaker.db', sql3.OPEN_READWRITE, connected);

function connected(err) {
  if (err) {
    console.log(err);
    return;
  }
}

async function up(db) {
    await create_user_table(db);
    await create_notes_table(db);
    db.close()
}

async function create_user_table(db) {
    let user_table_schema = `
        CREATE TABLE IF NOT EXISTS user(
        id CHAR(15) NOT NULL UNIQUE PRIMARY KEY,
        username VARCHAR NOT NULL UNIQUE,
        password VARCHAR NOT NULL,
        created_at DEFAULT CURRENT_TIMESTAMP
        )`;

    db.run(user_table_schema, [], (err) => {
        //callback function
        if (err) {
          console.log('Error creating user table', err.message);
          return;
        }
        console.log('Created users table', new Date());
      });
}

async function create_notes_table(db) {
    let note_table_schema = `
        CREATE TABLE IF NOT EXISTS note(
        id CHAR(15) NOT NULL UNIQUE PRIMARY KEY,
        user_id CHAR(15) NOT NULL,
        data VARCHAR NOT NULL,
        created_at DEFAULT CURRENT_TIMESTAMP,
        updated_at DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES user(id)
    )`;

    db.run(note_table_schema, [], (err) => {
        //callback function
        if (err) {
          console.log('Error creating user table', err.message);
          return;
        }
        console.log('Created notes table', new Date());
      });
}

up(DB);