# Fundamentos

Antes de escribir una sola línea de TypeScript conviene entender qué es programar, qué problemas resuelve el software y cómo se piensa una solución antes de codificarla.

## ¿Qué es un sistema?

Un **sistema** es un conjunto de componentes que interactúan para lograr un objetivo. Un sistema de computación combina:

| Componente | Qué es | Ejemplo |
|------------|--------|---------|
| **Hardware** | La parte física | CPU, memoria, disco, pantalla |
| **Software** | Los programas y sus datos | Sistema operativo, apps, este archivo |
| **Personas** | Quienes usan y construyen el sistema | Usuarios, desarrolladores |

Definiciones que vas a usar todo el curso:

- **Programar**: escribir instrucciones precisas para que una máquina resuelva un problema.
- **Diseñar**: decidir *cómo* se va a resolver el problema antes de escribir código.
- **Sistema operativo**: el software base que administra el hardware y permite ejecutar otros programas (Windows, Linux, macOS).

## Características del software

El software tiene propiedades que lo distinguen de un producto físico:

- **No se desgasta**, pero sí se degrada: los requisitos cambian y el código que no se mantiene queda obsoleto.
- **Se construye, no se fabrica**: el costo está en el diseño y desarrollo, no en la copia.
- **Es intangible**: no se puede "tocar" el avance; por eso medirlo es difícil.

## Ciclo de vida del software

Todo software pasa por etapas. La versión clásica:

```
Análisis → Diseño → Implementación → Prueba → Mantenimiento
```

1. **Análisis**: entender *qué* se necesita.
2. **Diseño**: decidir *cómo* se va a construir.
3. **Implementación**: escribir el código.
4. **Prueba**: verificar que hace lo que debe.
5. **Mantenimiento**: corregir y adaptar (es la etapa más larga y cara).

> **Tip:** la mayoría de los errores caros nacen en el análisis, no en el código. Entender bien el problema es la mitad de la solución.

## Lenguajes de programación

Un **lenguaje de programación** es una notación formal para expresar algoritmos que una computadora puede ejecutar.

- **Lenguaje de máquina**: instrucciones binarias que entiende directamente el procesador.
- **Lenguaje de alto nivel**: cercano al lenguaje humano (TypeScript, Java, Python). Necesita traducirse: un **compilador** traduce todo el programa antes de ejecutarlo; un **intérprete** traduce y ejecuta línea a línea.

TypeScript es un caso interesante: se **transpila** a JavaScript, que luego ejecuta un motor como Node.js o el navegador. El compilador de TypeScript además **verifica tipos**: detecta errores antes de ejecutar.

## Resolución de problemas

Un **problema complejo** no se ataca de golpe: se divide en partes más simples (*divide y vencerás*). Se trabaja por niveles:

1. **Primer nivel**: describir la solución en grandes pasos, sin detalle.
2. **Segundo nivel**: refinar cada paso hasta que sea directamente traducible a código.

Este refinamiento progresivo se llama **diseño descendente** (*top-down*).

### Seudocódigo

El **seudocódigo** es una forma de escribir algoritmos en lenguaje casi natural, sin la sintaxis estricta de un lenguaje real. Sirve para pensar la lógica antes de codificar.

```text
// seudocódigo
inicio
    mostrar "Hola"
fin
```

### Estructuras de control

Cualquier algoritmo se puede expresar combinando solo tres estructuras:

**Secuencia** — un paso después de otro:

```text
// seudocódigo
pedir número A
pedir número B
mostrar A + B
```

**Decisión** — elegir un camino según una condición:

```text
// seudocódigo
si temperatura > 30 entonces
    mostrar "hace calor"
si no
    mostrar "está agradable"
fin si
```

**Iteración** — repetir mientras se cumpla una condición:

```text
// seudocódigo
mientras queden platos sucios
    lavar un plato
fin mientras
```

### Ejercicios en seudocódigo

Practicá describiendo con estas tres estructuras situaciones cotidianas:

1. **Cruzar con semáforo**: esperar mientras esté en rojo; cruzar cuando esté en verde (iteración + decisión).
2. **Preparar tortas fritas**: mezclar, y mientras quede masa, freír una porción (secuencia + iteración).
3. **Cambiar una rueda pinchada**: aflojar, levantar, cambiar, bajar, apretar — y decidir qué hacer si la rueda de auxilio también está pinchada.
4. **Adivinar una palabra letra a letra**: mientras queden intentos y la palabra no esté completa, pedir una letra y decidir si pertenece o no.

> **Tip:** si tu seudocódigo tiene ambigüedades ("agregar sal a gusto"), todavía no es un algoritmo.

## Algoritmo

Un **algoritmo** es una secuencia **finita**, **ordenada** y **no ambigua** de pasos que resuelve un problema. Propiedades:

- **Preciso**: cada paso tiene un único significado.
- **Finito**: termina en algún momento.
- **Definido**: con las mismas entradas produce las mismas salidas.

## Ejercicios para resolver

1. Escribí en seudocódigo cómo calcular el vuelto de una compra.
2. Escribí en seudocódigo cómo encontrar la palabra más larga de una lista.
3. ¿Cuál de las tres estructuras de control usarías para "verificar la contraseña hasta 3 intentos"? ¿Por qué se necesitan dos de ellas a la vez?

---

**Siguiente:** [Variables y expresiones →](./02-variables-y-expresiones.md)
