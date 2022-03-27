import 'mocha';
import { expect } from 'chai';
import { BasicStreamableCollection } from '../../src/Ejercicio-2/basicStreamableColl';
import { Streamable } from "../../src/Ejercicio-2/streamable";
import { Serie, Series } from "../../src/Ejercicio-2/series";

describe('Pruebas para la Colección de series heredada de BasicStreamableCollection', () => {

    const suits = new Serie('Suits', 'Comedia', 9, 42, 2019);
    const lucifer = new Serie('Lucifer', 'Basada en comics', 6, 50, 2021);
    const misSeries = new Series([suits, lucifer]);

    it('Se pueden utilizar el método addItem de la clase BasicStreamableCollection', () => {
        const theGoodDoctor = new Serie("The Good Doctor", "Sobre médicos", 4, 42, 2020);
        misSeries.addItem(theGoodDoctor);
        expect(misSeries.searchByName("The Good Doctor")).to.deep.eq([theGoodDoctor]);
    });

    it('Se pueden utilizar el método getItem de la clase BasicStreamableCollection', () => {
        expect(misSeries.getItem(1)).to.deep.eq(lucifer);
    });

    it('Se pueden utilizar el método getNumberOfItems de la clase BasicStreamableCollection', () => {
        expect(misSeries.getNumberOfItems()).to.deep.eq(3);
    });

    it('Se pueden utilizar el método removeItem de la clase BasicStreamableCollection', () => {
        misSeries.removeItem("The Good Doctor");
        expect(misSeries.searchByName("The Good Doctor")).to.deep.eq([]);
    });

    it('Se pueden utilizar los métodos de búsqueda (nombre, categoria, año) de la clase BasicStreamableCollection', () => {
        expect(misSeries.searchByName("Lucifer")).to.deep.eq([lucifer]);
        expect(misSeries.searchByYear(2020)).to.deep.eq([]);
        expect(misSeries.searchByCategory("Comedia")).to.deep.eq([suits]);
    });

    it('Se pueden utilizar el método print de la clase BasicStreamableCollection', () => {
        expect(misSeries.print()).to.deep.eq('Suits, Lucifer, ');
    });
});