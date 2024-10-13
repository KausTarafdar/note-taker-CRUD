export interface Note {
    id?: string,
    user_id: string,
    data: string
}

export interface NotesArray extends Array<Note>{}