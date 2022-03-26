/**
 * Clase que define un alfabeto
 * @class Alfabeto
 */

export class Alfabeto
{
    /**
     * Constructor de la clase
     * @param alph Parámetro tipo string que define un alfabeto
     */
    constructor(private alph: string)
    {
        this.alph = alph;
    }

    /**
     * GetAlfabeto
     * @returns Devuelve el alfabeto
     */
    getAlfabeto()
    {
        return this.alph;
    }

    /**
     * SetAlfabeto
     * @param nuevoAlfabeto Cambia el alfabeto por uno nuevo
     */
    setAlfabeto(nuevoAlfabeto: string)
    {
        this.alph = nuevoAlfabeto;
    }
    
    /**
     * GetTamanio
     * @returns Devuelve el tamaño del alfabeto
     */
    getTamanio()
    {
        return this.alph.length;
    }
}