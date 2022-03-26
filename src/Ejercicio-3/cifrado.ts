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
        while(mensaje.length != claveARepetir.length)
        {
            claveRepetidaString = claveRepetidaString + claveARepetir[iterator];
            iterator++;

            if(iterator == claveARepetir.length)
                iterator = 0;
        }

        return claveRepetidaString;
    }
}