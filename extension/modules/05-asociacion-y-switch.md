# Asociación y switch

Los programas reales tienen varias clases que se conocen entre sí. En este capítulo conectamos objetos mediante **asociación** y sumamos la última estructura de decisión: `switch`.

## Asociación entre clases

Una **asociación** es una relación en la que un objeto guarda una **referencia** a otro. En UML se dibuja como una línea entre las dos clases.

Ejemplo de dominio: una persona puede tener un contrato de trabajo.

```
┌──────────┐        ┌────────────┐
│ Persona  │────────│  Contrato  │
└──────────┘  0..1  └────────────┘
```

```ts
class Contrato {
  constructor(
    private empresa: string,
    private sueldo: number,
  ) {}

  public getEmpresa(): string {
    return this.empresa;
  }

  public getSueldo(): number {
    return this.sueldo;
  }

  public aumentar(porcentaje: number): void {
    if (porcentaje > 0) {
      this.sueldo += this.sueldo * (porcentaje / 100);
    }
  }
}

class Persona {
  private contrato: Contrato | null = null; // puede no tener

  constructor(private nombre: string) {}

  public contratar(c: Contrato): void {
    this.contrato = c;
  }

  public renunciar(): void {
    this.contrato = null;
  }

  public estaEmpleada(): boolean {
    return this.contrato !== null;
  }

  public getSueldo(): number {
    return this.contrato === null ? 0 : this.contrato.getSueldo();
  }
}
```

Puntos importantes:

- El tipo `Contrato | null` dice explícitamente que el atributo **puede no tener** un objeto asociado. TypeScript te obliga a chequear el `null` antes de usarlo — un chequeo que en otros lenguajes se olvida y explota en ejecución.
- `Persona` no duplica los datos del contrato: **delega**. `getSueldo()` de la persona le pregunta al contrato.

Uso:

```ts
const ana = new Persona("Ana");
ana.estaEmpleada(); // false

ana.contratar(new Contrato("ACME", 50000));
ana.estaEmpleada(); // true
ana.getSueldo();    // 50000
```

> **Tip:** cuando una clase tiene un objeto de otra como atributo, preguntate siempre: ¿puede no tenerlo? Si sí, el tipo debe incluir `| null`.

## Ejemplo guiado: temperatura

Modelemos un termómetro que registra una temperatura y la clasifica.

**Diseño**: una clase `Termometro` con la temperatura actual, métodos para actualizarla y un método que devuelve la categoría.

```ts
class Termometro {
  constructor(private grados: number) {}

  public getGrados(): number {
    return this.grados;
  }

  public registrar(nuevos: number): void {
    this.grados = nuevos;
  }

  public categoria(): string {
    if (this.grados < 10) {
      return "frío";
    } else if (this.grados <= 25) {
      return "templado";
    } else {
      return "calor";
    }
  }

  public toString(): string {
    return `${this.grados}°C (${this.categoria()})`;
  }
}
```

Prueba con varias lecturas, calculando el promedio:

```ts
const t = new Termometro(18);
const lecturas = [18, 22, 31, 9, 15];

let suma = 0;
for (const l of lecturas) {
  t.registrar(l);
  console.log(t.toString());
  suma += l;
}
console.log(`Promedio: ${suma / lecturas.length}°C`);
```

Fijate cómo los patrones de los primeros capítulos (acumulador, recorrida) ahora conviven con objetos.

## La sentencia `switch`

Cuando una decisión compara **una misma expresión contra varios valores concretos**, `switch` queda más claro que una cadena de `else if`:

```ts
function nombreDelDia(numero: number): string {
  switch (numero) {
    case 1:
      return "lunes";
    case 2:
      return "martes";
    case 3:
      return "miércoles";
    case 4:
      return "jueves";
    case 5:
      return "viernes";
    case 6:
    case 7:
      return "fin de semana"; // dos casos, misma rama
    default:
      return "día inválido";
  }
}
```

Reglas:

- Cada `case` compara con `===`.
- Sin `break` (o `return`), la ejecución **cae** al caso siguiente (*fall-through*). A veces se usa a propósito (como `6` y `7` arriba), pero olvidarlo es fuente clásica de errores.
- `default` atrapa todo lo que no matcheó — incluilo siempre.

```ts
// Versión con break, cuando no se puede retornar:
switch (opcion) {
  case "a":
    agregar();
    break;
  case "b":
    borrar();
    break;
  default:
    console.log("Opción desconocida");
}
```

> **Tip:** `switch` sirve para igualdad contra constantes. Para rangos (`grados < 10`) seguí usando `if`/`else if`.

## Ejemplo guiado: monedas

Problema: dado un importe entero, indicar la menor cantidad de billetes/monedas para pagarlo, con denominaciones de 100, 50, 10 y 1.

**Idea (algoritmo goloso)**: para cada denominación de mayor a menor, usar la división entera para saber cuántas unidades entran, y el resto para seguir.

```ts
class Cambio {
  public desglosar(importe: number): Map<number, number> {
    const denominaciones = [100, 50, 10, 1];
    const resultado = new Map<number, number>();
    let resto = importe;

    for (const d of denominaciones) {
      const cantidad = Math.trunc(resto / d);
      if (cantidad > 0) {
        resultado.set(d, cantidad);
      }
      resto = resto % d;
    }
    return resultado;
  }
}

const c = new Cambio();
console.log(c.desglosar(287));
// Map { 100 => 2, 50 => 1, 10 => 3, 1 => 7 }
```

La dupla `Math.trunc(a / b)` y `a % b` (cociente y resto) resuelve una familia enorme de problemas: desglose de dinero, conversión de segundos a horas/minutos, dígitos de un número.

## Práctico

1. **`Auto` y `Motor`**: asociación 1 a 1. El auto delega `arrancar()` en su motor; si no tiene motor, informa que no puede arrancar.
2. Reescribí `categoria()` del termómetro para que además distinga "helada" (bajo 0).
3. Con `switch`, convertí una nota numérica (1–12) en concepto: 1–5 "insuficiente", 6–8 "bueno", 9–11 "muy bueno", 12 "excelente". Pista: como `switch` no maneja rangos directamente, evaluá si conviene o si un `if` queda mejor — justificá.
4. Extendé el ejercicio de monedas para que reciba las denominaciones como parámetro.

---

**Siguiente:** [Herencia y polimorfismo →](./06-herencia-y-polimorfismo.md)
