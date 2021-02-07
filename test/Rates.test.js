const Rates = require('../src/classes/Rates');
const Rate = require('../src/classes/Rate');


let rate1 = new Rate('abc', 'description', 10, 1)
let rate2 = new Rate('def', 'BoxKnight', 5, 2)
let rate3 = new Rate('ghij', 'description', 2, 3)
let rate4 = new Rate('klm', 'BoxKnight', 2, 4)

let ratesList = new Rates()

beforeEach(() => {
    ratesList.addRate(rate1)
    ratesList.addRate(rate2)
    ratesList.addRate(rate3)
    ratesList.addRate(rate4)
});

afterEach(() => {
    ratesList = new Rates()
});

describe('getLength', () => {
    it('Should return the correct length',  () => {
        let rate5 = new Rate('klm', 'BoxKnight', 5, 5)
        ratesList.addRate(rate5)
        expect(ratesList.getLength()).toEqual(5)
    });
});

describe('addRate', () => {
    it('Should return the added rate',  () => {
        let rate5 = new Rate('klm', 'BoxKnight', 5, 5)
        ratesList.addRate(rate5)
        expect(ratesList.getRateByPosition(ratesList.getLength()-1)).toEqual(rate5);
    });
});

describe('getBestRate', () => {
    it('Should return the fastest and cheapest rate',  () => {
        expect(ratesList.getBestRate()).toBe(rate3);
    });
});
