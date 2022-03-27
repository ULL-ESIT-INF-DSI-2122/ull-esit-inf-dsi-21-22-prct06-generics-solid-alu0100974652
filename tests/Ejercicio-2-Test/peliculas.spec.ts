import 'mocha';
import { expect } from 'chai';
import { BasicStreamableCollection } from '../../src/Ejercicio-2/basicStreamableColl';
import { Streamable } from "../../src/Ejercicio-2/streamable";
import { Pelicula, Peliculas } from "../../src/Ejercicio-2/peliculas";

describe('Pruebas para la Colección de películas heredada de BasicStreamableCollection', () => {

    const batman = new Pelicula('Batman', 'Accion', 210, 2022);
    const elProyectoAdam = new Pelicula('El proyecto Adam', 'Ciencia ficcion', 106, 2022);
    const misPeliculas = new Peliculas([batman, elProyectoAdam]);

    it('Se pueden utilizar el método addItem de la clase BasicStreamableCollection', () => {
        const premonicion = new Pelicula("Premonicion", "Suspense", 101, 2015);
        misPeliculas.addItem(premonicion);
        expect(misPeliculas.searchByName("Premonicion")).to.deep.eq([premonicion]);
    });

    it('Se pueden utilizar el método getItem de la clase BasicStreamableCollection', () => {
        expect(misPeliculas.getItem(1)).to.deep.eq(elProyectoAdam);
    });

    it('Se pueden utilizar el método getNumberOfItems de la clase BasicStreamableCollection', () => {
        expect(misPeliculas.getNumberOfItems()).to.deep.eq(3);
    });

    it('Se pueden utilizar el método removeItem de la clase BasicStreamableCollection', () => {
        misPeliculas.removeItem("Premonicion");
        expect(misPeliculas.searchByName("Premonicion")).to.deep.eq([]);
    });

    it('Se pueden utilizar los métodos de búsqueda (nombre, categoria, año) de la clase BasicStreamableCollection', () => {
        expect(misPeliculas.searchByName("Premonicion")).to.deep.eq([]);
        expect(misPeliculas.searchByYear(2022)).to.deep.eq([batman, elProyectoAdam]);
        expect(misPeliculas.searchByCategory("Accion")).to.deep.eq([batman]);
    });



});