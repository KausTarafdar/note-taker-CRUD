import { Note, NotesArray } from "../dto/note";
import { NoteRepository } from "../models/note";

export default class NoteService {
    private noteRepository: NoteRepository;

    constructor(noteRepository: NoteRepository){
        this.noteRepository = noteRepository
    }

    public async getAllNotes(user_id: string, limit: number, skip:number): Promise<NotesArray | null>  {
        const allNotes= await this.noteRepository.getAllNotes(user_id, limit, skip)
        if(allNotes == null) {
            return null
        }
        return allNotes
    }

    public async insertOrUpdateNote(note: Note): Promise<Note | null> {
        const newNote = await this.noteRepository.UpsertNote(note);
        if(newNote == null) {
            return null
        }
        return newNote
    }

    public async deleteNote(note_id: string): Promise<string | null> {
        const deleteNote = await this.noteRepository.DeleteOne(note_id);
        return deleteNote
    }
}