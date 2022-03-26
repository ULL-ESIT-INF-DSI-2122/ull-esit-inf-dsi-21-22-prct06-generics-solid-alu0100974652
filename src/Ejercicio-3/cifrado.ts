import { Alfabeto } from "./alfabeto";

/**
 * Clas Cifrado
 * @class Cifrado define el codificado y descifrado tipo cesar
 */
export class Cifrado
{
    /**
     * Constructor
     * @param alfabet Define un alfabeto para el cifrado tipo alfabeto de la clase Alfabeto
     * @param clave Define una clave para el cifrado tipo alfabeto de la clase Alfabeto
     * @param mensaje Define un mensaje para el cifrado tipo alfabeto de la clase Alfabeto
     */
    constructor(private alfabet: Alfabeto, private clave: Alfabeto, private mensaje: Alfabeto)
    {
        this.alfabet = alfabet;
        this.clave = clave;
        this.mensaje = mensaje;
    }

    /**
     * GetterAlfabet
     * @returns Retorna el alfabeto y puede utilizar los métodos de la clase Alfabeto
     */
    getAlfabet()
    {
        return this.alfabet;
    }

    /**
     * GetterClave
     * @returns Retorna la clave y puede utilizar los métodos de la clase Alfabeto
     */
    getClave()
    {
        return this.clave;
    }

    /**
     * GetterMensaje
     * @returns Retorna el mensaje y puede utilizar los métodos de la clase Alfabeto
     */
    getMensaje()
    {
        return this.mensaje;
    }
    
    /**
     * ClaveRepetida
     * @param claveARepetir string con la clave del constructor
     * @param mensaje string con el mensaje del constructor
     * @returns Devuelve un string con la clave repetida hasta igualar el tamaño del mensaje original
     */
    claveRepetida(claveARepetir: string = this.clave.getAlfabeto(), mensaje: string = this.mensaje.getAlfabeto()): string
    {
        let iterator: number = 0;
        let claveRepetidaString: string = '';
        while(mensaje.length != claveRepetidaString.length)
        {
            claveRepetidaString = claveRepetidaString + claveARepetir[iterator];
            iterator++;

            if(iterator == claveARepetir.length)
                iterator = 0;
        }

        return claveRepetidaString;
    }

    /**
     * CodificarMensaje
     * @returns Devuelve un string con el mensaje codificado
     */
    codificarMensaje()
    {
        let claveRepe: string = this.claveRepetida();
        let mensajeSinCodificar: string = this.mensaje.getAlfabeto();
        let mensajeCodificado: string = '';
        let posicionLetra: number = 0;

        for(let i: number = 0; i < mensajeSinCodificar.length; i++)
        {
            let indexMensajeSinCodificar: number = this.alfabet.getAlfabeto().indexOf(mensajeSinCodificar[i]);
            let indexClaveRepetida: number = this.alfabet.getAlfabeto().indexOf(claveRepe[i]);
            posicionLetra = (indexMensajeSinCodificar + indexClaveRepetida + 1) % this.alfabet.getTamanio();

            mensajeCodificado = mensajeCodificado + this.alfabet.getAlfabeto().charAt(posicionLetra);
        }
        return mensajeCodificado;
    }


    /**
     * DescifrarMensaje
     * @returns Devuelve un string con el mensjae descifrado
     */
    descifrarMensaje()
    {
        let claveRepe: string = this.claveRepetida();
        let mensajeCodificado: string = this.mensaje.getAlfabeto();
        let mensajeDecodificado: string = '';
        let modulo: number = 0;

        for(let i: number = 0; i < mensajeCodificado.length; i++)
        {
            let indexMensajeCodificado: number = this.alfabet.getAlfabeto().indexOf(mensajeCodificado[i]);
            let indexClaveRepetida: number = this.alfabet.getAlfabeto().indexOf(claveRepe[i]);
            modulo = (indexMensajeCodificado + this.alfabet.getTamanio() - indexClaveRepetida - 1) % this.alfabet.getTamanio();

            mensajeDecodificado = mensajeDecodificado + this.alfabet.getAlfabeto().charAt(modulo);
        }
        return mensajeDecodificado;
    }
}