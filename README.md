# Teia Ancestral — Plataforma & Ecossistema Digital

Plataforma web de alta performance desenvolvida para a terapeuta e oraculista **Daiana Rodrigues**. O projeto integra curadoria de terapias corporais e oraculares, experiência imersiva baseada em design system próprio, captação de leads via WhatsApp e automação de deploy contínuo.

---

##  Arquitetura & Stack Tecnológica

* **Core Web:** HTML5 Semântico, CSS3 Moderno (Custom Properties, Flexbox, CSS Grid) e JavaScript Vanilla sem dependências externas pesadas (foco em performance, Core Web Vitals e SEO).
* **SEO & Metadados Avançados:** Implementação de Open Graph completo, Structured Data (Schema.org / `HealthAndBeautyBusiness`) para indexação geolocalizada em São Paulo (Moema, Brooklin e Itapecerica da Serra).
* **Automação & CI/CD:** Pipeline de entrega contínua configurada via **GitHub Actions** (`.github/workflows/deploy.yml`) para sincronização automática com o ambiente de produção.
* **Segurança & Servidor:** Configurações de rotas e segurança via `.htaccess`.

---

## Estrutura de Diretórios

```text
TeiaAncestral/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Pipeline de CI/CD para deploy automatizado
├── assets/
│   ├── css/                    # Estilos modulares com versionamento de cache (?v=...)
│   ├── js/                     # Scripts de comportamento, modais e responsividade
│   └── img/                    # Ativos gráficos otimizados (WebP, GIFs e vídeos de fundo)
├── .htaccess                   # Regras de roteamento e segurança do servidor
├── index.html                  # Landing page principal e vitrine de serviços
├── links.html                  # Árvore de links institucional
├── politica-de-privacidade.html# Conformidade legal e privacidade
├── termos-de-uso.html          # Termos de uso da plataforma
└── sitemap.xml                 # Mapa do site para indexação em buscadores