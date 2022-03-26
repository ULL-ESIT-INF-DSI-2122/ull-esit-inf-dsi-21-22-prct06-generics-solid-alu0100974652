# Práctica 6 - Clases e interfaces genéricas. Principios SOLID
## _Desarrollo de Sistemas Informáticos_

En esta práctica tendremos que resolver una serie de ejercicios de programación que nos permitirán conocer más en profundidad las clases e interfaces genéricas del lenguaje TypeScript. Además, también deberán utilizar los principios SOLID de diseño orientado a objetos.

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct06-generics-solid-alu0100974652/badge.svg)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct06-generics-solid-alu0100974652)

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