import { BasicStreamableCollection } from "./basicStreamableColl";

export class Pelicula
{
    constructor(public name: string, public category: string, public time: number, public year: number,) {}
}

export class Peliculas extends BasicStreamableCollection<Pelicula>
{
    constructor(protected listaPeliculas: Pelicula[]) 
    {
        super(listaPeliculas);
    }   
}