# Programación desde cero con TypeScript

Guía de estudio original que cubre el temario de un curso introductorio de programación orientada a objetos (15 semanas), con todos los ejemplos escritos en **TypeScript**.

> **Nota:** este material es una guía original de estudio. Sigue el temario del curso Programación I (ORT), pero el contenido, la redacción y todos los ejemplos de código fueron creados desde cero. Para el material oficial del curso, consultá el libro de la cátedra.

## Contenido

| # | Archivo | Temas | Semanas |
|---|---------|-------|---------|
| 1 | [Fundamentos](./01-fundamentos.md) | Sistemas, software, ciclo de vida, seudocódigo, algoritmos | 1 |
| 2 | [Variables y expresiones](./02-variables-y-expresiones.md) | Variables, corrida a mano, expresiones aritméticas y lógicas | 2 |
| 3 | [TypeScript básico](./03-typescript-basico.md) | Tipos, conversiones, operadores, estructuras de control | 3 |
| 4 | [Clases y objetos](./04-clases-y-objetos.md) | POO, UML, constructores, getters/setters, `toString`, `static` | 4–5 |
| 5 | [Asociación y switch](./05-asociacion-y-switch.md) | Relaciones entre clases, `switch`, ejemplos guiados | 6–7 |
| 6 | [Herencia y polimorfismo](./06-herencia-y-polimorfismo.md) | Herencia, upcast, clases abstractas, prueba de programas | 8–9 |
| 7 | [Colecciones](./07-colecciones.md) | Listas dinámicas, agregación, caso Banco | 9–10 |
| 8 | [Arrays](./08-arrays.md) | Arrays de tamaño fijo, recorridas, punto de entrada | 11 |
| 9 | [Caso integrador](./09-caso-integrador.md) | Excepciones, búsqueda, ordenación, interfaces | 12 |
| 10 | [Mapas y orden avanzado](./10-mapas-y-orden.md) | Orden por dos campos, `Map`, `null` y `undefined` | 13 |
| 11 | [Ejercicios integradores](./11-ejercicios-integradores.md) | Dos casos completos con solución paso a paso | 14–15 |

## Cómo usar esta guía

1. Leé cada capítulo en orden: cada uno asume los anteriores.
2. Ejecutá los ejemplos. Con [Node.js](https://nodejs.org) instalado:

   ```bash
   npm install -g tsx
   tsx ejemplo.ts
   ```

3. Resolvé los ejercicios propuestos **antes** de mirar las soluciones.

## Convenciones

- Los bloques de código son TypeScript ejecutable salvo que se indique `// seudocódigo`.
- Los nombres de dominio están en español (`Camion`, `CuentaCorriente`) y los de la sintaxis en inglés, como en la vida real.
- `>` **Tip:** los consejos prácticos aparecen así.
