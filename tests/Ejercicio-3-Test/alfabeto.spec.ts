import 'mocha';
import { expect } from 'chai';
import { Alfabeto } from '../../src/Ejercicio-3/alfabeto';

describe('Pruebas para la clase Alfabeto', () => {

    const defAlfabeto = new Alfabeto('ABCDEFGHIJKLMNÑOPQRSTUVWXYZ');
    it('Se define un alfabeto correctamente', () => {
        expect(defAlfabeto.getAlfabeto()).to.eq('ABCDEFGHIJKLMNÑOPQRSTUVWXYZ')
    });

});
