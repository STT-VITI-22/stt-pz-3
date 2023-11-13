 apiIceAndFire = require('./anapioficeandfire');
const mockData = require('./apiMockData.json');

jest.mock('./anapioficeandfire', () => {
  const originalModule = jest.requireActual('./anapioficeandfire');
  return {
    __esModule: true,
    ...originalModule,
    getListOfRestEndPoint: () => Promise.resolve({ entity: mockData }),
    getBookById: (id) => Promise.resolve(mockData.books[id]),
    getHouseById: (id) => Promise.resolve(mockData.houses.find(house => house.url.endsWith(id))),
    getHouseByName: (name) => Promise.resolve(mockData.houses.find(house => house.name === name)),
  };
});

describe('API Tests', () => {
  it('should get book by id', async () => {
    const bookId = '3';
    const book = await apiIceAndFire.getBookById(bookId);
    expect(book).toEqual(mockData.books[bookId]);
  });

  it('should get list of books and houses', async () => {
    const data = await apiIceAndFire.getListOfRestEndPoint();
    expect(data.books).toBeDefined();
    expect(data.houses).toBeDefined();
  });

  it('should get house by id', async () => {
    const houseId = 'house-id'; // Замініть на фактичний ID будинку
    const house = await apiIceAndFire.getHouseById(houseId);
    expect(house).toBeDefined();
  });

  it('should get house by name', async () => {
    const houseName = 'House Allyrion of Godsgrace';
    const house = await apiIceAndFire.getHouseByName(houseName);
    expect(house).toEqual(mockData.houses.find(h => h.name === houseName));
  });
});