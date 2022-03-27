import { BasicStreamableCollection } from "./basicStreamableColl";

export class Serie
{
    constructor(public name: string, public category: string, public temporadas: number, public time: number, public year: number,) {}
}

export class Series extends BasicStreamableCollection<Serie>
{
    constructor(protected listaSeries: Serie[]) 
    {
        super(listaSeries);
    }   
}