import { Alfabeto } from "./alfabeto";

export class Cifrado
{
    constructor(private alfabet: Alfabeto, private clave: Alfabeto, private mensaje: Alfabeto)
    {
        this.alfabet = alfabet;
        this.clave = clave;
        this.mensaje = mensaje;
    }

    getAlfabet()
    {
        return this.alfabet;
    }

    getClave()
    {
        return this.clave;
    }

    getMensaje()
    {
        return this.mensaje;
    }
    
    claveRepetida(claveARepetir: string, mensaje: string): string
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

    codificarMensaje()
    {
        let claveRepe: string = this.claveRepetida(this.clave.getAlfabeto(), this.mensaje.getAlfabeto());
        let mensajeSinCodificar: string = this.mensaje.getAlfabeto();
        let mensajeCodificado: string = '';
        let modulo: number = 0;


        for(let i: number = 0; i < mensajeSinCodificar.length; i++)
        {
            let indexMensajeSinCodificar: number = this.alfabet.getAlfabeto().indexOf(mensajeSinCodificar[i]);
            let indexClaveRepetida: number = this.alfabet.getAlfabeto().indexOf(claveRepe[i]);
            modulo = (indexMensajeSinCodificar + indexClaveRepetida + 1) % this.alfabet.getTamanio();

            mensajeCodificado = mensajeCodificado + this.alfabet.getAlfabeto().charAt(modulo);

        }

        return mensajeCodificado;
    }
}