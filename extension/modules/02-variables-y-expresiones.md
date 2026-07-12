# Variables y expresiones

En este capítulo pasamos de describir pasos a manejar **datos**: guardarlos, transformarlos y tomar decisiones con ellos.

## Variable

Una **variable** es un nombre asociado a un lugar de memoria donde se guarda un valor que puede cambiar durante la ejecución.

Tres ideas clave:

- Tiene un **nombre** (identificador): `edad`, `total`, `hayStock`.
- Tiene un **tipo**: qué clase de valores puede guardar (número, texto, booleano).
- Tiene un **valor** en cada instante, que se reemplaza al asignar uno nuevo.

En seudocódigo la asignación se suele escribir con `←`; en TypeScript se usa `=`:

```ts
let edad: number = 20;
edad = 21; // el valor anterior se pierde
```

> **Tip:** leé `x = x + 1` como "el nuevo valor de x es el valor viejo más 1", no como una ecuación matemática.

## Corrida a mano

Una **corrida a mano** (o prueba de escritorio) consiste en ejecutar el algoritmo en papel, anotando el valor de cada variable paso a paso. Es la herramienta más barata para encontrar errores de lógica.

Ejemplo:

```ts
let a = 3;
let b = 5;
a = a + b;
b = a - b;
```

| Paso | `a` | `b` |
|------|-----|-----|
| inicio | 3 | 5 |
| `a = a + b` | 8 | 5 |
| `b = a - b` | 8 | 3 |

## Ejercicios básicos con variables

### Producto sin multiplicar

Calcular `a * b` usando solo sumas:

```text
// seudocódigo
resultado ← 0
contador ← 0
mientras contador < b
    resultado ← resultado + a
    contador ← contador + 1
fin mientras
mostrar resultado
```

### Detectar valores repetidos

Leer dos valores y avisar si son iguales:

```text
// seudocódigo
pedir x
pedir y
si x = y entonces mostrar "repetidos"
si no mostrar "distintos"
```

### Intercambio de variables

Para intercambiar `a` y `b` se necesita una variable **auxiliar**; si no, se pisa un valor:

```ts
let a = 1;
let b = 2;

const aux = a;
a = b;
b = aux;
// a = 2, b = 1
```

### Promedio

```text
// seudocódigo
suma ← 0
cantidad ← 0
mientras haya más notas
    pedir nota
    suma ← suma + nota
    cantidad ← cantidad + 1
fin mientras
mostrar suma / cantidad
```

> **Tip:** este ejercicio esconde dos patrones que vas a usar mil veces: el **acumulador** (`suma`) y el **contador** (`cantidad`).

## Concepto de loop

Un **loop** (bucle) es la repetición controlada de un bloque. Todo loop bien construido tiene:

1. **Inicialización**: preparar las variables antes de entrar.
2. **Condición**: decide si se sigue iterando.
3. **Avance**: algo dentro del loop debe acercar la condición a ser falsa — si no, el loop es **infinito**.

## Programa

Un **programa** es un algoritmo expresado en un lenguaje de programación, listo para que la máquina lo ejecute. La diferencia con el seudocódigo es la precisión sintáctica: el compilador no tolera ambigüedades.

## Expresiones aritméticas

Una **expresión aritmética** combina valores numéricos con operadores y produce un número.

| Operador | Significado | Ejemplo | Resultado |
|----------|-------------|---------|-----------|
| `+` | suma | `7 + 2` | `9` |
| `-` | resta | `7 - 2` | `5` |
| `*` | producto | `7 * 2` | `14` |
| `/` | división | `7 / 2` | `3.5` |
| `%` | resto | `7 % 2` | `1` |

En TypeScript la división entre enteros **no trunca** (a diferencia de Java): `7 / 2` es `3.5`. Para división entera usá `Math.trunc(7 / 2)`.

El `%` (módulo) es más útil de lo que parece:

```ts
const esPar = n % 2 === 0;
const ultimoDigito = n % 10;
```

## Expresiones lógicas

Una **expresión lógica** produce un valor **booleano**: `true` o `false`.

### Variable booleana

```ts
let hayStock: boolean = true;
let terminado = false; // el tipo se infiere
```

### Operadores relacionales

Comparan dos valores y devuelven un booleano:

| Operador | Significado |
|----------|-------------|
| `===` | igual |
| `!==` | distinto |
| `<` `>` | menor / mayor |
| `<=` `>=` | menor o igual / mayor o igual |

> **Tip:** en TypeScript usá siempre `===` y `!==` (comparación estricta). Las versiones `==` y `!=` hacen conversiones implícitas que producen sorpresas.

### Operadores lógicos

Combinan booleanos:

| Operador | Nombre | Es `true` cuando... |
|----------|--------|----------------------|
| `&&` | AND | ambos operandos son `true` |
| `\|\|` | OR | al menos uno es `true` |
| `!` | NOT | el operando es `false` |

```ts
const puedeVotar = edad >= 18 && esCiudadano;
const hayDescuento = esSocio || compra > 1000;
```

### Constantes lógicas

Los literales `true` y `false`.

### Precedencia

De mayor a menor: `!`, luego aritméticos, luego relacionales, luego `&&`, luego `||`. Ante la duda, **usá paréntesis**: hacen el código legible aunque no sean necesarios.

```ts
// Equivalentes, pero el segundo se entiende de un vistazo:
const ok = edad >= 18 && edad <= 65 || esVip;
const ok2 = (edad >= 18 && edad <= 65) || esVip;
```

### Uso de variables booleanas

Un booleano puede guardar el resultado de una condición para usarlo después — muy común como **bandera** (*flag*) que controla un loop:

```ts
let encontrado = false;
let i = 0;
while (!encontrado && i < datos.length) {
  if (datos[i] === buscado) {
    encontrado = true;
  }
  i++;
}
```

## Máximo

Problema clásico: leer números y quedarse con el mayor. La idea: una variable `maximo` que se actualiza solo cuando aparece algo más grande.

```text
// seudocódigo
pedir primer número
maximo ← primer número
mientras haya más números
    pedir número
    si número > maximo entonces
        maximo ← número
    fin si
fin mientras
mostrar maximo
```

> **Tip:** inicializar `maximo` con el **primer dato real** (y no con 0) evita errores cuando todos los números son negativos.

## Práctico

1. Leer números hasta que ingrese un 0 y mostrar cuántos eran pares.
2. Leer 10 números y mostrar el mínimo y en qué posición apareció.
3. Hacer la corrida a mano de tu solución del ejercicio 1 con la entrada `3, 8, 5, 0`.
4. Escribir una expresión lógica que sea `true` si un año es bisiesto (divisible entre 4, salvo los divisibles entre 100 que no lo sean entre 400).

---

**Siguiente:** [TypeScript básico →](./03-typescript-basico.md)
