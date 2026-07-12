# Colecciones

Hasta ahora cada variable guardaba **un** valor u objeto. Los problemas reales manejan **muchos**: las cuentas de un banco, los libros de una biblioteca. Para eso están las **colecciones**.

## El problema

Un banco tiene cuentas corrientes. ¿Cuántas? No se sabe de antemano, y cambia todo el tiempo: se abren y se cierran cuentas. Necesitamos una estructura que **crezca y se achique** dinámicamente.

En TypeScript ese rol lo cumple el **array dinámico** (`Array<T>`, escrito `T[]`), equivalente al `ArrayList` de Java pero integrado al lenguaje.

## Primera versión: la clase `CuentaCorriente`

Primero el elemento individual:

```ts
class CuentaCorriente {
  private saldo = 0;

  constructor(
    private numero: number,
    private titular: string,
  ) {}

  public getNumero(): number {
    return this.numero;
  }

  public getTitular(): string {
    return this.titular;
  }

  public getSaldo(): number {
    return this.saldo;
  }

  public depositar(monto: number): void {
    if (monto > 0) {
      this.saldo += monto;
    }
  }

  public retirar(monto: number): boolean {
    if (monto > 0 && monto <= this.saldo) {
      this.saldo -= monto;
      return true;
    }
    return false; // avisa si la operación no se pudo hacer
  }

  public toString(): string {
    return `Cuenta ${this.numero} (${this.titular}): $${this.saldo}`;
  }
}
```

Fijate que `retirar` devuelve un `boolean`: el objeto **protege su invariante** (el saldo nunca queda negativo) y le informa al que llama si la operación fue posible.

## Listas dinámicas

Operaciones esenciales de `T[]`:

```ts
const cuentas: CuentaCorriente[] = []; // lista vacía

// Agregar al final
cuentas.push(new CuentaCorriente(1, "Ana"));
cuentas.push(new CuentaCorriente(2, "Beto"));

// Tamaño
cuentas.length; // 2

// Acceder por posición (desde 0)
cuentas[0].getTitular(); // "Ana"

// Recorrer
for (const c of cuentas) {
  console.log(c.toString());
}

// Eliminar por posición (1 elemento desde el índice 0)
cuentas.splice(0, 1);
```

| Operación | Java (`ArrayList`) | TypeScript |
|-----------|--------------------|------------|
| crear | `new ArrayList<Cuenta>()` | `const l: Cuenta[] = []` |
| agregar | `l.add(c)` | `l.push(c)` |
| tamaño | `l.size()` | `l.length` |
| acceder | `l.get(i)` | `l[i]` |
| eliminar | `l.remove(i)` | `l.splice(i, 1)` |
| ¿contiene? | `l.contains(c)` | `l.includes(c)` *(compara referencias)* |

> **Tip:** la lista guarda **referencias** a los objetos, no copias. Si modificás el objeto obtenido con `cuentas[0]`, estás modificando *el* objeto que está en la lista.

## Agregación: la clase `Banco`

**Agregación**: el banco *tiene* cuentas. En UML se dibuja con un rombo del lado del todo (`Banco ◇── CuentaCorriente`). En código: un atributo que es una colección.

```ts
class Banco {
  private cuentas: CuentaCorriente[] = [];
  private proximoNumero = 1;

  constructor(private nombre: string) {}

  public abrirCuenta(titular: string): CuentaCorriente {
    const nueva = new CuentaCorriente(this.proximoNumero, titular);
    this.proximoNumero++;
    this.cuentas.push(nueva);
    return nueva;
  }

  /** Devuelve la cuenta con ese número, o null si no existe. */
  public buscar(numero: number): CuentaCorriente | null {
    for (const c of this.cuentas) {
      if (c.getNumero() === numero) {
        return c;
      }
    }
    return null;
  }

  public cerrarCuenta(numero: number): boolean {
    for (let i = 0; i < this.cuentas.length; i++) {
      if (this.cuentas[i].getNumero() === numero) {
        this.cuentas.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  public depositoTotal(): number {
    let total = 0;
    for (const c of this.cuentas) {
      total += c.getSaldo();
    }
    return total;
  }

  public cuentaConMasSaldo(): CuentaCorriente | null {
    if (this.cuentas.length === 0) {
      return null;
    }
    let mejor = this.cuentas[0];
    for (const c of this.cuentas) {
      if (c.getSaldo() > mejor.getSaldo()) {
        mejor = c;
      }
    }
    return mejor;
  }
}
```

Acá reaparecen, sobre objetos, todos los patrones del principio del curso:

- **Búsqueda lineal** con retorno temprano (`buscar`).
- **Acumulador** (`depositoTotal`).
- **Máximo** inicializado con el primer elemento real (`cuentaConMasSaldo`).
- Resultado `| null` cuando puede no haber respuesta.

Uso completo:

```ts
const banco = new Banco("Banco Central");

banco.abrirCuenta("Ana");
const deBeto = banco.abrirCuenta("Beto");

deBeto.depositar(1000);
banco.buscar(1)?.depositar(500);

console.log(banco.depositoTotal());          // 1500
console.log(banco.cuentaConMasSaldo()?.toString());
// Cuenta 2 (Beto): $1000
```

El operador `?.` (*optional chaining*) llama al método solo si el objeto no es `null`; si es `null`, la expresión completa vale `undefined`. Es el atajo idiomático para trabajar con resultados que pueden faltar.

## Práctico

1. Agregá a `Banco` el método `titulares(): string[]` que devuelva los nombres de todos los titulares.
2. Agregá `cuentasConSaldoMayorA(monto: number): CuentaCorriente[]` — patrón **filtrado**: recorrer y `push` de las que cumplen.
3. Agregá `transferir(desde: number, hacia: number, monto: number): boolean` que combine `buscar`, `retirar` y `depositar`. ¿Qué pasa si el retiro funciona pero la cuenta destino no existe? Resolvelo verificando **antes** de operar.
4. **Biblioteca**: modelá `Biblioteca` con una colección de `Libro` (del práctico del capítulo 4), con alta, búsqueda por título y listado de prestados.

---

**Siguiente:** [Arrays →](./08-arrays.md)
