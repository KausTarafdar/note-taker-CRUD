import { Request, Response } from "express";
import { NoteRepository } from "../../../models/note";
import NoteService from "../../../services/notesServices";

const noteRepository: NoteRepository = new NoteRepository();
const noteService: NoteService = new NoteService(noteRepository);

export default async function handleDeleteNote(req: Request, res: Response) {
    const { note_id } = req.params;
    if(!note_id){
        res.status(400).json({
            status: 'error',
            errorType: 'Bad request',
            message: 'Param assignment incorrect'
        })
        return
    }
    try {
        const result = await noteService.deleteNote(note_id)
        if(result === null){
            throw new Error()
        }
        else if (result === 'notFound') {
            res.status(404).json({
                status: 'error',
                errorType: 'Not Found',
                message: 'Note with provided id does not exist'
            })

        }
        else {
            res.status(200).json({
                status: 'success',
                message: `Note id { ${result} } deleted successfully`,
                data: {}
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'error',
            errorType: 'Internal Server Error',
            message: 'Something went wrong'
        })
    }
}