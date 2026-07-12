# Mapas y orden avanzado

Dos herramientas que completan la caja: ordenar por **más de un criterio** y buscar por **clave** con `Map`.

## Orden por dos campos

Problema: ordenar personas por apellido, y ante apellidos iguales, por nombre. La técnica: el comparador evalúa el **campo principal**; solo si empata, desempata con el secundario.

```ts
class Persona {
  constructor(
    private nombre: string,
    private apellido: string,
  ) {}
  getNombre() { return this.nombre; }
  getApellido() { return this.apellido; }
  toString() { return `${this.apellido}, ${this.nombre}`; }
}

const gente = [
  new Persona("Carla", "Pérez"),
  new Persona("Ana", "García"),
  new Persona("Beto", "Pérez"),
];

gente.sort((a, b) => {
  const porApellido = a.getApellido().localeCompare(b.getApellido());
  if (porApellido !== 0) {
    return porApellido; // no empataron: decide el apellido
  }
  return a.getNombre().localeCompare(b.getNombre()); // desempate
});

// García, Ana — Pérez, Beto — Pérez, Carla
```

El patrón se extiende a tres o más campos encadenando desempates. Versión compacta con `||` (si el primer comparador da `0`, que es *falsy*, se evalúa el segundo):

```ts
gente.sort(
  (a, b) =>
    a.getApellido().localeCompare(b.getApellido()) ||
    a.getNombre().localeCompare(b.getNombre()),
);
```

Para orden **descendente**, invertí los operandos: `b.getX() - a.getX()`.

## Agenda telefónica: `Map`

Problema: dada un nombre, encontrar su teléfono. Con una lista habría que recorrer todo (búsqueda lineal). Un **mapa** asocia directamente **clave → valor** y busca en un paso.

`Map` es el equivalente TypeScript del `HashMap` de Java:

```ts
const agenda = new Map<string, string>();

// Agregar / actualizar (misma operación: la clave es única)
agenda.set("Ana", "099 111 222");
agenda.set("Beto", "098 333 444");
agenda.set("Ana", "091 000 000"); // pisa el anterior

// Consultar
agenda.get("Ana");    // "091 000 000"
agenda.get("Zoe");    // undefined — la clave no existe
agenda.has("Beto");   // true

// Eliminar y tamaño
agenda.delete("Beto"); // true
agenda.size;           // 1

// Recorrer
for (const [nombre, telefono] of agenda) {
  console.log(`${nombre}: ${telefono}`);
}
```

| Operación | Java (`HashMap`) | TypeScript (`Map`) |
|-----------|------------------|--------------------|
| crear | `new HashMap<K,V>()` | `new Map<K, V>()` |
| poner | `m.put(k, v)` | `m.set(k, v)` |
| obtener | `m.get(k)` | `m.get(k)` |
| ¿existe clave? | `m.containsKey(k)` | `m.has(k)` |
| eliminar | `m.remove(k)` | `m.delete(k)` |
| tamaño | `m.size()` | `m.size` |

¿Cuándo mapa y cuándo lista?

- **Lista**: importa el orden de llegada, hay duplicados, se recorre todo.
- **Mapa**: se busca por un identificador único (cédula, número de cuenta, nombre de usuario).

Un mapa también sirve de **tabla de contadores** con clave no numérica:

```ts
function contarPalabras(texto: string): Map<string, number> {
  const conteo = new Map<string, number>();
  for (const palabra of texto.toLowerCase().split(" ")) {
    const actual = conteo.get(palabra) ?? 0; // si no existe, arranca en 0
    conteo.set(palabra, actual + 1);
  }
  return conteo;
}
```

## Tipos primitivos, objetos y ausencia de valor

En Java existen los *wrappers* (`Integer`, `Double`, `Boolean`) porque las colecciones solo aceptan objetos, y el *boxing* convierte automáticamente entre `int` e `Integer`. En TypeScript **ese problema no existe**: `number`, `string` y `boolean` entran directo en arrays y mapas, sin conversión.

Lo que sí hereda TypeScript es la pregunta importante detrás de los wrappers: **¿cómo se representa "no hay valor"?**

### `null` y `undefined`

- `undefined`: la ausencia "natural" — una variable sin asignar, un `get` de clave inexistente, un índice fuera de rango.
- `null`: la ausencia **deliberada** — "acá podría haber un objeto y decidimos que no hay" (la persona sin contrato del capítulo 5).

```ts
let contrato: Contrato | null = null;      // ausencia intencional
const tel = agenda.get("Zoe");             // string | undefined
```

Herramientas para trabajarlos:

```ts
// Optional chaining: sigue solo si no es null/undefined
const largo = agenda.get("Zoe")?.length;   // number | undefined

// Nullish coalescing: valor por defecto si es null/undefined
const telefono = agenda.get("Zoe") ?? "sin teléfono";

// Chequeo explícito: adentro del if, el tipo se "angosta"
const t = agenda.get("Ana");
if (t !== undefined) {
  console.log(t.toUpperCase()); // acá t es string, seguro
}
```

> **Tip:** `??` solo reemplaza `null`/`undefined`; `||` reemplaza también `0` y `""`. Para valores por defecto casi siempre querés `??`.

## Práctico

1. Ordená los gastos del capítulo anterior por rubro, y a igual rubro por importe descendente.
2. Agenda que soporte **varios teléfonos por persona**: `Map<string, string[]>`. Implementá `agregarTelefono(nombre, tel)` cuidando el caso de la primera vez.
3. Con `contarPalabras`, encontrá la palabra más frecuente de un texto (recorrida de un `Map` buscando el máximo).
4. Reescribí `Banco.buscar` del capítulo 7 usando un `Map<number, CuentaCorriente>`. ¿Qué método deja de necesitar un loop?

---

**Siguiente:** [Ejercicios integradores →](./11-ejercicios-integradores.md)
