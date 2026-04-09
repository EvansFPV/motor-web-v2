# Исправление Root Directory на Vercel (иконка iPhone / manifest)

Если при **Добавлении на экран Домой** на iPhone иконка выглядит пустой, тёмной или не обновляется, чаще всего причина в том, что deployment root на Vercel не совпадает с фактическим расположением приложения.

## Симптом
- Приложение находится в подпапке, например `motor web v2/`, а проект Vercel настроен на корень репозитория.
- Корневые пути вроде `/icons/apple-touch-icon.png` и `/manifest.json` начинают вести не туда и возвращают `404`.

## Что нужно указать в Vercel
1. Откройте **Vercel → Project → Settings → General**.
2. Настройте **Root Directory** в соответствии со структурой репозитория:
   - если `index.html` лежит в корне репозитория, оставьте Root Directory пустым или укажите `.`;
   - если приложение лежит в подпапке, укажите именно эту подпапку.
3. Выполните redeploy.

## Почему это помогает
Приложение использует корневые URL ресурсов:
- `/icons/favicon-16.png`
- `/icons/favicon-32.png`
- `/icons/apple-touch-icon.png`
- `/manifest.json`

Они будут работать корректно только в том случае, если Vercel отдаёт именно папку приложения как корень деплоя.

## Проверка после деплоя
Откройте эти адреса напрямую и убедитесь, что сервер возвращает `HTTP 200`:
- `/icons/apple-touch-icon.png`
- `/icons/favicon-16.png`
- `/icons/favicon-32.png`
- `/manifest.json`

После этого на iPhone:
1. Удалите старый ярлык с домашнего экрана.
2. При необходимости очистите кэш сайта в Safari.
3. Снова выберите **Add to Home Screen**.
4. Убедитесь, что иконка обновилась.

---

# Vercel Root Directory Fix (iPhone Icon / Manifest)

If iPhone **Add to Home Screen** shows a blank, dark, or outdated icon, the most common cause is a deployment root mismatch on Vercel.

## Symptom
- The app lives in a subfolder, for example `motor web v2/`, while the Vercel project root points to the repository root.
- Root-relative paths such as `/icons/apple-touch-icon.png` and `/manifest.json` resolve to the wrong location and return `404`.

## Required Vercel Setting
1. Open **Vercel → Project → Settings → General**.
2. Set **Root Directory** based on your repository layout:
   - if `index.html` is in the repository root, keep Root Directory empty (or `.`);
   - if the app is inside a subfolder, set Root Directory to that subfolder.
3. Redeploy.

## Why This Works
The app assumes domain-root asset URLs:
- `/icons/favicon-16.png`
- `/icons/favicon-32.png`
- `/icons/apple-touch-icon.png`
- `/manifest.json`

Those URLs only work when Vercel serves the app folder as the deployment root.

## Verify After Deploy
Open these URLs directly and confirm `HTTP 200`:
- `/icons/apple-touch-icon.png`
- `/icons/favicon-16.png`
- `/icons/favicon-32.png`
- `/manifest.json`

Then on iPhone:
1. Remove the existing home-screen shortcut.
2. Optionally clear the Safari website cache.
3. Add the site to the home screen again.
4. Confirm that the icon is updated.
