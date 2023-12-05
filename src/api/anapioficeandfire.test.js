/* eslint-env jest */
const apiIceAndFire = require('./anapioficeandfire')
jest.mock('./anapioficeandfire', () => {
    const originalModule = jest.requireActual('./anapioficeandfire');
    const resp = require('../__mocksData__/api.json')
    return {
        __esModule: true,
        ...originalModule,
        getListOfRestEndPoint: function () {
            return new Promise((resolve, reject) => {
                resolve({entity: resp})
            })
        },
        getBooks: function () {
            return new Promise((resolve, reject) => {
                resolve({entity: resp.books})
            })
        },
        getBookById: function (id) {
            return new Promise((resolve, reject) => {
                const book = resp.books.find(book => book.url === `https://www.anapioficeandfire.com/api/books/${id}`)
                resolve(book)
            })
        },
        getHouseById: function (id) {
            return new Promise((resolve, reject) => {
                const house = resp.houses.find(house => house.url === `https://www.anapioficeandfire.com/api/houses/${id}`)
                resolve(house)
            })
        },
        getHouseByName: function (name) {
            return new Promise((resolve, reject) => {
                const house = resp.houses.find(house => house.name === name)
                resolve(house)
            })
        },
        getCharacterById: function (id) {
            return new Promise((resolve, reject) => {
                const character = resp.characters.find(character => character.url === `https://www.anapioficeandfire.com/api/characters/${id}`)
                resolve(character)
            })
        },
    };
});

describe('#getBooks() using Promises', () => {
    it('should load books data', () => {
        apiIceAndFire.getListOfRestEndPoint()
            .then(data => {
                expect(data.entity.books).toBeDefined()
                // expect(data.entity.books).toEqual('https://www.anapioficeandfire.com/api/books')
                expect(data.entity.houses).toBeDefined()
                // expect(data.entity.houses).toEqual('https://www.anapioficeandfire.com/api/houses')
            })
    })
})
describe('#getBookById() using Promises', () => {
    it('should load book mocked data for id 3', () => {
        apiIceAndFire.getBookById(3)
            .then(data => {
                expect(data.url).toBeDefined()
                expect(data.url).toEqual('https://www.anapioficeandfire.com/api/books/3')
                expect(data.name).toBeDefined()
                expect(data.isbn).toBeDefined()
                expect(data.authors).toBeDefined()
                expect(data.numberOfPages).toBeDefined()
                expect(data.publisher).toBeDefined()
                expect(data.country).toBeDefined()
                expect(data.mediaType).toBeDefined()
                expect(data.released).toBeDefined()
                expect(data.characters).toBeDefined()
                expect(data.povCharacters).toBeDefined()
            })
    })
})

describe('#getHouse() using Promises', () => {
    it('should load house mocked data for id 3', () => {
        apiIceAndFire.getHouseById(3)
            .then(data => {
                expect(data.url).toBeDefined()
                expect(data.url).toEqual('https://www.anapioficeandfire.com/api/houses/3')
                expect(data.region).toBeDefined()
                expect(data.coatOfArms).toBeDefined()
                expect(data.words).toBeDefined()
                expect(data.titles).toBeDefined()
                expect(data.seats).toBeDefined()
                expect(data.currentLord).toBeDefined()
                expect(data.overlord).toBeDefined()
                expect(data.cadetBranches).toBeDefined()
                expect(data.founder).toBeDefined()
                expect(data.founded).toBeDefined()
            })
    })
    it('should load house mocked data for name', () => {
        var name = "House Allyrion of Godsgrace"
        apiIceAndFire.getHouseByName(name)
            .then(data => {
                expect(data.url).toBeDefined()
                expect(data.name).toEqual(name)
                expect(data.region).toBeDefined()
                expect(data.coatOfArms).toBeDefined()
                expect(data.words).toBeDefined()
                expect(data.titles).toBeDefined()
                expect(data.seats).toBeDefined()
                expect(data.currentLord).toBeDefined()
                expect(data.overlord).toBeDefined()
                expect(data.cadetBranches).toBeDefined()
                expect(data.founder).toBeDefined()
                expect(data.founded).toBeDefined()
            })
    })
})
describe('#getCharacterById() using Promises', () => {
    it('should load character mocked data for id 3', () => {
        apiIceAndFire.getCharacterById(3)
            .then(data => {
                expect(data.url).toBeDefined()
                expect(data.url).toEqual('https://www.anapioficeandfire.com/api/characters/3')
                expect(data.name).toBeDefined()
                expect(data.gender).toBeDefined()
                expect(data.culture).toBeDefined()
                expect(data.born).toBeDefined()
                expect(data.died).toBeDefined()
                expect(data.titles).toBeDefined()
                expect(data.aliases).toBeDefined()
                expect(data.father).toBeDefined()
                expect(data.mother).toBeDefined()
                expect(data.spouse).toBeDefined()
                expect(data.allegiances).toBeDefined()
                expect(data.books).toBeDefined()
                expect(data.povBooks).toBeDefined()
                expect(data.tvSeries).toBeDefined()
                expect(data.playedBy).toBeDefined()
            })
    })
})
