const { nanoid } = require('nanoid');
const books = require('. /books');

const addBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);

        return response;
        }

    if (pageCount > readPage) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);

        return response;
        }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = (pageCount === readPage);
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    book.push(newBook);

    const isSuccess = book.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
      const response = h
        .response({
          status: 'success',
          message: 'Buku berhasil ditambahkan ',
          data: {
            bookId: id,
          },
        })
        response.code(201);

        return response;
    }

    const response = h.response ({
        status: 'error',
        message: 'Buku gagal ditambahkan'
    });
    response.code(500);

    return response;
    };

const getAllBooksHandler = (request, h) => {
    const {
        name,
        reading,
        finished
    } = request.query;

    if (name) {
        filteredBooks = filteredBooks.filter((book) => 
        book.name.toLowerCase().includes(name.tolowerCase()));
    }

    if (reading) {
        filteredBooks = filteredBooks.filter((book) =>
        book.reading === !!Number(reading));
    }

    if (finish) {
        filteredBooks = filteredBooks.filter((book) =>
        book.finished ===!!Number(finished));
    }

    const response = h.response({
        status: 'success',
        data: {
            books: [{
                BookId: id,
                BookName: name,
                BookPublisher: books.publisher,
            }
        ]
        },
    });
    response.code(200);

    return response;
    };

    const getBookByIdHandler = (request, h) => {
        const {id} = request.params;
        const book = books.filter((b) => b.id === id)[0];
    
        if (book !== undefined) {
            return {
                status: 'success',
                data: {
                    book,
                },
            };
        }

        const response = h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',      
        });
        response.code(404);

        return response
    };

const editBookByIdHandler = (request, h) => {
    const {id} = request.params;
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        if (name === undefined) {
            const response = h.response ({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            });
            response.code(400);

            return response;
        }

    if (pageCount < readPage) {
        const response = h.response ({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            })
            response.code(400);

            return response;
        }

    const finished = (pageCount === readPage);

    book[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        updatedAt,
    };

    const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    });
    response.code(200);

    return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);

    return Response;
};

const deleteBookByIdHandler = (request, h) => {
    const {id} = request.params;

    const index = books.findIndex((note) => note.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);

        return response;
    }

    const response = h.response ({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);

    return response;
};

module.export = {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler,
};