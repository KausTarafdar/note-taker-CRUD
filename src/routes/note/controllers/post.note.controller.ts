import { Request, Response } from "express";

import { NoteRepository } from "../../../models/note";
import NoteService from "../../../services/notesServices";

import { isBodyEmpty } from "../../../lib/emptyMessage";

const noteRepository: NoteRepository = new NoteRepository();
const noteService: NoteService = new NoteService(noteRepository);

export default async function handleNewNote(req: Request, res: Response) {
    const { note } = req.body;
    if(!note || isBodyEmpty(note)) {
        res.status(400).json({
            status: 'error',
            errorType: 'Bad Request',
            message: 'Request body cannot be empty'
        })
        return
    }
    try {
        const insertNote = await noteService.insertOrUpdateNote({
            user_id: req.user_id!,
            data: note
        })
        if (insertNote === null) {
            throw new Error();
        }

        res.status(200).json({
            status: 'success',
            message: 'Note successfully added',
            data: insertNote
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'error',
            errorType: 'ApiError',
            message: 'Something went wrong'
        })
    }
}