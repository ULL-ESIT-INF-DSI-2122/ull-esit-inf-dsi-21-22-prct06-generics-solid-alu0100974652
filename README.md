# Práctica 6 - Clases e interfaces genéricas. Principios SOLID
## _Desarrollo de Sistemas Informáticos_

En esta práctica tendremos que resolver una serie de ejercicios de programación que nos permitirán conocer más en profundidad las clases e interfaces genéricas del lenguaje TypeScript. Además, también deberán utilizar los principios SOLID de diseño orientado a objetos.

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct06-generics-solid-alu0100974652/badge.svg)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct06-generics-solid-alu0100974652)


## Ejercicio 2 - DSIflix
Imagine que tiene que diseñar el modelo de datos de una plataforma de vídeo en streaming. A través del catálogo de dicha plataforma se puede acceder a películas, series y documentales.

Para este ejercicio se plantea lo siguiente:
1. Una inferfaz genérica Streamable tipo T dato que contendrá:
    - addItem: añade un nuevo tipo T dato.
    - getItem: obtiene el dato a través del índice.
    - removeItem: elimina un item a través de un string.
    - getNumberOfItems: devuelve el número de datos que contiene.
    - searchByName: busca por nombre.
    - searchByYear: busca por año.
    - searchByCategory: busca por categoría.
    - print: imprime.  

