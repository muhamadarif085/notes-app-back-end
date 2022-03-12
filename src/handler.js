const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, h) => {
  // Mnegirim konten ke catatan dg ID acak
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

  // Push ke note
  notes.push(newNote);
  const IsSuccess = notes.filter((note) => note.id === id).length > 0;
  // Response sukses
  if (IsSuccess) {
    const res = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    res.code(201);
    return res;
  }
  // Respon gagal
  const res = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });

  res.code(500);
  return res;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getHandlerById = (req, h) => {
  // Mendapatkan id dengan memanfaatkan filter()
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

const editNoteByIdHandler = (req, h) => {
  // Mengambil id
  const { id } = req.params;
  // Mengambil data notes terbaru
  const { title, tags, body } = req.payload;
  const updateAt = new Date().toISOString();
  // Finding index ke-
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt,
    };
    // Respon sukses
    const res = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    res.code(200);
    return res;
  }
  // Respon fail
  const res = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  res.code(404);
  return res;
};

const deleteNoteByIdHandler = (req, h) => {
  // Mendapatkan ID dan mencocokkannyars
  const { id } = req.params;
  const index = notes.findIndex((note) => note.id === id);
  // Menghapus array dengan arraay.splice()
  if (index !== -1) {
    notes.splice(index, 1);
    // Respon berhasil
    const res = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    res.code(200);
    return res;
  }
  // Respon gagal
  const res = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  res.code(404);
  return res;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getHandlerById,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
