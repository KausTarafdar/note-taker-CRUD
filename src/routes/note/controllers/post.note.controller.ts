import { Request, Response } from "express";

import { NoteRepository } from "../../../models/note";
import NoteService from "../../../services/notesServices";

import { isBodyEmpty } from "../../../lib/emptyMessage";
import logger from "../../../lib/logger";

const noteRepository: NoteRepository = new NoteRepository();
const noteService: NoteService = new NoteService(noteRepository);

export default async function handleNewNote(req: Request, res: Response) {
    const { note } = req.body;
    if(!note || isBodyEmpty(note)) {
        logger.error('note body is empty')
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
        logger.info(`Created new note for user id: ${req.user_id}`)
        res.status(200).json({
            status: 'success',
            message: 'Note successfully added',
            data: insertNote
        })

    } catch (err) {
        logger.error(err)
        res.status(500).json({
            status: 'error',
            errorType: 'ApiError',
            message: 'Something went wrong'
        })
    }
}