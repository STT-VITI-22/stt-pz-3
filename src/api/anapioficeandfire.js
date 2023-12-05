const rest = require('rest');
const mime = require('rest/interceptor/mime');

const request = rest.wrap(mime);

const getListOfRestEndPoint = () => request(`https://www.anapioficeandfire.com/api`)
const getBooks = () => request(`https://www.anapioficeandfire.com/api/books`)

module.exports = { getListOfRestEndPoint, getBooks };
