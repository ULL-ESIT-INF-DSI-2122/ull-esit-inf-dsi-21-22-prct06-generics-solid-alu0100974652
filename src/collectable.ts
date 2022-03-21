/**
 * Interfaz generica
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