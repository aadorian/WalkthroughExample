# Caso integrador: gastos del hogar

Un ejercicio grande que junta todo: clases, colecciones, validación con **excepciones**, **búsqueda**, **ordenación** e **interfaces**. Lo construimos incrementalmente, como se hace en la realidad.

## El problema

Registrar los gastos de una casa. De cada gasto interesa el **rubro** (comida, luz, etc.), el **importe** y el **día del mes**. Se quiere: agregar gastos, buscar por rubro, conocer el total y listar ordenado por importe.

## Diseño

Dos clases: `Gasto` (el elemento) y `RegistroGastos` (el todo, agregación).

```
┌────────────────┐         ┌─────────┐
│ RegistroGastos │◇────────│  Gasto  │
└────────────────┘   0..*  └─────────┘
```

## La clase `Gasto`

```ts
class Gasto {
  constructor(
    private rubro: string,
    private importe: number,
    private dia: number,
  ) {
    if (importe <= 0) {
      throw new Error("El importe debe ser positivo");
    }
    if (dia < 1 || dia > 31) {
      throw new Error(`Día inválido: ${dia}`);
    }
  }

  public getRubro(): string {
    return this.rubro;
  }
  public getImporte(): number {
    return this.importe;
  }
  public getDia(): number {
    return this.dia;
  }

  public toString(): string {
    return `[día ${this.dia}] ${this.rubro}: $${this.importe}`;
  }
}
```

## Excepciones

Hasta ahora los métodos rechazaban datos inválidos en silencio (un `if` que no hace nada) o devolvían `boolean`. Las **excepciones** son la tercera opción: interrumpir la operación y **avisar con fuerza**.

- `throw new Error("mensaje")` lanza la excepción: el método se corta ahí.
- Quien llama puede **capturarla** con `try`/`catch`; si nadie la captura, el programa termina mostrando el error.

```ts
try {
  const g = new Gasto("comida", -50, 3);
  console.log("creado", g.toString()); // no se ejecuta
} catch (e) {
  console.log("No se pudo crear el gasto:", (e as Error).message);
}
// El programa sigue vivo después del catch.
```

¿Cuándo usar cada estrategia?

| Situación | Estrategia |
|-----------|-----------|
| El caso "falla" es parte normal del negocio (retirar sin saldo) | devolver `boolean` o `null` |
| El dato es directamente inválido, el objeto no debe existir | `throw` |
| Ignorar el problema en silencio | casi nunca: esconde errores |

## La clase `RegistroGastos`

### Ingreso de datos

```ts
class RegistroGastos {
  private gastos: Gasto[] = [];

  public agregar(rubro: string, importe: number, dia: number): void {
    this.gastos.push(new Gasto(rubro, importe, dia));
    // si el constructor lanza, el push no llega a ejecutarse
  }

  public total(): number {
    let suma = 0;
    for (const g of this.gastos) {
      suma += g.getImporte();
    }
    return suma;
  }
}
```

### Búsqueda

Versión a mano (búsqueda lineal, ya conocida):

```ts
public buscarPorRubro(rubro: string): Gasto[] {
  const resultado: Gasto[] = [];
  for (const g of this.gastos) {
    if (g.getRubro() === rubro) {
      resultado.push(g);
    }
  }
  return resultado;
}
```

Versiones con métodos de la biblioteca estándar (equivalentes a `contains`/`indexOf` de Java):

```ts
// ¿Existe al menos uno? (como contains)
public hayGastosDe(rubro: string): boolean {
  return this.gastos.some((g) => g.getRubro() === rubro);
}

// Posición del primero (como indexOf); -1 si no hay
public posicionPrimero(rubro: string): number {
  return this.gastos.findIndex((g) => g.getRubro() === rubro);
}

// Todos los que cumplen — reemplaza el loop de arriba
public buscarPorRubro2(rubro: string): Gasto[] {
  return this.gastos.filter((g) => g.getRubro() === rubro);
}
```

La sintaxis `(g) => condición` es una **función flecha**: una función anónima corta que se pasa como parámetro. `some`, `findIndex` y `filter` hacen la recorrida por vos y aplican tu condición a cada elemento.

## Ordenación

### Implementación a mano

Para entender qué hace un `sort`, una pasada por el algoritmo de **selección**: buscar el menor del resto y traerlo a la posición actual.

