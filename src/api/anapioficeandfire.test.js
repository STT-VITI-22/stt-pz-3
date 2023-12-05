/* eslint-env jest */
const apiIceAndFire = require('./anapioficeandfire');
const resp = require("../__mocksData__/api.json");

jest.mock('./anapioficeandfire', () => {
    const originalModule = jest.requireActual('./anapioficeandfire');
    const resp = require('../__mocksData__/api.json');

    return {
        __esModule: true,
        ...originalModule,
        getHouses: function () {
            return new Promise((resolve, reject) => {
                resolve({entity: resp.houses});
            });
        },
        getHouseById: function (id) {
            return new Promise((resolve, reject) => {
                const house = resp.houses.find(house => house.id === id.toString());
                resolve(house);
            });
        },               
        getHouseByName: function (name) {
            return new Promise((resolve, reject) => {
                const house = resp.houses.find(house => house.name === name);
                resolve(house);
            });
        },
    };
});

describe('#getHouses() using Promises', () => {
    it('should load houses data', () => {
        apiIceAndFire.getHouses()
            .then(data => {
                expect(data.entity).toEqual(resp.houses);
            });
    });
});

describe('#getHouseById() using Promises', () => {
    it('should load house mocked data for id 3', async () => {
        const data = await apiIceAndFire.getHouseById(3);
        const expectedHouse = resp.houses.find(house => house.id === 3);
        expect(data).toEqual(expectedHouse);
    });    
});

describe('#getHouseByName() using Promises', () => {
    it('should load house mocked data for name "House Allyrion of Godsgrace"', () => {
        const name = "House Allyrion of Godsgrace";
        apiIceAndFire.getHouseByName(name)
            .then(data => {
                const expectedHouse = resp.houses.find(house => house.name === name);
                expect(data).toBeDefined();
            });
    });
});
