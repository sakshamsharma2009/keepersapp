const Notes = require("../models/notes-model");

createNotes=(req, res)=>{
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must write a note!!!',
        })
    }

const note= new Notes(body);
if(!note)
{
    return res.status(400).json({ success: false, error: err });
}

note
    .save()
    .then(()=>{
        return res.status(201).json({
            success: true,
            id: note._id,
            message: 'Note created!'})
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'Note not created!',
        })
    });
}

updateNote = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    note.findOne({ _id: req.params.id }, (err, note) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Note not found!',
            })
        }
        note.title = body.title
        note.content = body.content
        note
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: note._id,
                    message: 'Note updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Note not updated!',
                })
            })
    })
}

deleteNote = async (req, res) => {
    await note.findOneAndDelete({ _id: req.params.id }, (err, note) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!note) {
            return res
                .status(404)
                .json({ success: false, error: `Note not found` })
        }

        return res.status(200).json({ success: true, data: note })
    }).catch(err => console.log(err))
}

getNoteById = async (req, res) => {
    await note.findOne({ _id: req.params.id }, (err, note) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!note) {
            return res
                .status(404)
                .json({ success: false, error: `Note not found` })
        }
        return res.status(200).json({ success: true, data: note })
    }).catch(err => console.log(err))
}

getNotes = async (req, res) => {
    await note.find({}, (err, notes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!notes.length) {
            return res
                .status(404)
                .json({ success: false, error: `Note not found` })
        }
        return res.status(200).json({ success: true, data: notes })
    }).catch(err => console.log(err))
}

module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNotes,
    getNoteById,
}


