/**
 * Interfaz Streamable
 * @interface Streamable interfaz generica de Streamable
 */

export interface Streamable<T>
{
    addItem(newItem: T): void;
    getItem(index: number): T;
    removeItem(name: string): void;
    getNumberOfItems(): number;
    searchByName(name: string): T[];
    searchByYear(year: number): T[];
    searchByCategory(category: string): T[];
    print(): string;
}