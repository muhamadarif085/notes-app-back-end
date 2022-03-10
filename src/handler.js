const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, h) => {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);

  // create Update
  const createdAt = new Date().toISOString();
  const updateAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updateAt,
  };

  // push ke note
  notes.push(newNote);
  const IsSuccess = notes.filter((note) => note.id === id).length > 0;
  // Response sukses
  if (IsSuccess) {
    const res = h.response({
      status: 'success',
      message: 'Catatan Berhasil dibuat',
      data: {
        noteId: id,
      },
    });
    res.code(201);
    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });

  res.code(500);
  return res;
};

const getAllNotesHandler = () => ({
  status: 'Success',
  data: {
    notes,
  },
});

const getHandlerById = (req, h) => {
  // mendapatkan id dengan memanfaatkan filter()
  const { id } = req.params;
  const note = notes.filter((n) => n.id === id)[0];
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  const res = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  res.code(404);
  return res;
};

const editNoteByHandler = (req, h) => {
  const {id} = req.params;
  const {title, tags, body} = req.payload;
  const updateAt =new Date().toISOString();
};

module.exports = { addNoteHandler, getAllNotesHandler, getHandlerById, editNoteByHandler };
