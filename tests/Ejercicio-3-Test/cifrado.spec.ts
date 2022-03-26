import 'mocha';
import { expect } from 'chai';
import { Cifrado } from '../../src/Ejercicio-3/cifrado';
import { Alfabeto } from '../../src/Ejercicio-3/alfabeto';

describe('Pruebas para la clase Cifrado', () => {

    const clave = new Alfabeto('');
    const mensaje = new Alfabeto('');
    const alfabeto = new Alfabeto('');
    const defCifrado = new Cifrado(alfabeto, clave, mensaje);

    it('Se puede cambiar el Alfabeto del cifrado', () => {
        defCifrado.getAlfabet().setAlfabeto('ABCDEFGHIJKLMNÑOPQRSTUVWXYZ');
        expect(defCifrado.getAlfabet().getAlfabeto()).to.eq('ABCDEFGHIJKLMNÑOPQRSTUVWXYZ');
    });

    it('Se puede cambiar la Clave del cifrado', () => {
        defCifrado.getClave().setAlfabeto('CLAVE');
        expect(defCifrado.getClave().getAlfabeto()).to.eq('CLAVE');
    });

    it('Se puede cambiar el Mensaje del cifrado', () => {
        defCifrado.getMensaje().setAlfabeto('HOLAESTOESUNAPRUEBA');
        expect(defCifrado.getMensaje().getAlfabeto()).to.eq('HOLAESTOESUNAPRUEBA');
    });

    it('Método que repite la palabra Clave hasta igualar el tamaño de del mensaje original: Clave - "CLAVE" Mensaje - "HOLAESTOESUNAPRUEBA" = "CLAVECLAVECLAVECLAV"', () => {
        expect(defCifrado.claveRepetida('CLAVE', 'HOLAESTOESUNAPRUEBA')).to.eq('CLAVECLAVECLAVECLAV');
    });

});