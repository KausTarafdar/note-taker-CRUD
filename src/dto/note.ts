export interface Note {
    id?: string,
    user_id: string,
    data: string,
    created_at?: Date,
    updated_at?: Date
}

export interface NotesArray extends Array<Note>{}