# Herencia y polimorfismo

La **herencia** permite definir una clase nueva a partir de otra, reutilizando y especializando su comportamiento. Junto con el **polimorfismo** es el mecanismo más poderoso — y el más fácil de usar mal — de la POO.

## Prueba de programas

Antes de agrandar los diseños, un hábito profesional: **probar**. Probar no es "correrlo una vez y ver que anda", sino elegir casos que ataquen los puntos débiles:

- **Casos normales**: valores típicos.
- **Casos borde**: el primero, el último, cero elementos, el límite exacto (`edad === 18`).
- **Casos inválidos**: entradas que el programa debería rechazar sin romperse.

Un formato simple de plan de prueba:

| Caso | Entrada | Salida esperada | Salida obtenida |
|------|---------|-----------------|-----------------|
| normal | `cargar(100)` con carga 0 | carga = 100 | ✔ |
| borde | `descargar(100)` con carga 100 | carga = 0 | ✔ |
| inválido | `cargar(-5)` | carga sin cambios | ✔ |

> **Tip:** escribí el plan de prueba **antes** de codificar: te obliga a definir qué significa "correcto".

## Herencia

Una clase **hija** (subclase) `extends` una clase **padre** (superclase): hereda sus atributos y métodos, y puede agregar o redefinir.

La relación debe leerse "**es un/a**": una camioneta *es un* vehículo. Si la frase no suena natural, probablemente no sea herencia (un banco no *es una* cuenta: la *tiene* — eso es agregación).

```ts
class Vehiculo {
  constructor(
    protected matricula: string,
    protected velocidad: number = 0,
  ) {}

  public acelerar(delta: number): void {
    if (delta > 0) {
      this.velocidad += delta;
    }
  }

  public getVelocidad(): number {
    return this.velocidad;
  }

  public descripcion(): string {
    return `Vehículo ${this.matricula} a ${this.velocidad} km/h`;
  }
}

class Camioneta extends Vehiculo {
  private carga = 0;

  constructor(matricula: string, private cargaMaxima: number) {
    super(matricula); // SIEMPRE: primero inicializar la parte heredada
  }

  public cargar(kg: number): void {
    if (kg > 0 && this.carga + kg <= this.cargaMaxima) {
      this.carga += kg;
    }
  }

  // Redefinición (override) del método del padre:
  public override descripcion(): string {
    return `${super.descripcion()} con ${this.carga} kg`;
  }
}
```

Piezas nuevas:

- `extends` — declara la herencia.
- `super(...)` en el constructor — invoca el constructor del padre; es obligatorio antes de usar `this`.
- `super.metodo()` — llama la versión del padre desde una redefinición.
- `protected` — visible para la clase y sus hijas (a diferencia de `private`, que es solo para la propia clase).
- `override` — marca explícita de que estás redefiniendo; el compilador avisa si el método no existe en el padre (por ejemplo, si le erraste al nombre).

## Upcast

Como una `Camioneta` **es un** `Vehiculo`, se puede usar en cualquier lugar donde se espere un `Vehiculo`. Esa asignación "hacia arriba" es el **upcast** y es siempre segura:

```ts
const v: Vehiculo = new Camioneta("ABC 1234", 1000); // upcast implícito

v.acelerar(60);   // ✔ es de Vehiculo
v.descripcion();  // ✔ ¿pero cuál versión ejecuta? (ver polimorfismo)
// v.cargar(200); // ✘ error de compilación: para el compilador, v es un Vehiculo
```

El **downcast** (tratar el `Vehiculo` como `Camioneta` de nuevo) requiere verificar primero:

```ts
if (v instanceof Camioneta) {
  v.cargar(200); // dentro del if, TypeScript ya lo trata como Camioneta
}
```

## Polimorfismo

**Polimorfismo**: la llamada `v.descripcion()` ejecuta la versión que corresponde al **tipo real del objeto**, no al tipo declarado de la variable.

```ts
const flota: Vehiculo[] = [
  new Vehiculo("AAA 1111"),
  new Camioneta("BBB 2222", 800),
  new Camioneta("CCC 3333", 1500),
];

for (const v of flota) {
  console.log(v.descripcion());
  // Cada objeto responde con SU versión: el mismo código,
  // comportamientos distintos.
}
```

Esto elimina cadenas de `if (tipo === ...)`: en vez de preguntar qué es cada objeto, se le pide que haga lo suyo.

## Clases abstractas

A veces la superclase es solo un concepto: no tiene sentido crear un "vehículo genérico", o hay métodos que cada hija **debe** implementar a su manera. Para eso, `abstract`:

```ts
abstract class Figura {
  constructor(protected nombre: string) {}

  // Método abstracto: sin cuerpo; cada hija DEBE implementarlo
  public abstract area(): number;

  // Método concreto que usa el abstracto: ¡polimorfismo interno!
  public describir(): string {
    return `${this.nombre}: área ${this.area().toFixed(2)}`;
  }
}

class Circulo extends Figura {
  constructor(private radio: number) {
    super("círculo");
  }
  public area(): number {
    return Math.PI * this.radio ** 2;
  }
}

class Cuadrado extends Figura {
  constructor(private lado: number) {
    super("cuadrado");
  }
  public area(): number {
    return this.lado ** 2;
  }
}

// new Figura("x"); // ✘ error: no se puede instanciar una clase abstracta

const figuras: Figura[] = [new Circulo(2), new Cuadrado(3)];
for (const f of figuras) {
  console.log(f.describir());
}
// círculo: área 12.57
// cuadrado: área 9.00
```

Resumen de cuándo usar qué:

| Situación | Herramienta |
|-----------|-------------|
| Varias clases comparten datos y comportamiento común | superclase concreta |
| El concepto común no debe instanciarse | clase `abstract` |
| Cada hija debe dar su propia versión de un método | método `abstract` |
| La relación es "tiene un" y no "es un" | asociación/agregación, **no** herencia |

## Práctico

1. **Jerarquía `Empleado`**: clase abstracta con `nombre` y método abstracto `sueldo()`. Hijas: `EmpleadoMensual` (sueldo fijo) y `EmpleadoPorHora` (tarifa × horas). Recorré un array de `Empleado` imprimiendo cada sueldo.
2. Agregá a la jerarquía un método concreto `recibo(): string` en la clase abstracta que use `sueldo()` — comprobá el polimorfismo.
3. ¿Cuál de estas relaciones es herencia y cuál no? Justificá con "es un / tiene un": (a) `Cuadrado`/`Figura`, (b) `Auto`/`Rueda`, (c) `Gerente`/`Empleado`, (d) `Banco`/`Cuenta`.
4. Armá el plan de prueba (normal/borde/inválido) para `EmpleadoPorHora.sueldo()`.

---

**Siguiente:** [Colecciones →](./07-colecciones.md)