Así nos quedará la siguiente interfaz definida:
```typescript
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
```
2. Una clase abstracta llamada ``BasicStreamableCollection`` heredando e implementando todas las propiedas y métodos de la interfaz ``Streamable<T>``.
```typescript
import { Streamable } from "./streamable";

export abstract class BasicStreamableCollection<T extends {name: string, year: number, category: string}> implements Streamable<T>
```
Así definimos el siguiente constructor de la clase. Este será un array de tipo T dato que contendrá las especificaciones necesarias para poder definir en distintas clases una serie, película o documental.
```typescript
constructor(protected items: T[]) 
{
    this.items = items;
};
```
Ahora implementaremos los métodos definidos previamente en la interfaz genérica:
```typescript
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
        let stringFormateado = ''
        for(let item of this.items)
        {
            stringFormateado = stringFormateado + item.name + ', ';
        }

        return stringFormateado;
    }
```
3. Una vez creado el "esqueleto" de las clases series, películas y documentales. Es hora de crear las mismas:
    - Empezando por Documentales, tendremos que esta clase necesitará un constructor previo, esto es debido a que debemos definir los atributos de un Documental antes de formar un conjunto de Documentales.

    ```typescript
    export class Documental
    {
        /**
         * Constructor
         * @param name nombre del documental
         * @param category categoria del documental
         * @param time tiempo del documental en minutos
         * @param year año del documental
         */
        constructor(public name: string, public category: string,   public time: number, public year: number) {}
    }
    ```

    Ahora podemos definir el conjunto de Documentales que formarán la clase, esto se consigue heredando los métodos definidos en el apartado 2 y pasandole el tipo T dato como Documental.
    ```typescript
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
    ```
    Las pruebas que verifican la siguiente clase son: 
    ```typescript
        const nuestroPlaneta = new Documental('Nuestro Planeta', 'De ciencia y Naturaleza', 50, 2019);
    const senioresDeLaDroga = new Documental('Señores de la Droga', 'Sobre crimenes reales', 40, 2018);
    const misDocumentals = new Documentals([nuestroPlaneta, senioresDeLaDroga]);
    const tierraNoche = new Documental("La tierra de noche", "De ciencia y Naturaleza", 50, 2020);

    it('Se pueden utilizar el método addItem de la clase BasicStreamableCollection', () => {
        
        misDocumentals.addItem(tierraNoche);
        expect(misDocumentals.searchByName("La tierra de noche")).to.deep.eq([tierraNoche]);
    });

    it('Se pueden utilizar el método getItem de la clase BasicStreamableCollection', () => {
        expect(misDocumentals.getItem(1)).to.deep.eq(senioresDeLaDroga);
    });

    it('Se pueden utilizar el método getNumberOfItems de la clase BasicStreamableCollection', () => {
        expect(misDocumentals.getNumberOfItems()).to.deep.eq(3);
    });

    it('Se pueden utilizar el método removeItem de la clase BasicStreamableCollection', () => {
        misDocumentals.removeItem("Señores de la Droga");
        expect(misDocumentals.searchByName("Señores de la Droga")).to.deep.eq([]);
    });

    it('Se pueden utilizar los métodos de búsqueda (nombre, categoria, año) de la clase BasicStreamableCollection', () => {
        expect(misDocumentals.searchByName("Nuestro Planeta")).to.deep.eq([nuestroPlaneta]);
        expect(misDocumentals.searchByYear(2020)).to.deep.eq([tierraNoche]);
        expect(misDocumentals.searchByCategory("De ciencia y Naturaleza")).to.deep.eq([nuestroPlaneta, tierraNoche]);
    });

    it('Se pueden utilizar el método print de la clase BasicStreamableCollection', () => {
        expect(misDocumentals.print()).to.deep.eq('Nuestro Planeta, La tierra de noche, ');
    });
    ```
    - La clase peliculas será similar a la de documentales:
    ```typescript
    export class Pelicula
    {
        /**
         * Constructor
         * @param name nombre de la pelicula
         * @param category categoria de la pelicula
         * @param time tiempo de la pelicula en minutos
         * @param year año de estreno
         */
        constructor(public name: string, public category: string, public time: number, public year: number) {}
    }

    /**
     * Clase extendida de BasicStreamableCollection<Pelicula>
     * @class Peliculas
     */
    export class Peliculas extends BasicStreamableCollection<Pelicula>
    {
        /**
         * Constructor
         * @param listaPeliculas Lista con las Peliculas
         */    
        constructor(protected listaPeliculas: Pelicula[]) 
        {
            super(listaPeliculas);
        }   
    }
    ```
    Con sus pruebas: 
    ```typescript
    describe('Pruebas para la Colección de películas heredada de BasicStreamableCollection', () => {

        const batman = new Pelicula('Batman', 'Accion', 210, 2022);
        const elProyectoAdam = new Pelicula('El proyecto Adam', 'Ciencia ficcion', 106, 2022);
        const misPeliculas = new Peliculas([batman, elProyectoAdam]);

        it('Se pueden utilizar el método addItem de la clase BasicStreamableCollection', () => {
            const premonicion = new Pelicula("Premonicion", "Suspense", 101, 2015);
            misPeliculas.addItem(premonicion);
            expect(misPeliculas.searchByName("Premonicion")).to.deep.eq([premonicion]);
        });

        it('Se pueden utilizar el método getItem de la clase BasicStreamableCollection', () => {
            expect(misPeliculas.getItem(1)).to.deep.eq(elProyectoAdam);
        });

        it('Se pueden utilizar el método getNumberOfItems de la clase BasicStreamableCollection', () => {
            expect(misPeliculas.getNumberOfItems()).to.deep.eq(3);
        });

        it('Se pueden utilizar el método removeItem de la clase BasicStreamableCollection', () => {
            misPeliculas.removeItem("Premonicion");
            expect(misPeliculas.searchByName("Premonicion")).to.deep.eq([]);
        });

        it('Se pueden utilizar los métodos de búsqueda (nombre, categoria, año) de la clase BasicStreamableCollection', () => {
            expect(misPeliculas.searchByName("Premonicion")).to.deep.eq([]);
            expect(misPeliculas.searchByYear(2022)).to.deep.eq([batman, elProyectoAdam]);
            expect(misPeliculas.searchByCategory("Accion")).to.deep.eq([batman]);
        });

        it('Se pueden utilizar el método print de la clase BasicStreamableCollection', () => {
            expect(misPeliculas.print()).to.deep.eq('Batman, El proyecto Adam, ');

        });
    });
    ```
    - Para la clase series se ha añadido un atributo más que es el de temporada y este indica el número de temporadas de la serie:
    ```typescript
    /**
     * Clase principal Serie
     * @class Serie
     */
    export class Serie
    {
        /**
         * Constructor
         * @param name nombre de la serie
         * @param category categoria de la serie
         * @param temporadas temporadas de la serie
         * @param time tiempo por capitulo (media) en minutos
         * @param year año de la ultima temporada
         */
        constructor(public name: string, public category: string, public temporadas: number, public time: number, public year: number) {}
    }

    /**
     * Clase extendida de BasicStreamableCollection<Serie>
     * @class Series
     */
    export class Series extends BasicStreamableCollection<Serie>
    {
        /**
         * Constructor
         * @param listaSeries Lista con las Series
         */    
        constructor(protected listaSeries: Serie[]) 
        {
            super(listaSeries);
        }   
    }
    ```
    Junto con sus pruebas: 
    ```typescript
    describe('Pruebas para la Colección de series heredada de BasicStreamableCollection', () => {

        const suits = new Serie('Suits', 'Comedia', 9, 42, 2019);
        const lucifer = new Serie('Lucifer', 'Basada en comics', 6, 50, 2021);
        const misSeries = new Series([suits, lucifer]);

        it('Se pueden utilizar el método addItem de la clase BasicStreamableCollection', () => {
            const theGoodDoctor = new Serie("The Good Doctor", "Sobre médicos", 4, 42, 2020);
            misSeries.addItem(theGoodDoctor);
            expect(misSeries.searchByName("The Good Doctor")).to.deep.eq([theGoodDoctor]);
        });

        it('Se pueden utilizar el método getItem de la clase BasicStreamableCollection', () => {
            expect(misSeries.getItem(1)).to.deep.eq(lucifer);
        });

        it('Se pueden utilizar el método getNumberOfItems de la clase BasicStreamableCollection', () => {
            expect(misSeries.getNumberOfItems()).to.deep.eq(3);
        });

        it('Se pueden utilizar el método removeItem de la clase BasicStreamableCollection', () => {
            misSeries.removeItem("The Good Doctor");
            expect(misSeries.searchByName("The Good Doctor")).to.deep.eq([]);
        });

        it('Se pueden utilizar los métodos de búsqueda (nombre, categoria, año) de la clase BasicStreamableCollection', () => {
            expect(misSeries.searchByName("Lucifer")).to.deep.eq([lucifer]);
            expect(misSeries.searchByYear(2020)).to.deep.eq([]);
            expect(misSeries.searchByCategory("Comedia")).to.deep.eq([suits]);
        });

        it('Se pueden utilizar el método print de la clase BasicStreamableCollection', () => {
            expect(misSeries.print()).to.deep.eq('Suits, Lucifer, ');
        });
    });
    ```

