import 'mocha';
import { expect } from 'chai';
import { Collectable, NumericPrintableCollection, Printable, PrintableCollection } from '../src/Ejercicio-PE/collectable';

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

    it('Se implementa el método removeItems', () => {
        myCollection.removeItem(3);
        expect(myCollection.getNumberOfItems()).to.be.eq(3);
    });

    const printCollect = new Printable<number>([3, 5, 7]);

    it('Se implementa el método print', () => {
        expect(printCollect.print()).to.be.eq('3,5,7');
    });

    const numericPrintableCollectionPruebas = new NumericPrintableCollection<number>([3, 5, 7]);

    it('Se implementa el método print', () => {
        expect(numericPrintableCollectionPruebas.print()).to.be.eq('3,5,7');
    });

    it('Se implementa el método getITem', () => {
        expect(numericPrintableCollectionPruebas.getItem(0)).to.be.eq(3);
    });

    it('Se implementa el addItem', () => {
        numericPrintableCollectionPruebas.addItem(8);
        expect(numericPrintableCollectionPruebas.getItem(3)).to.be.eq(8);
    });

    it('Se implementa el método getNumberOfItems', () => {
        expect(numericPrintableCollectionPruebas.getNumberOfItems()).to.be.eq(4);
    });

    it('Se implementa el método removeItems', () => {
        numericPrintableCollectionPruebas.removeItem(3);
        expect(numericPrintableCollectionPruebas.getNumberOfItems()).to.be.eq(3);
    });

});