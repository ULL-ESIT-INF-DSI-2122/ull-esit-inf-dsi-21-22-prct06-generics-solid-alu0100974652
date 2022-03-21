/**
 * Interfaz generica
 * @interface CollectableInterface interfaz generica de collectable
 */
interface CollectableInterface<T>
{
    addItem(newItem: T): void;
    getItem(index: number): T;
    removeItem(index: number): void;
    getNumberOfItems(): number;
}

/**
 * @class Clase Collectable<T>
 */
export class Collectable<T> implements CollectableInterface<T> 
{
    /**
     * Constructor de la clase
     * @param items Parámetro tipo array de cualquier tipo
     */
    constructor(private items: T[]) {}

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
    removeItem(index: number): void {
        this.items.splice(index, 1);
    }
}

/**
 * Interfaz Genérica para print
 * @interface PrintableInterface interfaz generica de Printable
 */
interface PrintableInterface<T>
{
    print(): string;
}


/**
 * @class Printable para imprimir cualquier tipo de dato
 */
export class Printable<T> implements PrintableInterface<T>
{
    /**
     * Constructor
     * @param items Arrays de cualquier tipo de dato
     */
    constructor(private items: T[]) {};

    /**
     * Print
     * @returns devuelve un string con el array formateado
     */
    print():string 
    {
        return this.items.join(',');        
    }
}


/**
 * @class Clase abstracta PrintableCollection con los métodos de las otras interfaces genericas
 */
export abstract class PrintableCollection<T>
{
   /**
    * Constructor de la clase
    * @param items Parámetro tipo array de cualquier tipo
    */
    constructor(protected items: T[]) {}

    /**
     * AddItem 
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
    removeItem(index: number): void {
        this.items.splice(index, 1);
    }

    /**
     * Print
     * @returns devuelve un string con el array formateado
     */
    print():string 
    {
        return this.items.join(',');        
    }
}

export class NumericPrintableCollection<T> extends PrintableCollection<T>
{
    /**
     * Constructor de la clase heredada
     * @param items Arrays de cualquier tipo de la clase heredada
     */
    constructor(items: T[]) 
    {
        super(items);
    }

    /**
     * Print
     * @returns devuelve un string con el array formateado
     */
    print():string 
    {
        return this.items.join(',');        
    }

}