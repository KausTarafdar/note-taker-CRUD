import { Request, Response } from "express";

import { NoteRepository } from "../../../models/note";
import NoteService from "../../../services/notesServices";

import { getPagination } from "../../../lib/getPagination";
import logger from "../../../lib/logger";
import { NotesArray } from "../../../dto/note";

const noteRepository: NoteRepository = new NoteRepository();
const noteService: NoteService = new NoteService(noteRepository);

export default async function handleGetNotes(req: Request, res: Response) {
    const page:number = parseInt(req.query.page as string)
    const limit:number = parseInt(req.query.limit as string)

    const skip:number = getPagination(limit, page)

    try {
        const notesArray: NotesArray | null = await noteService.getAllNotes(req.user_id as string, limit, page)
        if (notesArray === null) {
            res.status(200).json({
                status: 'success',
                message: 'successfully fetched all user notes',
                data: {}
            });
            return
        }
        res.status(200).json({
            status: 'success',
            message: 'successfully fetched all user notes',
            data: notesArray
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            errorType: 'ApiError',
            data: 'Something went wrong'
        })
    }
}