```ts
function ordenarPorImporte(datos: Gasto[]): void {
  for (let i = 0; i < datos.length - 1; i++) {
    let posMenor = i;
    for (let j = i + 1; j < datos.length; j++) {
      if (datos[j].getImporte() < datos[posMenor].getImporte()) {
        posMenor = j;
      }
    }
    const aux = datos[i];
    datos[i] = datos[posMenor];
    datos[posMenor] = aux;
  }
}
```

### Reutilizar: el `sort` de la biblioteca

Escribir el algoritmo cada vez no escala. La biblioteca ya trae `sort`; solo hay que decirle **cómo comparar dos elementos**:

```ts
this.gastos.sort((a, b) => a.getImporte() - b.getImporte());
```

El **comparador** recibe dos elementos y devuelve un número: negativo si `a` va antes, positivo si va después, `0` si son equivalentes. Para números, la resta resuelve. Para strings, `a.getRubro().localeCompare(b.getRubro())`.

> **Tip:** `sort` ordena **el array original** (lo muta). Si necesitás conservar el orden de llegada, ordená una copia: `[...gastos].sort(...)`.

### Nociones de interface

¿Qué tipo tiene ese comparador? Una **interface** define un contrato: qué forma debe tener algo, sin decir cómo se implementa.

```ts
interface Comparador<T> {
  (a: T, b: T): number;
}

const porImporte: Comparador<Gasto> = (a, b) =>
  a.getImporte() - b.getImporte();

const porDia: Comparador<Gasto> = (a, b) => a.getDia() - b.getDia();

// El mismo método sirve para cualquier criterio:
public listarOrdenado(criterio: Comparador<Gasto>): Gasto[] {
  return [...this.gastos].sort(criterio);
}
```

Esto es el equivalente TypeScript del `Comparator` + `Collections.sort` de Java: la ordenación está escrita una sola vez y el **criterio** se inyecta desde afuera. Las interfaces también describen objetos (`interface Punto { x: number; y: number }`) — las vas a usar constantemente.

## Código completo

```ts
class Gasto {
  constructor(
    private rubro: string,
    private importe: number,
    private dia: number,
  ) {
    if (importe <= 0) throw new Error("El importe debe ser positivo");
    if (dia < 1 || dia > 31) throw new Error(`Día inválido: ${dia}`);
  }
  getRubro() { return this.rubro; }
  getImporte() { return this.importe; }
  getDia() { return this.dia; }
  toString() { return `[día ${this.dia}] ${this.rubro}: $${this.importe}`; }
}

class RegistroGastos {
  private gastos: Gasto[] = [];

  agregar(rubro: string, importe: number, dia: number): void {
    this.gastos.push(new Gasto(rubro, importe, dia));
  }

  total(): number {
    let suma = 0;
    for (const g of this.gastos) suma += g.getImporte();
    return suma;
  }

  buscarPorRubro(rubro: string): Gasto[] {
    return this.gastos.filter((g) => g.getRubro() === rubro);
  }

  listarOrdenado(criterio: (a: Gasto, b: Gasto) => number): Gasto[] {
    return [...this.gastos].sort(criterio);
  }
}

// --- Programa principal ---
function main(): void {
  const registro = new RegistroGastos();
  registro.agregar("comida", 3200, 2);
  registro.agregar("luz", 1800, 5);
  registro.agregar("comida", 950, 12);

  try {
    registro.agregar("agua", -10, 8); // inválido
  } catch (e) {
    console.log("Rechazado:", (e as Error).message);
  }

  console.log("Total:", registro.total());
  console.log("Comida:", registro.buscarPorRubro("comida").map(String));

  for (const g of registro.listarOrdenado((a, b) => a.getImporte() - b.getImporte())) {
    console.log(g.toString());
  }
}

main();
```

## Práctico

1. Agregá `gastoMayor(): Gasto | null` y `promedioPorRubro(rubro: string): number`.
2. Agregá `eliminarDia(dia: number): number` que borre todos los gastos de un día y devuelva cuántos borró.
3. Hacé que `listarOrdenado` sin argumento ordene por día (parámetro con valor por defecto).
4. ¿Qué pasa si dos gastos tienen el mismo importe? Proponé un comparador de desempate (lo resolvemos formalmente en el próximo capítulo).

---

**Siguiente:** [Mapas y orden avanzado →](./10-mapas-y-orden.md)
