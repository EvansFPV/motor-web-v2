# MotorLab

## Русский
MotorLab — браузерный инструмент для проектирования обмоток и подбора магнитов BLDC с визуализацией, инженерными проверками и удобным мобильным интерфейсом.

## Статус
Текущая публичная бета-версия: `1.2.0-beta` (полная русификация документации, обновлённые релизные материалы и синхронизация инструкций по публикации при сохранении ядра расчётов).

## Ключевые возможности
- Калькулятор схем обмотки в режимах «пазы/полюса» и ручной схемы
- Визуализация намотки с анимацией и расширенными режимами просмотра
- Советник по магнитам: полюсный шаг, коэффициент покрытия, рекомендуемая ширина и группы предупреждений
- Сравнение схем и панель инженерной оценки
- История, пресеты, экспорт в JSON/CSV и share-ссылка
- PWA-режим с установкой на устройство и офлайн-оболочкой
- Гостевой режим по умолчанию и опциональная синхронизация проектов через Supabase

## Быстрый старт
### Локальный запуск (статический сервер)
```bash
python3 -m http.server 8080
```
Откройте `http://localhost:8080`.

### Запуск через Docker
```bash
docker build -t motor-web .
docker run -p 8080:80 motor-web
```
Откройте `http://localhost:8080`.

## Деплой
MotorLab — статическое веб-приложение. Его можно размещать на Vercel, Netlify, GitHub Pages или любом сервере с Nginx.

### Vercel
- В репозитории уже есть `vercel.json` с rewrite-правилами и cache headers.
- Укажите **Project Settings → Root Directory** в соответствии со структурой репозитория:
  - если `index.html` находится в корне репозитория, оставьте Root Directory пустым или укажите `.`;
  - если приложение лежит в подпапке, укажите эту подпапку как Root Directory.
- Пути к ресурсам должны оставаться корневыми (`/icons/...`, `/manifest.json`), а Vercel должен отдавать приложение именно из выбранного корня.
- После изменения Root Directory выполните redeploy и проверьте:
  - `/icons/apple-touch-icon.png`
  - `/icons/favicon-32.png`
  - `/manifest.json`
- Подробная диагностика: [`docs/vercel-root-directory.md`](./docs/vercel-root-directory.md)

### Netlify
- В репозитории есть `netlify.toml` с publish root, redirect-правилами и headers.
- Достаточно подключить репозиторий и задеплоить его без build-команды.

### Nginx / Docker
- Для контейнерного статического хостинга подготовлены `Dockerfile` и `nginx.conf`.

## Использование
1. Откройте вкладку **Calculator**.
2. Введите число пазов и полюсов или переключитесь в режим ручной схемы.
3. Нажмите **Calculate**.
4. Изучите результат по обмотке, KgV/LCM, коэффициент обмотки и инженерные блоки.
5. При необходимости настройте расширенные параметры магнитов.
6. Сохраните расчёт в историю, сравните схемы или экспортируйте/поделитесь результатом.

## Настройка Supabase (опционально)
Supabase не является обязательным. Гостевой режим работает без backend-сервисов.

1. Создайте проект в Supabase.
2. Примените [`supabase/schema.sql`](./supabase/schema.sql).
3. Укажите публичные клиентские значения в `index.html`:
```html
window.MotorProductConfig = {
  supabaseUrl: "https://YOUR_PROJECT.supabase.co",
  supabaseAnonKey: "YOUR_PUBLIC_ANON_KEY"
};
```
4. `supabaseAnonKey` должен быть публичным для браузерного приложения. Никогда не используйте service-role key во frontend-коде.

## PWA
- Приложение поддерживает режим установки (`standalone`) и офлайн-кэширование оболочки через `sw.js`.
- После обновления shell-метаданных или иконок один раз инициируйте обновление приложения, чтобы освежить кэшированные ресурсы.

## Технологии
- Vanilla JavaScript, HTML, CSS
- PWA (manifest + service worker)
- Опциональный Supabase (Auth + Postgres)
- Frontend-хуки, готовые к интеграции со Stripe

## Структура проекта
```text
index.html
bewicklungsrechner_xl_style.css
bewicklungsrechner_xl_script.js
icons/
js/
  product/
  ui/
supabase/
  schema.sql
tests/
  check-calculator.js
```

## Дорожная карта
- Серверная верификация подписок Stripe
- Полноценные настройки аккаунта и профиля
- Расширенные проверки PRO-прав доступа
- Дополнительная аналитика и retention-инструменты

## Релизы
- История изменений: [`CHANGELOG.md`](./CHANGELOG.md)
- Подсказки по GitHub-метаданным и подготовке релиза: [`docs/github-metadata.md`](./docs/github-metadata.md)
- Черновик заметок к релизу `1.2.0-beta`: [`docs/release-1.2.0-beta.md`](./docs/release-1.2.0-beta.md)
- Для пользовательских и деплойных изменений используйте semantic versioning.

