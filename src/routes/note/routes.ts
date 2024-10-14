import { Router } from "express";
import handleGetNotes from "./controllers/get.notes.controller";
import handleNewNote from "./controllers/post.note.controller";
import handlePatchNote from "./controllers/patch.note.controller";
import handleDeleteNote from "./controllers/delete.note.controller";
import protectRoute from "../../middleware/protectRoute";

const notesRouter = Router();

//Doesn't require body
notesRouter.get('/notes', protectRoute, handleGetNotes);
notesRouter.delete('/note/:note_id', protectRoute, handleDeleteNote);

//Require a body
notesRouter.post('/new/note', protectRoute, handleNewNote);
notesRouter.patch('/note', protectRoute, handlePatchNote);

export default notesRouter;