# Arrays

Un **array** es una secuencia de elementos del mismo tipo, accesibles por posición (índice). En Java el array clásico tiene tamaño fijo; en TypeScript los arrays son dinámicos, pero muchos problemas se piensan igual "a la Java": tamaño conocido de antemano y posiciones con significado.

## Conceptos

- Los índices van de `0` a `length - 1`.
- Acceder fuera de rango en TypeScript **no lanza error**: devuelve `undefined`. Eso hace que los errores de índice sean silenciosos — más peligrosos, no menos.

```ts
// Array con tamaño fijo conceptual: una posición por mes
const lluviaPorMes: number[] = new Array(12).fill(0);

lluviaPorMes[0] = 85;   // enero
lluviaPorMes[11] = 40;  // diciembre

lluviaPorMes.length;    // 12
lluviaPorMes[12];       // undefined — ¡fuera de rango y no avisa!
```

> **Tip:** activá `"noUncheckedIndexedAccess": true` en `tsconfig.json`: el compilador te obliga a considerar que `array[i]` puede ser `undefined`.

## Ejercicios básicos de arrays

Los patrones de siempre, ahora indexados.

**Cargar y recorrer:**

```ts
const notas: number[] = [72, 85, 90, 65, 88];

for (let i = 0; i < notas.length; i++) {
  console.log(`Posición ${i}: ${notas[i]}`);
}

// Si no necesitás el índice:
for (const nota of notas) {
  console.log(nota);
}
```

**Suma y promedio:**

```ts
let suma = 0;
for (const n of notas) {
  suma += n;
}
const promedio = suma / notas.length;
```

**Máximo y su posición:**

```ts
let posMax = 0;
for (let i = 1; i < notas.length; i++) {
  if (notas[i] > notas[posMax]) {
    posMax = i;
  }
}
console.log(`Máximo ${notas[posMax]} en la posición ${posMax}`);
```

**Búsqueda lineal:**

```ts
function posicionDe(valor: number, datos: number[]): number {
  for (let i = 0; i < datos.length; i++) {
    if (datos[i] === valor) {
      return i;
    }
  }
  return -1; // convención: -1 = no encontrado
}
```

## Ejercicios avanzados

**Invertir un array (in place):** intercambiar extremos avanzando hacia el centro.

```ts
function invertir(datos: number[]): void {
  let izq = 0;
  let der = datos.length - 1;
  while (izq < der) {
    const aux = datos[izq];
    datos[izq] = datos[der];
    datos[der] = aux;
    izq++;
    der--;
  }
}
```

**Contar ocurrencias por categoría:** un array como tabla de contadores.

```ts
// ¿Cuántas veces salió cada cara del dado en 100 tiradas?
const conteo = new Array(6).fill(0);
for (let t = 0; t < 100; t++) {
  const cara = Math.trunc(Math.random() * 6) + 1;
  conteo[cara - 1]++; // la cara N se cuenta en la posición N-1
}
```

**Arrays de objetos:** todo lo anterior aplica igual cuando los elementos son objetos — se combina con lo visto en colecciones.

## El punto de entrada (`public static void main`)

En Java todo programa arranca en un método con la firma exacta `public static void main(String[] args)`: público para que la máquina virtual pueda invocarlo, estático porque aún no existe ningún objeto, y con los argumentos de línea de comandos como array de strings.

En TypeScript/Node.js **no hay `main`**: el archivo se ejecuta de arriba hacia abajo. El equivalente idiomático es igualmente concentrar el arranque en una función:

```ts
function main(): void {
  const datos = [3, 8, 1];
  invertir(datos);
  console.log(datos);
}

main();
```

Los argumentos de línea de comandos están en `process.argv` (las dos primeras posiciones son el ejecutable y el archivo):

```ts
// tsx programa.ts hola 42
const args = process.argv.slice(2); // ["hola", "42"]
```

## Práctico

1. Cargar 10 números y mostrar cuántos están por encima del promedio (requiere **dos recorridas**: una para el promedio, otra para contar — ¿por qué no alcanza con una?).
2. Verificar si un array es **capicúa** (se lee igual al derecho y al revés), sin invertirlo.
3. Dado un array de temperaturas por día del mes, mostrar la mayor racha de días consecutivos por encima de 25°.
4. Recibí por línea de comandos una lista de números y mostrá el máximo.

---

**Siguiente:** [Caso integrador →](./09-caso-integrador.md)
