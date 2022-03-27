import { Streamable } from "./streamable";

export abstract class BasicStreamableCollection<T extends {name: string, year: number, category: string}> implements Streamable<T>
{
   /**
    * Constructor de la clase
    * @param items Parámetro tipo array de cualquier tipo
    */
    constructor(protected items: T[]) 
    {
        this.items = items;
    };

    /**
     * AddItem 
     * @param newItem añade el nuevo item a través de un push
     */
     addItem(newItem: T): void {
        this.items.push(newItem);
    }

    /**
     * GetItem
     * @param index Parámetro tipo number para determinar la posición
     * @returns retorna el valor de la posición pasada como parámetro
     */
    getItem(index: number): T {
        return this.items[index];
    }

        /**
     * GetNumberOfItems
     * @returns devuelve el tamaño del vector items
     */
    getNumberOfItems(): number {
        return this.items.length;
    }

    /**
     * RemoveItem
     * @param index indice para saber que posición eliminar
     */
    removeItem(name: string): void {
        this.items.forEach((item,index) => {
            if(item.name == name)
                this.items.splice(index,1);
        });
    }

    /**
     * searchByCategory
     * @param category parámetro que indica la categoria 
     * @returns retorna un nuevo array con las coincidencias
     */
    searchByCategory(category: string): T[] {
        return this.items.filter(item => item.category == category);
    }

    /**
     * searchByName
     * @param name parámetro que indica el nombre
     * @returns retorna un nuevo array con las coincidencias
     */
    searchByName(name: string): T[] {
        return this.items.filter(item => item.name == name);
    }

    /**
     * searchByYear
     * @param year parámetro que indica el año
     * @returns retorna un nuevo array con las coincidencias
     */
    searchByYear(year: number): T[] {
        return this.items.filter(item => item.year == year);
    }

    /**
     * print
     * @returns retorna el array formateado para su lectura
     */
    print(): string {
        return this.items.join(',');
    }
}