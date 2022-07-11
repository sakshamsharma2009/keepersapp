const express= require("express");
const notectrl= require("../controllers/notes-ctrl");

const router= express.Router();

router.post("/note", notectrl.createNote);
router.put("/note/:id", notectrl.updateNote);
router.get("/notes", notectrl.getNotes);
router.get("/note/:id", notectrl.getNoteById);
router.delete("/note/:id", notectrl.deleteNote);

module.exports= router;
