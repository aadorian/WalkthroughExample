# Clases y objetos

Acá empieza la **programación orientada a objetos (POO)**: en vez de pensar en pasos sueltos, modelamos el problema como objetos que tienen datos y saben hacer cosas.

## La idea intuitiva

Pensá en una florería: cada ramo tiene un tipo de flor, una cantidad y un precio, y sobre cualquier ramo podés preguntar su costo o agregarle flores. O en una biblioteca: cada libro tiene título, autor y estado (prestado o no), y se le puede pedir prestarse o devolverse.

En ambos casos aparece el mismo patrón:

- Una **clase** es el *molde*: define qué datos y qué operaciones tiene un tipo de cosa (`Libro`).
- Un **objeto** (o instancia) es cada cosa concreta creada con ese molde (`elQuijote`, `rayuela`).

| Concepto | En el ejemplo biblioteca |
|----------|--------------------------|
| Clase | `Libro` |
| Atributos | `titulo`, `autor`, `prestado` |
| Métodos | `prestar()`, `devolver()`, `estaPrestado()` |
| Objetos | cada libro físico del estante |

## Programación orientada a objetos

Principios centrales:

- **Encapsulamiento**: los datos de un objeto son privados; se accede a ellos solo mediante métodos. El objeto protege su propio estado.
- **Abstracción**: la clase expone *qué* hace, no *cómo* lo hace.
- **Reutilización**: una clase bien hecha se usa en muchos programas.

## UML: notación básica

**UML** es la notación estándar para dibujar diseños orientados a objetos. Una clase se dibuja como una caja de tres compartimientos:

```
┌─────────────────────┐
│       Camion        │   ← nombre
├─────────────────────┤
│ - matricula: string │   ← atributos (- = privado)
│ - carga: number     │
├─────────────────────┤
│ + cargar(kg): void  │   ← métodos (+ = público)
│ + getCarga(): number│
└─────────────────────┘
```

Relaciones entre clases:

- **Asociación** (línea simple): una clase conoce a otra. `Persona ── Contrato`.
- **Herencia** (flecha con triángulo): una clase *es un* caso particular de otra. `Camioneta ▷── Vehiculo`. La vemos en el capítulo 6.
- **Agregación / composición** (rombo): una clase *tiene* objetos de otra. `Banco ◇── Cuenta`. La vemos con colecciones.

## Uso de clases estándar

Antes de crear clases propias, usemos dos que ya existen.

### Strings

Un `string` es un objeto con métodos:

```ts
const nombre = "Ana María";

nombre.length            // 9
nombre.toUpperCase()     // "ANA MARÍA"
nombre.toLowerCase()     // "ana maría"
nombre.charAt(0)         // "A"
nombre.includes("María") // true
nombre.indexOf("a")      // 2 (primera 'a' minúscula)
nombre.substring(0, 3)   // "Ana"
nombre.trim()            // sin espacios en los bordes
```

> **Tip:** los strings son **inmutables**: ningún método los modifica, todos devuelven uno nuevo. `nombre.toUpperCase()` no cambia `nombre`.

### Math

```ts
Math.sqrt(16)      // 4
Math.abs(-3)       // 3
Math.trunc(7.9)    // 7
Math.round(7.5)    // 8
Math.max(3, 8, 5)  // 8
Math.random()      // decimal aleatorio en [0, 1)

// Entero aleatorio entre 1 y 6 (un dado):
const dado = Math.trunc(Math.random() * 6) + 1;
```

## Creación de una clase: `Camion`

Vamos a construir una clase completa, pieza por pieza.

### Definición y atributos

```ts
class Camion {
  private matricula: string;
  private carga: number; // en kg
}
```

Los atributos (variables de instancia) son `private`: solo el propio objeto puede tocarlos.

### Métodos de acceso y modificación

Los **getters** devuelven el valor de un atributo; los **setters** lo modifican, idealmente validando:

```ts
class Camion {
  private matricula: string;
  private carga: number;

  public getMatricula(): string {
    return this.matricula;
  }

  public getCarga(): number {
    return this.carga;
  }

  public cargar(kg: number): void {
    if (kg > 0) {
      this.carga += kg;
    }
  }

  public descargar(kg: number): void {
    if (kg > 0 && kg <= this.carga) {
      this.carga -= kg;
    }
  }
}
```

`this` es la referencia al objeto sobre el que se invocó el método: en `camionA.cargar(100)`, dentro de `cargar`, `this` es `camionA`.

### Constructores

El **constructor** inicializa el objeto al crearlo. Sin él, los atributos quedarían sin valor:

```ts
class Camion {
  private matricula: string;
  private carga: number;

  constructor(matricula: string) {
    this.matricula = matricula;
    this.carga = 0; // un camión nace vacío
  }
  // ...métodos
}
```

TypeScript ofrece una forma corta equivalente (*parameter properties*):

```ts
class Camion {
  private carga = 0;

  constructor(private matricula: string) {}
}
```

### Prueba y creación de objetos

Los objetos se crean con `new`, que invoca el constructor:

```ts
const scania = new Camion("ABC 1234");
const volvo = new Camion("XYZ 9876");

scania.cargar(500);
scania.cargar(300);
volvo.cargar(200);

console.log(scania.getCarga()); // 800
console.log(volvo.getCarga());  // 200 — cada objeto tiene SU carga
```

Cada `new` crea un objeto independiente con su propia copia de los atributos.

### Impresión de objetos: `toString`

Si imprimís un objeto directamente vas a ver algo poco útil. Definí `toString` para darle una representación legible:

```ts
class Camion {
  // ...
  public toString(): string {
    return `Camión ${this.matricula} — carga: ${this.carga} kg`;
  }
}

console.log(scania.toString());
// Camión ABC 1234 — carga: 800 kg
console.log(`${scania}`); // los template strings lo llaman solos
```

### Comparación de objetos

`===` entre objetos compara **referencias**: pregunta si son *el mismo* objeto, no si tienen los mismos datos.

```ts
const a = new Camion("ABC 1234");
const b = new Camion("ABC 1234");

a === b; // false — son dos objetos distintos
a === a; // true
```

Para comparar por contenido, definí un método propio:

```ts
class Camion {
  // ...
  public equals(otro: Camion): boolean {
    return this.matricula === otro.getMatricula();
  }
}

a.equals(b); // true — misma matrícula
```

### Variables de clase (`static`)

Un atributo `static` pertenece a la **clase**, no a cada objeto: hay una sola copia compartida. Sirve, por ejemplo, para contar cuántos objetos se crearon:

```ts
class Camion {
  private static cantidadCreados = 0;

  constructor(private matricula: string) {
    Camion.cantidadCreados++;
  }

  public static getCantidadCreados(): number {
    return Camion.cantidadCreados;
  }
}

new Camion("A");
new Camion("B");
Camion.getCantidadCreados(); // 2 — se accede por la CLASE, no por un objeto
```

## Práctico

1. **Clase `Rectangulo`**: atributos `base` y `altura`; métodos `area()`, `perimetro()` y `esCuadrado()`. Probala creando dos objetos.
2. **Clase `Libro`**: `titulo`, `autor`, `prestado` (booleano). Métodos `prestar()` (solo si no está prestado), `devolver()` y `toString()`.
3. **Clase `Contador`**: con un atributo `static`, hacé que cada objeto reciba automáticamente un número de serie incremental.
4. Dibujá el diagrama UML de las tres clases anteriores.

---

**Siguiente:** [Asociación y switch →](./05-asociacion-y-switch.md)
