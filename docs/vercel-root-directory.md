# Vercel Root Directory Fix (iPhone Icon / Manifest)

If iPhone **Add to Home Screen** shows a blank/dark icon, the most common cause is deployment root mismatch.

## Symptom
- App is in a subfolder (e.g. `motor web v2/`), but Vercel project root is repository root.
- Root-relative paths like `/icons/apple-touch-icon.png` and `/manifest.json` resolve to wrong location and return 404.

## Required Vercel setting
1. Open **Vercel → Project → Settings → General**.
2. Set **Root Directory** based on your repo layout:
   - `index.html` is in repo root → Root Directory should be empty (or `.`).
   - app is in subfolder (example: `motor web v2`) → set Root Directory to that folder.
3. Redeploy.

## Why this works
The app assumes domain-root asset URLs:
- `/icons/favicon-16.png`
- `/icons/favicon-32.png`
- `/icons/apple-touch-icon.png`
- `/manifest.json`

Those URLs work only when Vercel serves the app folder as deployment root.

## Verify after deploy
Open these URLs directly and confirm HTTP 200:
- `/icons/apple-touch-icon.png`
- `/icons/favicon-16.png`
- `/icons/favicon-32.png`
- `/manifest.json`

Then on iPhone:
1. Remove existing home-screen shortcut.
2. (Optional) Clear Safari website cache.
3. Add to Home Screen again.
4. Confirm icon updates.

---

# Исправление Root Directory на Vercel (иконка iPhone / Manifest)

Если при **Добавлении на экран Домой** в iPhone иконка тёмная/пустая, чаще всего причина — неверный deployment root.

## Симптом
- Приложение лежит в подпапке (например, `motor web v2/`), а Vercel смотрит в корень репозитория.
- URL вида `/icons/apple-touch-icon.png` и `/manifest.json` отдают 404 или не тот файл.

## Что поставить в Vercel
1. Откройте **Vercel → Project → Settings → General**.
2. Установите **Root Directory** по структуре репозитория:
   - если `index.html` лежит в корне — Root Directory должен быть пустым (или `.`);
   - если приложение лежит в подпапке (пример: `motor web v2`) — укажите эту подпапку.
3. Сделайте redeploy.

## Проверка
Откройте и убедитесь в HTTP 200:
- `/icons/apple-touch-icon.png`
- `/icons/favicon-16.png`
- `/icons/favicon-32.png`
- `/manifest.json`

Далее на iPhone:
1. Удалите старый ярлык с Home Screen.
2. При необходимости очистите кэш Safari.
3. Снова добавьте сайт на Home Screen.
4. Проверьте, что иконка обновилась.
