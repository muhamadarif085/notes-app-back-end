const { addNoteHandler, getAllNotesHandler, getHandlerById } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getHandlerById,
  },
  {
    method: 'PUT',
    path: '/notes{id}',
    handler: () => {
    },
  },
];

module.exports = routes;
