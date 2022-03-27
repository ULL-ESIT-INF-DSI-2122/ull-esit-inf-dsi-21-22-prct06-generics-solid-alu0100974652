import 'mocha';
import { expect } from 'chai';
import { BasicStreamableCollection } from '../../src/Ejercicio-2/basicStreamableColl';
import { Streamable } from "../../src/Ejercicio-2/streamable";
import { Documental, Documentals } from "../../src/Ejercicio-2/documentales";

describe('Pruebas para la Colección de Documentals heredada de BasicStreamableCollection', () => {

    const nuestroPlaneta = new Documental('Nuestro Planeta', 'De ciencia y Naturaleza', 50, 2019);
    const senioresDeLaDroga = new Documental('Señores de la Droga', 'Sobre crimenes reales', 40, 2018);
    const misDocumentals = new Documentals([nuestroPlaneta, senioresDeLaDroga]);
    const tierraNoche = new Documental("La tierra de noche", "De ciencia y Naturaleza", 50, 2020);

    it('Se pueden utilizar el método addItem de la clase BasicStreamableCollection', () => {
        
        misDocumentals.addItem(tierraNoche);
        expect(misDocumentals.searchByName("La tierra de noche")).to.deep.eq([tierraNoche]);
    });

    it('Se pueden utilizar el método getItem de la clase BasicStreamableCollection', () => {
        expect(misDocumentals.getItem(1)).to.deep.eq(senioresDeLaDroga);
    });

    it('Se pueden utilizar el método getNumberOfItems de la clase BasicStreamableCollection', () => {
        expect(misDocumentals.getNumberOfItems()).to.deep.eq(3);
    });

    it('Se pueden utilizar el método removeItem de la clase BasicStreamableCollection', () => {
        misDocumentals.removeItem("Señores de la Droga");
        expect(misDocumentals.searchByName("Señores de la Droga")).to.deep.eq([]);
    });

    it('Se pueden utilizar los métodos de búsqueda (nombre, categoria, año) de la clase BasicStreamableCollection', () => {
        expect(misDocumentals.searchByName("Nuestro Planeta")).to.deep.eq([nuestroPlaneta]);
        expect(misDocumentals.searchByYear(2020)).to.deep.eq([tierraNoche]);
        expect(misDocumentals.searchByCategory("De ciencia y Naturaleza")).to.deep.eq([nuestroPlaneta, tierraNoche]);
    });

    it('Se pueden utilizar el método print de la clase BasicStreamableCollection', () => {
        expect(misDocumentals.print()).to.deep.eq('Nuestro Planeta, La tierra de noche, ');
    });
});