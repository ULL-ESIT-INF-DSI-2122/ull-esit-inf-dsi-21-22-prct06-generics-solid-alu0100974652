/**
 * Interfaz Streamable
 * @interface Streamable interfaz generica de Streamable
 */

export interface Streamable<T>
{
    addItem(newItem: T): void;
    getItem(index: number): T;
    removeItem(index: number): void;
    getNumberOfItems(): number;
    searchByName(name: string): T[];
    searchByYear(year: number): T[];
    searchByCategory(category: string): T[];
}

/**
 * Interfaz Genérica para print
 * @interface PrintableStreamable interfaz generica de PrintableStreamable
 */
export interface PrintableStreamable<T>
{
    print(): string;
}