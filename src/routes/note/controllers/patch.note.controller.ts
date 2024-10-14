import { Request, Response } from "express";
import { NoteRepository } from "../../../models/note";
import NoteService from "../../../services/notesServices";
import logger from "../../../lib/logger";

const noteRepository: NoteRepository = new NoteRepository();
const noteService: NoteService = new NoteService(noteRepository);

export default async function handlePatchNote(req: Request, res: Response) {
    const { id, note } = req.body
    if (!id || !note) {
        logger.error("Request body cannot be empty")
        res.status(400).json({
            status: 'error',
            errorType: 'Bad Request',
            message: 'Request body cannot be empty'
        })
        return
    }

    try {
        const updateNote = await noteService.insertOrUpdateNote({
            id: id,
            user_id: req.user_id!,
            data: note
        })
        if (updateNote === null) {
            throw new Error()
        }

        logger.info(`Patch note id ${id} for user id ${req.user_id}`)
        res.status(200).json({
            status: 'success',
            message: 'Note successfully updated',
            data: updateNote
        })

    } catch(err) {
        console.error(err)
        res.status(500).json({
            status: 'error',
            errorType: 'ApiError',
            message: 'Something went wrong'
        })
    }
}