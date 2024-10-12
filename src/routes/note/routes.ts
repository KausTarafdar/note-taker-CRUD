import { Router } from "express";
import handleGetNotes from "./controllers/get.notes.controller";
import handleNewNote from "./controllers/post.new.note.controller";
import handlePatchNote from "./controllers/patch.note.controller";
import handleDeleteNote from "./controllers/delete.note.controller";

const notesRouter = Router();

//Receives current logged in user as a context parameter
notesRouter.get('/notes', handleGetNotes);
notesRouter.post('/new/note', handleNewNote);
notesRouter.patch('/note/:id', handlePatchNote);
notesRouter.delete('/note/:id', handleDeleteNote);

export default notesRouter;