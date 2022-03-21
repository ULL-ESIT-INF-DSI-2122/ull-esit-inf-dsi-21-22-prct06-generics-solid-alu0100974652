import 'mocha';
import { expect } from 'chai';
import { Collectable } from '../src/collectable';

describe('Pruebas para la interfaz generica collectable', () => {
    it('Se implementa el addItem', () => {
        const myCollection = new Collectable<number>([3, 5, 7]);
        myCollection.addItem(8);
        expect(myCollection.getItem(3)).to.be.eq(8);
    });
});