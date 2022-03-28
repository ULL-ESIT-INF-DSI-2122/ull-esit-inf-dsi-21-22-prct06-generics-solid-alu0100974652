/**
 * Clase PrimeNumber
 * @class PrimeNumber
 */

export class PrimeNumber 
{

    private items: number[];
    private static primeNumber: PrimeNumber; 

    /**
     * Constructor de la clase
     */
    constructor() {
        this.items = [];
    };

    /**
     * 
     * @returns 
     */
    public static getPrimeNumber(): PrimeNumber {

        if (!PrimeNumber.primeNumber) {
            PrimeNumber.primeNumber = new PrimeNumber();
        }
        return PrimeNumber.primeNumber;
    }
   
    /**
     * esPrimo
     * @param numero parametro tipo number
     * @returns devuelve si es true si el número es primo
     */
    esPrimo(numero: number) {
        if (numero == 0 || numero == 1 || numero == 4) return false;
        for (let x:number = 2; x < numero / 2; x++) {
          if (numero % x == 0) return false;
        }
        return true;
    }

    /**
     * setNNumbers
     * @param n cambia el valor de items[] a un array que contiene los n primeros primos
     */
    setNNumbers(n: number)
    {
        for(let i: number = 0; i <= n; i++)
        {
            if(this.esPrimo(i))
            {
                PrimeNumber.primeNumber.items.push(i);
            }
        }
    }

    /**
     * setNMNUmbers
     * @param n n numero inicial 
     * @param m m numero final
     */
    setNMNumbers(n: number, m: number)
    {
        for(n; n <= m; n++)
        {
            if(this.esPrimo(n))
            {
                PrimeNumber.primeNumber.items.push(n);
            }
        }
    }

    /**
     * Resea el valor de items
     */
    resetItems()
    {
        PrimeNumber.primeNumber.items = [];
    }


    /**
     * getItems
     * @returns devuelve los items
     */
    getItems()
    {
        return PrimeNumber.primeNumber.items;
    }
}