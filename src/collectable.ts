/**
 * Interfaz generica
 */
interface CollectableInterface<T>
{
    addItem(newItem: T): void;
    getItem(index: number): T;
    //removeItem(): T;
    //getNumberOfItems(): number;
}

export class Collectable<T> implements CollectableInterface<T> 
{
    constructor(private items: T[]) {}

    addItem(newItem: T): void {
        this.items.push(newItem);
    }

    getItem(index: number): T {
        return this.items[index];
    }

}