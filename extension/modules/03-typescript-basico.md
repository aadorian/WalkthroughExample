# TypeScript básico

Hasta ahora escribimos seudocódigo. En este capítulo lo traducimos a un lenguaje real: **TypeScript**. (El curso original usa Java; acá todo el material está adaptado a TypeScript.)

## Por qué TypeScript

TypeScript es JavaScript con **tipos estáticos**: el compilador verifica que uses cada valor de acuerdo a su tipo *antes* de ejecutar. Corre en cualquier lado donde corra JavaScript (Node.js, navegador) y es hoy uno de los lenguajes más usados de la industria.

Instalación mínima para ejecutar ejemplos:

```bash
npm install -g tsx
tsx hola.ts
```

## Primer programa

```ts
// hola.ts
console.log("Hola, mundo");
```

A diferencia de Java, no hace falta una clase ni un `main`: el archivo se ejecuta de arriba hacia abajo. `console.log` imprime en la consola.

## Representación de datos y tipos

Los tipos primitivos que vas a usar todo el tiempo:

| Tipo | Guarda | Ejemplo |
|------|--------|---------|
| `number` | números (enteros y decimales por igual) | `42`, `3.14` |
| `string` | texto | `"hola"` |
| `boolean` | verdadero/falso | `true` |

```ts
let cantidad: number = 5;
let nombre: string = "Ana";
let activo: boolean = true;

// Inferencia: si asignás al declarar, el tipo se deduce solo
let precio = 99.9; // number
```

Usá `const` cuando el valor no va a cambiar y `let` cuando sí. Evitá `var` (es sintaxis vieja con reglas de alcance confusas).

### Casting y conversiones entre tipos

TypeScript **no** convierte tipos por vos en las asignaciones: un `string` no entra en un `number`. Las conversiones se hacen explícitas:

```ts
// string → number
const texto = "42";
const n = Number(texto);        // 42
const m = parseInt("42.9", 10); // 42 (trunca)
const x = parseFloat("42.9");   // 42.9

// number → string
const s = String(42);   // "42"
const t = (42).toFixed(2); // "42.00"

// Cuidado: conversión fallida
Number("hola"); // NaN (Not a Number)
```

> **Tip:** después de convertir texto ingresado por el usuario, verificá con `Number.isNaN(n)` antes de operar.

El "casting" de TypeScript (`valor as Tipo`) **no convierte** el valor: solo le dice al compilador "tratá esto como tal tipo". Lo vas a ver recién cuando trabajemos con herencia.

### Errores

Tres familias de errores, de la más barata a la más cara de encontrar:

1. **De compilación (sintaxis/tipos)**: el compilador los marca antes de ejecutar. `let n: number = "hola"` → error.
2. **De ejecución (runtime)**: el programa corre pero explota en un caso concreto (dividir por algo inesperado, acceder a algo que no existe).
3. **De lógica**: el programa corre y termina, pero el resultado es incorrecto. Solo los encuentran las pruebas y la corrida a mano.

## Bibliotecas estándar

TypeScript/JavaScript trae objetos globales listos para usar, sin importar nada:

- `console` — salida por consola.
- `Math` — funciones matemáticas (`Math.sqrt`, `Math.random`, `Math.trunc`).
- Métodos de `string` y de arrays (los vemos en detalle más adelante).

Para funcionalidades extra se instalan paquetes con `npm`.

## Lectura de datos desde el teclado

En Node.js la lectura de teclado es asincrónica. Para los ejercicios usamos una función auxiliar simple:

```ts
// io.ts — utilidades de entrada para los ejercicios
import * as readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const rl = readline.createInterface({ input: stdin, output: stdout });

export async function leerTexto(mensaje: string): Promise<string> {
  return rl.question(mensaje);
}

export async function leerNumero(mensaje: string): Promise<number> {
  const texto = await rl.question(mensaje);
  return Number(texto);
}

export function cerrar(): void {
  rl.close();
}
```

Uso:

```ts
import { leerNumero, cerrar } from "./io.js";

const edad = await leerNumero("Edad: ");
console.log(`El año que viene tendrás ${edad + 1}`);
cerrar();
```

> **Tip:** las comillas invertidas (`` ` ``) crean *template strings*: permiten interpolar expresiones con `${...}` en lugar de concatenar con `+`.

## Estructuras de control en TypeScript

### Decisión: `if` / `else`

```ts
if (temperatura > 30) {
  console.log("Hace calor");
} else if (temperatura > 15) {
  console.log("Está agradable");
} else {
  console.log("Hace frío");
}
```

### Iteración: `while` (mientras)

Evalúa la condición **antes** de cada vuelta; puede ejecutarse cero veces:

```ts
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```

### Iteración: `do...while` (repetir)

Evalúa la condición **después**; se ejecuta al menos una vez. Útil para validar entrada:

```ts
let nota: number;
do {
  nota = await leerNumero("Nota (0 a 100): ");
} while (nota < 0 || nota > 100);
```

### Iteración: `for`

Azúcar sintáctico para el patrón inicializar/condición/avance:

```ts
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

## Operadores

**Aritméticos**: `+ - * / %`, más los atajos `+=`, `-=`, `++`, `--`.

**De comparación**: `=== !== < > <= >=` (siempre estrictos).

**Lógicos**: `&& || !`. Se evalúan en **cortocircuito**: en `a && b`, si `a` es `false`, `b` ni se evalúa.

```ts
// El cortocircuito evita errores:
if (lista.length > 0 && lista[0] > 10) { ... }
```

## Codificación del máximo

El algoritmo del capítulo anterior, ahora en TypeScript completo. Lee números hasta que se ingrese `-1` y muestra el mayor:

```ts
import { leerNumero, cerrar } from "./io.js";

let numero = await leerNumero("Número (-1 para terminar): ");
let maximo = numero;
let hayDatos = numero !== -1;

while (numero !== -1) {
  if (numero > maximo) {
    maximo = numero;
  }
  numero = await leerNumero("Número (-1 para terminar): ");
}

if (hayDatos) {
  console.log(`El máximo fue ${maximo}`);
} else {
  console.log("No se ingresaron datos");
}
cerrar();
```

Fijate cómo aparecen juntos: la **bandera** booleana (`hayDatos`), el **centinela** (`-1` como marca de fin) y la actualización condicional del máximo.

## Ejercicio de detección de errores

Encontrá los tres errores de este fragmento (uno de compilación, uno de ejecución, uno de lógica):

```ts
let suma: number = "0";          // (1) ¿?
const notas = [80, 95, 70];
for (let i = 0; i <= notas.length; i++) {  // (2) ¿?
  suma = suma + notas[i];
}
console.log("Promedio:", suma / 2);        // (3) ¿?
```

<details>
<summary>Solución</summary>

1. **Compilación**: `"0"` es un `string`, no un `number`.
2. **Ejecución**: `i <= notas.length` se pasa una posición; `notas[3]` es `undefined` y la suma da `NaN`. Debe ser `i < notas.length`.
3. **Lógica**: el promedio se divide entre `2`, pero hay 3 notas; corresponde `notas.length`.

</details>

## Práctico

1. Traducí a TypeScript tus soluciones de seudocódigo del capítulo anterior.
2. Programa que lea números hasta ingresar 0 y muestre la suma, el promedio y cuántos fueron mayores a 100.
3. Programa que pida una contraseña hasta 3 intentos usando `do...while` y una bandera booleana.

---

**Siguiente:** [Clases y objetos →](./04-clases-y-objetos.md)
