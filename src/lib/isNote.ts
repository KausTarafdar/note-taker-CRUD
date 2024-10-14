import { Note, NotesArray } from "../dto/note";

export const isNote = (note: any): note is Note => typeof(note.id) == 'string' && typeof(note.user_id) == 'string' && typeof(note.data) == 'string';

export const isNotesArray = (arrayNotes: any): arrayNotes is NotesArray => isNote(arrayNotes[0]);