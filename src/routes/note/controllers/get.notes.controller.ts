import { Request, Response } from "express";
import { NoteRepository } from "../../../models/note";

const noteRepository: NoteRepository = new NoteRepository();

export default function handleGetNotes(req: Request, Res: Response) {

}