import { Note, NotesArray } from "../dto/note";

export const isNote = (note: any): note is Note => note.id && note.user_id && note.data;

export const isNotesArray = (arrayNotes: any): arrayNotes is NotesArray => arrayNotes.filter(isNote);