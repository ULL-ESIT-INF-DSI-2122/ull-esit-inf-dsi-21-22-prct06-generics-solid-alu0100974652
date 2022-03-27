import { BasicStreamableCollection } from "./basicStreamableColl";

/**
 * Clase principal Documental
 * @class Documental
 */
export class Pelicula
{
    /**
     * Constructor
     * @param name nombre de la pelicula
     * @param category categoria de la pelicula
     * @param time tiempo de la pelicula en minutos
     * @param year año de estreno
     */
    constructor(public name: string, public category: string, public time: number, public year: number) {}
}

/**
 * Clase extendida de BasicStreamableCollection<Pelicula>
 * @class Peliculas
 */
export class Peliculas extends BasicStreamableCollection<Pelicula>
{
    /**
     * Constructor
     * @param listaPeliculas Lista con las Peliculas
     */    
    constructor(protected listaPeliculas: Pelicula[]) 
    {
        super(listaPeliculas);
    }   
}