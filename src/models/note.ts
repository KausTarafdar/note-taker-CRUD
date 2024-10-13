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
            return null
        }
    }

    public async getAllNotes(user_id: string, limit: number, skip: number): Promise<NotesArray | null>{
        try {
            const result= await DB.prepare(`SELECT * FROM note where user_id='${user_id} LIMIT ${skip}, ${limit}`).all();
            if(isNotesArray(result)) {
                return result
            }
            return null
        } catch (err) {
            return null
        }
    }

    private async _UpdateNote(note: Note) {
        const query = DB.prepare(`UPDATE note
                                SET data='${note.data},
                                updated_at=CURRENT_TIMESTAMP
                                WHERE id=${note.id}'`)
        const transaction = DB.transaction(() => {
            const info = query.run()
            logger.info(info.changes)
        })
        transaction()
    }

    private async _InsertOne(note: Note) {
        const query = DB.prepare(`INSERT INTO note(id, user_id, data)
                                VALUES('${note.id}', '${note.user_id}', '${note.data}')`);
        const transaction = DB.transaction(() => {
            const info = query.run()
            logger.info(info.changes)
        })
        transaction()
    }

    public async UpsertNote(note: Note){
        try {
            const existingNote: Note | null = await this.FindOneNote(note.id!);

            if (existingNote !== null) {
                await this._UpdateNote(existingNote);
            }
            else {
                const id: string = randomUUID();
                await this._InsertOne({
                    id: id,
                    user_id: note.user_id,
                    data: note.data
                })
            }
        } catch(err) {
            return null
        }
    }

    public async DeleteOne(id: string){
        try {
            const query = DB.prepare(`DELETE FROM note WHERE id='${id}'`);
            const transaction = DB.transaction(() => {
                const info = query.run()
                logger.info(info.changes)
            })
            transaction()
        } catch (err) {
            return null
        }
    }
}
