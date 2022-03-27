import { BasicStreamableCollection } from "./basicStreamableColl";

/**
 * Clase principal Documental
 * @class Documental
 */
export class Documental
{
    /**
     * Constructor
     * @param name nombre del documental
     * @param category categoria del documental
     * @param time tiempo del documental en minutos
     * @param year año del documental
     */
    constructor(public name: string, public category: string, public time: number, public year: number) {}
}

/**
 * Clase extendida de BasicStreamableCollection<Documental>
 * @class Documentals
 */
export class Documentals extends BasicStreamableCollection<Documental>
{
    /**
     * Constructor
     * @param listaDocumentals Lista con los Documentales
     */
    constructor(protected listaDocumentals: Documental[]) 
    {
        super(listaDocumentals);
    }   
}