## Лицензия
Финальный текст лицензии пока не добавлен.
Перед публикацией полноценного open-source релиза выберите лицензию и добавьте файл `LICENSE` в корень репозитория.
См. [`LICENSE-CHOICE.md`](./LICENSE-CHOICE.md).

## English
MotorLab is a browser-based electric motor winding and magnet design tool for fast BLDC scheme exploration, engineering checks, and mobile-friendly workflows.

## Status
Current public beta: `1.2.0-beta` (documentation fully translated with Russian-first ordering, refreshed release materials, and aligned publishing guidance while preserving the core calculation logic).

## Core Features
- Winding scheme calculator (slots/poles and manual schema modes)
- Winding visualization with animation and enhanced view controls
- Magnet advisor (pole pitch, coverage ratio, suggested width, warning groups)
- Scheme comparison and engineering assessment panel
- Save/load history, presets, JSON/CSV export, and share link
- Mobile-first PWA behavior (installable shell + offline support)
- Guest mode by default, with optional Supabase auth/cloud project sync

## Quick Start
### Run locally (static server)
```bash
python3 -m http.server 8080
```
Open `http://localhost:8080`.

### Run with Docker
```bash
docker build -t motor-web .
docker run -p 8080:80 motor-web
```
Open `http://localhost:8080`.

## Deployment
MotorLab is a static web application. You can deploy it on Vercel, Netlify, GitHub Pages, or any Nginx host.

### Vercel
- `vercel.json` is included for rewrites and cache headers.
- Set **Project Settings → Root Directory** according to your repository layout:
  - If `index.html` is in the repository root, keep Root Directory empty (or `.`).
  - If the app is inside a subfolder, set Root Directory to that subfolder.
- Keep app paths root-relative (`/icons/...`, `/manifest.json`) and ensure Vercel serves the app from the selected root.
- After changing the root directory, redeploy once and verify:
  - `/icons/apple-touch-icon.png`
  - `/icons/favicon-32.png`
  - `/manifest.json`
- Detailed troubleshooting: [`docs/vercel-root-directory.md`](./docs/vercel-root-directory.md)

### Netlify
- `netlify.toml` is included for publish root, redirects, and headers.
- Connect the repository and deploy without a build command.

### Nginx / Docker
- `Dockerfile` and `nginx.conf` are provided for containerized static hosting.

## Usage
1. Open the **Calculator** tab.
2. Enter slots/poles or switch to schema mode.
3. Press **Calculate**.
4. Review winding output, KgV/LCM, winding factor, and engineering blocks.
5. Optionally adjust advanced magnet inputs.
6. Save to history, compare schemes, or export/share results.

## Supabase Setup (Optional)
Supabase is optional. Guest mode works without backend services.

1. Create a Supabase project.
2. Apply [`supabase/schema.sql`](./supabase/schema.sql).
3. Configure public client values in `index.html`:
```html
window.MotorProductConfig = {
  supabaseUrl: "https://YOUR_PROJECT.supabase.co",
  supabaseAnonKey: "YOUR_PUBLIC_ANON_KEY"
};
```
4. `supabaseAnonKey` is expected to be public in browser apps. Never use a service-role key in frontend code.

## PWA Notes
- Supports install mode (`standalone`) with offline shell caching via `sw.js`.
- After updating shell metadata/icons, trigger an app update once so cached shell assets refresh.

## Tech Stack
- Vanilla JavaScript, HTML, CSS
- PWA (manifest + service worker)
- Optional Supabase (Auth + Postgres)
- Stripe-ready frontend hooks (billing placeholders)

## Project Structure
```text
index.html
bewicklungsrechner_xl_style.css
bewicklungsrechner_xl_script.js
icons/
js/
  product/
  ui/
supabase/
  schema.sql
tests/
  check-calculator.js
```

## Roadmap
- Server-side Stripe subscription verification
- Production-grade account/profile settings
- Expanded PRO entitlement checks
- Additional analytics and retention tooling

## Releases
- Changelog: [`CHANGELOG.md`](./CHANGELOG.md)
- GitHub metadata and release-prep guidance: [`docs/github-metadata.md`](./docs/github-metadata.md)
- GitHub release draft for `1.2.0-beta`: [`docs/release-1.2.0-beta.md`](./docs/release-1.2.0-beta.md)
- Use semantic versioning for user-visible and deployment-relevant changes.

## License
No final license text is committed yet.
Before publishing a formal open-source release, choose a license and add a root `LICENSE` file.
See [`LICENSE-CHOICE.md`](./LICENSE-CHOICE.md).
