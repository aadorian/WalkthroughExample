# Ejercicios integradores

Dos casos completos, del estilo de un examen final: leer la letra, diseñar las clases, implementar y probar. Intentá resolverlos **antes** de mirar las soluciones.

## Ejercicio 1: mensajería "Punto a Punto"

Una empresa de cadetería registra **envíos**. De cada envío se conoce el **código** (único), la **dirección de destino**, la **distancia en km** y si ya fue **entregado**. El costo de un envío es `$120` de base más `$30` por km.

Se pide una clase `Cadeteria` que permita:

1. Registrar un envío (código repetido → excepción).
2. Marcar un envío como entregado, por código.
3. Conocer la recaudación total de los envíos **entregados**.
4. Listar los envíos pendientes ordenados por distancia (los más cercanos primero).

### Solución

**Diseño**: `Envio` (elemento) y `Cadeteria` (agregación). El código único sugiere un `Map`.

```ts
class Envio {
  private entregado = false;

  constructor(
    private codigo: string,
    private destino: string,
    private km: number,
  ) {
    if (km <= 0) throw new Error("La distancia debe ser positiva");
  }

  getCodigo() { return this.codigo; }
  getKm() { return this.km; }
  estaEntregado() { return this.entregado; }

  marcarEntregado(): void {
    this.entregado = true;
  }

  costo(): number {
    return 120 + 30 * this.km;
  }

  toString(): string {
    const estado = this.entregado ? "entregado" : "pendiente";
    return `${this.codigo} → ${this.destino} (${this.km} km, $${this.costo()}, ${estado})`;
  }
}

class Cadeteria {
  private envios = new Map<string, Envio>();

  registrar(codigo: string, destino: string, km: number): void {
    if (this.envios.has(codigo)) {
      throw new Error(`Ya existe el envío ${codigo}`);
    }
    this.envios.set(codigo, new Envio(codigo, destino, km));
  }

  marcarEntregado(codigo: string): boolean {
    const e = this.envios.get(codigo);
    if (e === undefined) {
      return false;
    }
    e.marcarEntregado();
    return true;
  }

  recaudacion(): number {
    let total = 0;
    for (const e of this.envios.values()) {
      if (e.estaEntregado()) {
        total += e.costo();
      }
    }
    return total;
  }

  pendientesPorDistancia(): Envio[] {
    const pendientes: Envio[] = [];
    for (const e of this.envios.values()) {
      if (!e.estaEntregado()) {
        pendientes.push(e);
      }
    }
    return pendientes.sort((a, b) => a.getKm() - b.getKm());
  }
}
```

**Decisiones de diseño para defender oralmente:**

- `Map` por código: la clave es única y la búsqueda es directa — el requisito "código repetido" se resuelve con `has`.
- `marcarEntregado` devuelve `boolean` (código inexistente es un caso normal), pero `registrar` lanza excepción (violar la unicidad es un error del que llama).
- El costo se **calcula** (`costo()`), no se guarda: si mañana cambia la tarifa, no hay datos viejos inconsistentes.

**Prueba:**

```ts
const cad = new Cadeteria();
cad.registrar("E1", "Av. Italia 1234", 5);
cad.registrar("E2", "Bvar. Artigas 999", 2);
cad.registrar("E3", "Camino Maldonado km 18", 18);

cad.marcarEntregado("E2");

console.log(cad.recaudacion()); // 120 + 30*2 = 180
for (const e of cad.pendientesPorDistancia()) {
  console.log(e.toString());
}
// E1 (5 km) antes que E3 (18 km)
```

---

## Ejercicio 2: sistema "MultiTarea"

Una app de productividad maneja **tareas**. Toda tarea tiene un **título** y **puntos** de esfuerzo. Hay dos tipos:

- **Tarea simple**: sus puntos son un valor fijo dado al crearla.
- **Tarea compuesta**: contiene otras tareas; sus puntos son la **suma** de los puntos de sus subtareas.

Se pide poder armar árboles de tareas (una compuesta puede contener compuestas) y calcular los puntos de cualquier tarea sin preguntar de qué tipo es.

### Solución

**Diseño**: es el patrón clásico de jerarquía con polimorfismo — clase abstracta `Tarea`, hijas `TareaSimple` y `TareaCompuesta`. La compuesta tiene una colección de `Tarea` (agregación sobre el propio tipo abstracto: eso habilita el árbol).

```
            ┌──────────────┐
            │   «abstract» │
            │     Tarea    │◇──────┐
            └──────┬───────┘       │ 0..*
          ┌────────┴────────┐      │
┌─────────┴─────┐  ┌────────┴─────┐│
│  TareaSimple  │  │TareaCompuesta├┘
└───────────────┘  └──────────────┘
```

```ts
abstract class Tarea {
  constructor(protected titulo: string) {}

  public abstract puntos(): number;

  public describir(nivel = 0): string {
    const sangria = "  ".repeat(nivel);
    return `${sangria}${this.titulo} (${this.puntos()} pts)`;
  }
}

class TareaSimple extends Tarea {
  constructor(titulo: string, private esfuerzo: number) {
    super(titulo);
    if (esfuerzo <= 0) throw new Error("Los puntos deben ser positivos");
  }

  public puntos(): number {
    return this.esfuerzo;
  }
}

class TareaCompuesta extends Tarea {
  private subtareas: Tarea[] = [];

  public agregar(t: Tarea): void {
    this.subtareas.push(t);
  }

  public puntos(): number {
    let total = 0;
    for (const t of this.subtareas) {
      total += t.puntos(); // polimorfismo: cada una sabe calcularse
    }
    return total;
  }

  public override describir(nivel = 0): string {
    let texto = super.describir(nivel);
    for (const t of this.subtareas) {
      texto += "\n" + t.describir(nivel + 1);
    }
    return texto;
  }
}
```

**Prueba:**

```ts
const entrega = new TareaCompuesta("Entrega final");
entrega.agregar(new TareaSimple("Escribir informe", 5));

const codigo = new TareaCompuesta("Programar");
codigo.agregar(new TareaSimple("Modelo", 8));
codigo.agregar(new TareaSimple("Pruebas", 3));

entrega.agregar(codigo);

console.log(entrega.puntos()); // 16
console.log(entrega.describir());
// Entrega final (16 pts)
//   Escribir informe (5 pts)
//   Programar (11 pts)
//     Modelo (8 pts)
//     Pruebas (3 pts)
```

**Por qué funciona sin preguntar el tipo:** `puntos()` es abstracto; el array de la compuesta es de tipo `Tarea`, y al invocarlo cada objeto responde con su versión. Cuando la subtarea es a su vez compuesta, la llamada se propaga sola por el árbol (**recursión** vía polimorfismo). Esto es lo que en diseño se conoce como patrón *Composite* — lo vas a reencontrar formalizado en Diseño de Aplicaciones.

---

## Para seguir practicando

1. Agregale a la cadetería `envioMasCaro(): Envio | null` y `cancelar(codigo): boolean` (solo pendientes).
2. Agregale a las tareas un estado `completada` — en la compuesta, está completada solo si **todas** sus subtareas lo están (patrón "todos cumplen": bandera que arranca en `true`).
3. Combiná ambos: una `TareaCompuesta` cuyos puntos tengan un tope máximo configurable. ¿Dónde va esa validación?
4. Para cada ejercicio, armá el plan de prueba con casos normales, borde e inválidos.

---

**Volver al [índice](./README.md)**
