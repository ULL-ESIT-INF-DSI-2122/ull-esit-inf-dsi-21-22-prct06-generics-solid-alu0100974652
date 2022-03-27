import { BasicStreamableCollection } from "./basicStreamableColl";

export class Documental
{
    constructor(public name: string, public category: string, public time: number, public year: number,) {}
}

export class Documentals extends BasicStreamableCollection<Documental>
{
    constructor(protected listaDocumentals: Documental[]) 
    {
        super(listaDocumentals);
    }   
}