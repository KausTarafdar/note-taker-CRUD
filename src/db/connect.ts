import sqlite3 from "sqlite3";
import logger from "../lib/logger";

const sql3 = sqlite3.verbose()

const DB = new sql3.Database('./noteTaker.db', sqlite3.OPEN_READWRITE, connected);

function connected(err: Error | null) {
  if (err) {
    logger.error(err.message);
    return;
  }
    logger.info('Connected to sqlite database...')
}

export default DB;