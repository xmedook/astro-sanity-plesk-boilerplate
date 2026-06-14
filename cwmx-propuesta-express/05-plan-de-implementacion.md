# 05 — Plan de Implementación

> **Propósito:** Orden de ejecución, dependencias, riesgos, rollout strategy

---

## 5.1 Fases

### Fase 1: Foundation (Sesión 1 — ~2 horas)
**Objetivo:** Cambios que no requieren componentes nuevos, solo editar archivos existentes.

| # | Cambio | Archivo(s) | Riesgo |
|---|--------|-----------|--------|
| 1.1 | Price anchor en hero subtitle | `lib/i18n/translations.ts` → `hero.subtitle` | Bajo — solo texto |
| 1.2 | Badge de urgencia dinámico | `components/home/hero.tsx` | Bajo — reemplazar texto estático |
| 1.3 | Garantía en FinalCTA | `lib/i18n/translations.ts` → `finalCta` | Bajo — solo texto |
| 1.4 | Exit intent con price anchor | `components/home/exit-intent.tsx` | Bajo — solo texto |
| 1.5 | FAQ rewrite completo | `components/home/faq.tsx` (o donde esté) | Medio — componente accordion |
| 1.6 | Header badge de slots | `components/layout/header.tsx` | Bajo — añadir badge |

**Verificación F1:** `curl -s https://cheapweb.mx/ | grep -c 'Normalmente'` debe ser >0

---

### Fase 2: Nuevas Secciones (Sesión 2 — ~3 horas)
**Objetivo:** Componentes nuevos que requieren creación de archivos.

| # | Cambio | Archivo(s) | Riesgo |
|---|--------|-----------|--------|
| 2.1 | Founder section | Nuevo: `components/home/founder.tsx` + entry en `app/page.tsx` | Medio — nuevo componente |
| 2.2 | Why this price | Nuevo: `components/home/why-this-price.tsx` + entry | Medio — nuevo componente |
| 2.3 | Tabla comparativa | Nuevo: `components/home/comparison-table.tsx` + entry | Medio — CSS grid/table |
| 2.4 | Founder translations | `lib/i18n/translations.ts` → nueva key `founder` | Bajo — solo texto |

**Verificación F2:** Navegar la landing y ver las 3 nuevas secciones integradas visualmente.

---

### Fase 3: Pricing Transparency (Sesión 3 — ~2 horas)
**Objetivo:** Rediseñar las tarjetas de pricing con Included/Not included.

| # | Cambio | Archivo(s) | Riesgo |
|---|--------|-----------|--------|
| 3.1 | Pricing cards con ✓/✗ | `components/home/pricing.tsx` | Alto — reestructura componente |
| 3.2 | Pricing translations | `lib/i18n/translations.ts` → `pricing.included` + `pricing.notIncluded` | Medio — estructura anidada |
| 3.3 | Mobile responsive de tablas | CSS en pricing.tsx | Medio — narrow screens |

**Verificación F3:** Las 3 tarjetas deben mostrar columnas ✓ y ✗ en desktop y mobile.

---

### Fase 4: Portfolio + Polish (Sesión 4 — ~1.5 horas)
**Objetivo:** Links vivos + ajustes finales.

| # | Cambio | Archivo(s) | Riesgo |
|---|--------|-----------|--------|
| 4.1 | Portfolio con links externos | `components/home/portfolio.tsx` | Bajo — cambiar `<div>` por `<a>` |
| 4.2 | Reordenar secciones si es necesario | `app/page.tsx` | Bajo — mover imports |
| 4.3 | Smoke test completo | Browser navigate + console | Bajo |

**Verificación F4:** Portfolio cards abren sitios reales en nueva pestaña.

---

## 5.2 Dependencias entre fases

```
F1 (Foundation)
 └─ No tiene dependencias — se puede hacer ya
     └─ F2 (Nuevas Secciones)
         └─ Necesita que F1 esté deployed para probar contexto visual
             └─ F3 (Pricing)
                 └─ Puede hacerse en paralelo con F2 si son devs distintos
                     └─ F4 (Portfolio + Polish)
                         └─ Depende de F1+F2+F3 deployed
```

---

## 5.3 Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| **Founder section suena forzada** | Media | Alto — daña credibilidad | Escribir en voz de Alejandro real, no "copy de marketing". Que él lo apruebe. |
| **Pricing con NO incluye ahuyenta** | Baja | Medio — menos conversión | El NO incluye es para calificar leads, no para asustar. Medir antes/después. |
| **Tabla comparativa percibida como "agresiva"** | Baja | Bajo | Lenguaje factual, no ataques. "Compáralo tú mismo." |
| **Traducciones EN quedan desactualizadas** | Alta | Bajo | Mantener EN al día con cada cambio en ES. Mismo archivo. |
| **Muchas secciones nuevas alargan la landing** | Media | Medio | Monitorear scroll depth post-deploy. Si baja, reconsiderar orden. |
| **Staging vs Prod divergen** | Media | Alto | Cada fase: primero staging → verificar → luego prod. |

---

## 5.4 Rollout Strategy

### Regla de oro: Staging primero, siempre.

```
1. Hacer cambios en el repo
2. Build + deploy a cheapweb-staging (port 3015)
3. Verificar en https://new.cheapweb.mx/
4. Alejandro aprueba visualmente
5. Deploy a cheapweb-web (port 3006, producción)
6. Smoke test en https://cheapweb.mx/
```

### No hacer:
- ❌ Deploy directo a prod sin pasar por staging
- ❌ Deploy un viernes a las 6pm
- ❌ Hacer F1+F2+F3 en un solo deploy — una fase a la vez
- ❌ Cambiar copy sin actualizar traducciones EN

---

## 5.5 Rollback Plan

Cada fase es independiente. Si una fase causa problemas:

```bash
cd /var/www/vhosts/nexosrv.one/cheapweb-web
git checkout <commit-anterior>
npm run build
/opt/data/scripts/pm2.sh restart cheapweb-web --update-env
```

El `llms.txt` y el `gobierno-comercial.md` deben actualizarse después de cada fase completada.
