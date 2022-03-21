import 'mocha';
import { expect } from 'chai';
import { Collectable } from '../src/collectable';

describe('Pruebas para la interfaz generica collectable', () => {

    const myCollection = new Collectable<number>([3, 5, 7]);

    it('Se implementa el método getITem', () => {
        expect(myCollection.getItem(0)).to.be.eq(3);
    });

    it('Se implementa el addItem', () => {
        myCollection.addItem(8);
        expect(myCollection.getItem(3)).to.be.eq(8);
    });

    it('Se implementa el método getNumberOfItems', () => {
        expect(myCollection.getNumberOfItems()).to.be.eq(4);
    });

});