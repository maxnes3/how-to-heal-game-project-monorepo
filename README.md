# 🔮 How to heal?! (game project)

A cross-platform game project built as a TypeScript monorepo.

## 🏗 Architecture

```mermaid
flowchart TB
    Desktop["🏰 @game/desktop"]

    Renderer["🐉 @game/renderer"]
    Core["👑 @game/core"]
    Store["📜 @game/store"]
    I18n["🚩 @game/i18n"]
    Theme["🦄 @game/theme"]

    Pixi["PixiJS"]
    React["React"]
    Electron["Electron"]
    I18next["i18next"]

    Desktop --> React
    Desktop --> Electron

    Desktop --> Renderer
    Desktop --> Store
    Desktop --> I18n
    Desktop --> Theme

    Renderer --> Core
    Renderer --> Store
    Renderer --> I18n
    Renderer --> Pixi

    Store --> Core

    I18n --> I18next
```

## 📦 Monorepo structure

```text
.
├── apps/
│   ├── desktop/              # Electron desktop application
│   └── mobile/               # React Native mobile application
│
├── packages/
│   ├── core/                 # Game domain and business logic
│   ├── i18n/                 # Shared localization
│   ├── renderer/             # Game rendering abstraction and PixiJS implementation
│   ├── store/                # Game storage
│   └── theme/                # Shared design tokens and theme
│
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## 🏰 [Desktop](./apps/desktop/)

### Run Development Mode

```bash
pnpm install
pnpm turbo run dev --filter=@game/desktop
```

> Requirements: Node.js 22+, pnpm

## 🧩 Packages

### 👑 [`@game/core`](./packages/core/)

Contains platform-independent game logic.

This package should not depend on:

* Electron
* React
* PixiJS
* React Native

The goal is to keep the game domain independent from the UI platform.

### 📜 [`@game/store`](./packages/store/)

### 🐉 [`@game/renderer`](./packages/renderer/)

Contains the rendering abstraction and its implementation.

Currently uses PixiJS.

```text
Game state
    ↓
@game/core
    ↓
Renderer interfaces
    ↓
PixiJS implementation
```

This allows the rendering implementation to be replaced in the future without changing the game domain.

### 🚩 [`@game/i18n`](./packages/i18n/)

Shared localization package based on `i18next`.

Can be used by:

* React through `react-i18next`
* PixiJS renderer through the core `i18next` instance

### 🦄 [`@game/theme`](./packages/theme/)

Contains shared UI design tokens and theme definitions.

## 🔄 Dependency direction

```mermaid
flowchart LR
    UI["Desktop UI"]
    Renderer["Renderer"]
    Store["Game Store"]
    Core["Game Core"]

    UI --> Renderer
    Renderer --> Store
    Store --> Core
```

The core game logic should remain independent from rendering and platform-specific code.
