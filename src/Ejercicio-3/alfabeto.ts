export class Alfabeto
{
    constructor(private alph: string)
    {
        this.alph = alph;
    }

    getAlfabeto()
    {
        return this.alph;
    }

    setAlfabeto(nuevoAlfabeto: string)
    {
        this.alph = nuevoAlfabeto;
    }
}