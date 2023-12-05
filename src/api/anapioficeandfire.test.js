/* eslint-env jest */
const { getBooks, getListOfRestEndPoint } = require("./anapioficeandfire");
const rest = require("rest");
const apiIceAndFire = require("./anapioficeandfire");

jest.mock("rest");
jest.mock("./anapioficeandfire", () => {
  const originalModule = jest.requireActual("./anapioficeandfire");
  const resp = require("../__mocksData__/api.json");
  return {
    __esModule: true,
    ...originalModule,
    getListOfRestEndPoint: function () {
      return new Promise((resolve, reject) => {
        resolve({ entity: resp });
      });
    },
    getHouseByName: function (name) {
      return new Promise((resolve, reject) => {
          const house = resp.houses.find(house => house.name === name)
          resolve(house)
      })
    },
  };
});

describe("#getBooks() using Promises", () => {
  it("should load books data", () => {
    apiIceAndFire.getListOfRestEndPoint().then((data) => {
      expect(data.entity.books).toBeDefined();
      expect(data.entity.books).toEqual(
        "https://www.anapioficeandfire.com/api/books"
      );
      expect(data.entity.houses).toBeDefined();
      expect(data.entity.houses).toEqual(
        "https://www.anapioficeandfire.com/api/houses"
      );
    });
  });
});

describe("get Hause by", () => {
  it("should load hauses data", () => {
    apiIceAndFire.getListOfRestEndPoint().then((data) => {
      expect(data.entity.houses).toBeDefined();
      expect(data.entity.houses).toEqual(
        "https://www.anapioficeandfire.com/api/houses"
      );
    });
  });
});
describe("get Book by id 4", () => {
  it("should return books for id 3", () => {
    apiIceAndFire.getListOfRestEndPoint().then((data) => {
      expect(data.entity.books3).toBeDefined();
      expect(data.entity.books3).toEqual(
        "https://www.anapioficeandfire.com/api/books/4"
      );
    });
  });
});
describe("get Hause for House Allyrion of Godsgrace", () => {
  it("should return books for id 3", () => {
    apiIceAndFire.getListOfRestEndPoint().then((data) => {
      expect(data.entity.houses2Name).toBeDefined();
      expect(data.entity.houses2Name).toEqual(
        "https://www.anapioficeandfire.com/api/houses/2"
      );
    });
  });

  it('should load house mocked data for name', () => {
    var name = "House Allyrion of Godsgrace"
    apiIceAndFire.getHouseByName(name)
        .then(data => {
            expect(data.url).toBeDefined()
            expect(data.name).toEqual(name)
            expect(data.region).toBeDefined()
          })
  });

});