## Ejercicio 3 - El cifrado indescifrable

Cree una clase ``Cifrado`` que implemente las operaciones de codificación y decodificación ante un alfabeto y palabra clave arbitrarios, esto es, definidos por el usuario y que, además, pueden ser variables. Trate de aplicar los principios SOLID en su diseño.

Para este ejercicio se plantea lo siguiente:
1. Se dividirá en dos clases:
    - Clase Alfabeto: que contendrá como constructor un string, para definir las variables clave, mensaje y alfabeto, disponiendo de sus respectivos getters y setters. 
    - Clase Cifrado: dispondrá de los métodos codificar y decodificar mensaje, siguiente el algoritmo del [Cifrado Cesar](https://es.wikipedia.org/wiki/Cifrado_C%C3%A9sar).
2. El usuario podrá modificar tanto el mensaje como la clave a través de los setters implementados.
3. Tanto el mensaje como la clave estarán en mayúsculas.
4. El mensaje no tendrá ningún espacio como se nos proporciona en el guión de la práctica ***"HOLAESTOESUNAPRUEBA"***.

### Clase Alfabeto
Como comentamos en el apartado anterior esta clase será la responsable de crear y modificar los valores de las variables necesarias para la clase Cifrado. De esta manera se define el siguiente constructor:
```typescript
constructor(private alph: string)
{
    this.alph = alph;
}
```
Definimos también tanto los getters y setters necesarios para la clase:
```typescript
getAlfabeto()
{
    return this.alph;
}

setAlfabeto(nuevoAlfabeto: string)
{
    this.alph = nuevoAlfabeto;
}

getTamanio()
{
    return this.alph.length;
}
```
Con esto podremos obtener tanto el contenido como el tamaño de la variable tipo string y modificarlo al gusto del usuario.

Y las pruebas realizadas son:
```typescript
describe('Pruebas para la clase Alfabeto', () => {

    const defAlfabeto = new Alfabeto('ABCDEFGHIJKLMNÑOPQRSTUVWXYZ');
    it('Se define un alfabeto correctamente', () => {
        expect(defAlfabeto.getAlfabeto()).to.eq('ABCDEFGHIJKLMNÑOPQRSTUVWXYZ')
    });

    it('Se puede cambiar el alfabeto', () => {
        defAlfabeto.setAlfabeto('aabbcc');
        expect(defAlfabeto.getAlfabeto()).to.eq('aabbcc');
    });

});
```

### Clase Cifrado
En esta clase se definirán los tres tipos de variables, clave, mensaje y alfabeto a partir de la clase anterior, y se añadirán los métodos de codificar, decodificar, repetirClave y los getters.

De esta manera tendremos el siguiente constructor con sus getters:
```typescript
constructor(private alfabet: Alfabeto, private clave: Alfabeto, private mensaje: Alfabeto)
{
    this.alfabet = alfabet;
    this.clave = clave;
    this.mensaje = mensaje;
}

getAlfabet()
{
    return this.alfabet;
}

getClave()
{
    return this.clave;
}

getMensaje()
{
    return this.mensaje;
}
```
Así prodremos acceder a los métodos de la clase `Alfabeto` como verifican los tests: 
```typescript
const clave = new Alfabeto('');
const mensaje = new Alfabeto('');
const alfabeto = new Alfabeto('');
const defCifrado = new Cifrado(alfabeto, clave, mensaje);

it('Se puede cambiar el Alfabeto del cifrado', () => {
    defCifrado.getAlfabet().setAlfabeto('ABCDEFGHIJKLMNÑOPQRSTUVWXYZ');
    expect(defCifrado.getAlfabet().getAlfabeto()).to.eq('ABCDEFGHIJKLMNÑOPQRSTUVWXYZ');
});

it('Se puede cambiar la Clave del cifrado', () => {
    defCifrado.getClave().setAlfabeto('CLAVE');
    expect(defCifrado.getClave().getAlfabeto()).to.eq('CLAVE');
});

it('Se puede cambiar el Mensaje del cifrado', () => {
    defCifrado.getMensaje().setAlfabeto('HOLAESTOESUNAPRUEBA');
    expect(defCifrado.getMensaje().getAlfabeto()).to.eq('HOLAESTOESUNAPRUEBA');
});
```
Para la resolución del ejercicio aplicaremos el siguiente algoritmo:
1. Tanto el mensaje (codificado o sin codificar) como la clave deberán de tener la misma longitud, es decir, la clave se repetirá tantas veces hasta que iguale el tamaño del mensaje.
```typescript
"HOLAESTOESUNAPRUEBA"
"CLAVECLAVECLAVECLAV"
```
Para ello crearemos un método claveRepetida que reciba como parámetros tanto la clave como el mensaje a codificar o decodificar.
```typescript
claveRepetida(claveARepetir: string = this.clave.getAlfabeto(), mensaje: string = this.mensaje.getAlfabeto()): string
{
    let iterator: number = 0;
    let claveRepetidaString: string = '';
    while(mensaje.length != claveRepetidaString.length)
    {
        claveRepetidaString = claveRepetidaString + claveARepetir[iterator];
        iterator++;

        if(iterator == claveARepetir.length)
            iterator = 0;
    }

    return claveRepetidaString;
}
```
Verificandolo con su test: 
```typescript
it('Método que repite la palabra Clave hasta igualar el tamaño de del mensaje original: Clave - "CLAVE" Mensaje - "HOLAESTOESUNAPRUEBA" = "CLAVECLAVECLAVECLAV"', () => {
    expect(defCifrado.claveRepetida()).to.eq('CLAVECLAVECLAVECLAV');
});
```
2. Para el cifrado con clave, utilizaremos la siguiente fórmula: $$C_i = {(M_i + b)}\:{(mod\:n)}$$  
Donde Ci será el resultado ir cifrando letra por letra el mensaje con la posición de la letra clave correspondiente y aplicando el modulo de tamaño n (que será del tamaño del alfabeto definido). 
De esta manera tendremos el siguiente bloque de código:
```typescript
codificarMensaje()
{
    let claveRepe: string = this.claveRepetida();
    let mensajeSinCodificar: string = this.mensaje.getAlfabeto();
    let mensajeCodificado: string = '';
    let posicionLetra: number = 0;

    for(let i: number = 0; i < mensajeSinCodificar.length; i++)
    {
        let indexMensajeSinCodificar: number = this.alfabet.getAlfabeto().indexOf(mensajeSinCodificar[i]);
        let indexClaveRepetida: number = this.alfabet.getAlfabeto().indexOf(claveRepe[i]);
        posicionLetra = (indexMensajeSinCodificar + indexClaveRepetida + 1) % this.alfabet.getTamanio();

        mensajeCodificado = mensajeCodificado + this.alfabet.getAlfabeto().charAt(posicionLetra);
    }
    return mensajeCodificado;
}
```
Definimos las varibles:
- claveRepe: contendrá la clave repetida para igualar el tamaño del mensaje.
- mensajeSinCodificar: contendrá el mensaje con el que se construyó el objeto.
- mensajeCodificado: string que contendrá el mensaje codificado.
- posiciónLetra: realiza la fórmula de arriba que contendrá la posición de la letra dentro del alfabeto.
- indexMensajeSinCodificar: a través del uso del método indexOf iremos extrayendo los índices correspondientes a las letras del mensaje en base al alfabeto.
- indexClaveRepetida: a través del uso del método indexOf iremos extrayendo los índices correspondientes a las letras de la clave repetida en base al alfabeto.
- El mensajeCodificado irá introduciendo las letras determinadas por la posición con el método charAt().

Así el test utilizado será (basado en el ejemplo utilizado para los tests anteriores):
```typescript
it('Método que repite la palabra Clave hasta igualar el tamaño de del mensaje original: Clave - "CLAVE" Mensaje - "HOLAESTOESUNAPRUEBA" = "CLAVECLAVECLAVECLAV"', () => {
    expect(defCifrado.claveRepetida()).to.eq('CLAVECLAVECLAVECLAV');
});

it('Se codifica el mensaje "HOLAESTOESUNAPRUEBA" con la clave "CLAVE"', () => {
    expect(defCifrado.codificarMensaje()).to.eq('KAMWJVFPAXXYBMWXPCW');
});
```
3. Para el decodificado con clave utilizaremos la siguiente fórmula: $$M_i = {(C_i + n - b)}\:{(mod\:n)}$$  
Donde Mi será el resultado de ir letra a letra sumandole el tamaño del alfabeto y restandole la posición de la letra cifrada, y aplicando el modulo de tamaño n (que será del tamaño del alfabeto definido). Se trata de una implementación similar al de codificar, de tal manera que quedaría el siguiente método:
```typescript
descifrarMensaje()
{
    let claveRepe: string = this.claveRepetida();
    let mensajeCodificado: string = this.mensaje.getAlfabeto();
    let mensajeDecodificado: string = '';
    let modulo: number = 0;

    for(let i: number = 0; i < mensajeCodificado.length; i++)
    {
        let indexMensajeCodificado: number = this.alfabet.getAlfabeto().indexOf(mensajeCodificado[i]);
        let indexClaveRepetida: number = this.alfabet.getAlfabeto().indexOf(claveRepe[i]);
        modulo = (indexMensajeCodificado + this.alfabet.getTamanio() - indexClaveRepetida - 1) % this.alfabet.getTamanio();

        mensajeDecodificado = mensajeDecodificado + this.alfabet.getAlfabeto().charAt(modulo);
    }
    return mensajeDecodificado;
}
```
Y el test que lo verifica: 
```typescript
it('Se decodifica el mensaje "KAMWJVFPAXXYBMWXPCW" con la clave "CLAVE"', () => {
    defCifrado.getMensaje().setAlfabeto('KAMWJVFPAXXYBMWXPCW');
    expect(defCifrado.descifrarMensaje()).to.eq('HOLAESTOESUNAPRUEBA');
});
```