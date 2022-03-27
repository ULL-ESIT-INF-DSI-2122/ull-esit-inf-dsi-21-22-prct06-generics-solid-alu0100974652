import { BasicStreamableCollection } from "./basicStreamableColl";

/**
 * Clase principal Serie
 * @class Serie
 */
export class Serie
{
    /**
     * Constructor
     * @param name nombre de la serie
     * @param category categoria de la serie
     * @param temporadas temporadas de la serie
     * @param time tiempo por capitulo (media) en minutos
     * @param year año de la ultima temporada
     */
    constructor(public name: string, public category: string, public temporadas: number, public time: number, public year: number) {}
}

/**
 * Clase extendida de BasicStreamableCollection<Serie>
 * @class Series
 */
export class Series extends BasicStreamableCollection<Serie>
{
    /**
     * Constructor
     * @param listaSeries Lista con las Series
     */    
    constructor(protected listaSeries: Serie[]) 
    {
        super(listaSeries);
    }   
}