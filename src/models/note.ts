import { randomUUID } from "crypto";
import { DB } from "../db/connect";
import { Note, NotesArray } from "../dto/note";
import { isNote, isNotesArray } from "../lib/isNote";
import logger from "../lib/logger";

export class NoteRepository {
    public async FindOneNote(id: string): Promise<Note | null>{
        try {
            const result = await DB.prepare(`SELECT * FROM note
                                            where id = '${id}'`).get();
            if (isNote(result)) {
                const note: Note = {
                    id: result.id,
                    user_id: result.user_id,
                    data: result.data
                }

                return note
            }
            return null
        } catch (err) {
            logger.error(err)
            return null
        }
    }

    public async getAllNotes(user_id: string, limit: number, skip: number): Promise<NotesArray | null>{
        try {
            const result= DB.prepare(`SELECT * FROM note where user_id='${user_id}' LIMIT ${skip}, ${limit}`).all();
            if(isNotesArray(result)) {
                return result
            }
            return null
        } catch (err) {
            logger.error(err)
            return null
        }
    }

    private async _UpdateNote(note: Note) {
        try {
            const query = DB.prepare(`UPDATE note
                                    SET data='${note.data}',
                                    updated_at=CURRENT_TIMESTAMP
                                    WHERE id='${note.id}'`)
            const transaction = DB.transaction(() => {
                    const info = query.run()
                    logger.info(info.changes)
            })
            transaction()

            return {
                id: note.id,
                user_id: note.user_id,
                data: note.data
            }
        } catch (err) {
            logger.error(err)
            return null
        }
    }

    private async _InsertOne(note: Note) {
        try {
            const query = DB.prepare(`INSERT INTO note(id, user_id, data)
                                    VALUES('${note.id}', '${note.user_id}', '${note.data}')`);
            const transaction = DB.transaction(() => {
                const info = query.run()
                logger.info(info.changes)
            })
            transaction()

            return {
                id: note.id,
                user_id: note.user_id,
                data: note.data
            }
        } catch (err) {
            logger.error(err)
            return null
        }
    }

    public async UpsertNote(note: Note) {
        try {
            if (!note.id) {
                const id: string = randomUUID()
                const result = await this._InsertOne({
                    id: id,
                    user_id: note.user_id,
                    data: note.data
                })
                if (result === null)
                    throw new Error("Insert result null");
                return result
            }
            else {
                const existingNote: Note | null = await this.FindOneNote(note.id!);
                if(existingNote === null)
                    throw new Error('Note does not exist');
                const result = await this._UpdateNote({
                    id: existingNote.id,
                    user_id: note.user_id,
                    data: note.data
                });
                if(result === null)
                    throw new Error("Update note result null");
                return result;
            }
        } catch (err) {
            logger.error(err)
            return null
        }
    }

    public async DeleteOne(id: string): Promise<string | null>{
        try {
            const existingNote: Note | null = await this.FindOneNote(id);

            if (existingNote !== null) {
                const query = DB.prepare(`DELETE FROM note WHERE id='${id}'`);
                const transaction = DB.transaction(() => {
                    const info = query.run()
                    logger.info(info.changes)
                })
                transaction()
                return existingNote.id as string
            } else {
                return 'notFound'
            }
        } catch (err) {
            logger.error(err)
            return null
        }
    }
}
