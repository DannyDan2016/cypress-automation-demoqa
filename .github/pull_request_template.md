## Resumen

<!-- Qué cambia y por qué, en una o dos frases. -->

## Cambios

-

## Cómo probar

```bash
npm ci
npm run lint
npm run test:smoke
```

## Resultado de la verificación

<!-- Pasan / fallan / @known-bug, y salida relevante si algo falla. -->

## Checklist

- [ ] Commits atómicos con Conventional Commits en español
- [ ] Page objects solo con locators y acciones; las verificaciones van en los steps
- [ ] Sin selectores, URLs ni datos de negocio en los `.feature` ni en los steps (van en POM y YAML)
- [ ] Escenarios con `@smoke`/`@regression`, `@tc-<area>-NNN` y `@negative`/`@known-bug` si aplica
- [ ] Sin esperas fijas (`cy.wait(ms)`): aserciones web-first, intercepts o `cy.clock`
- [ ] `npm run lint` y la suite afectada en verde
- [ ] Sin secretos ni artefactos (`reports/`, capturas) en el commit
