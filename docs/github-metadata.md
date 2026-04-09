# Рекомендации по GitHub-метаданным

Используйте этот файл как готовую памятку при настройке публичного репозитория на GitHub.

## Описание репозитория
MotorLab — браузерный инструмент для расчёта BLDC-обмоток и подбора магнитов с визуализацией, инженерными проверками, PWA-поддержкой и опциональной облачной синхронизацией через Supabase.

## Поле Website
- Если приложение уже опубликовано, укажите production URL, например `https://motortool.example.com`.
- Если стабильного публичного адреса ещё нет, оставьте поле пустым до публикации.

## Рекомендуемые Topics
- `bldc`
- `electric-motor`
- `motor-design`
- `winding`
- `calculator`
- `pwa`
- `supabase`
- `javascript`
- `engineering-tools`
- `offline-first`

## Рекомендация для текущего beta-релиза

### Заголовок
`v1.2.0-beta - Russian-First Docs Beta`

### Tag
`v1.2.0-beta`

### Черновик заметок к релизу
```markdown
## MotorLab v1.2.0-beta

Beta-релиз, посвящённый полной русификации документации, обновлению release-материалов и синхронизации инструкций по публикации.

### Основное
- Калькулятор схем обмотки (пазы/полюса + ручной режим схемы)
- Визуализация намотки, инженерная оценка и сравнение схем
- Советник по магнитам с рекомендациями по покрытию и ширине
- История, пресеты, экспорт JSON/CSV и share-ссылка
- PWA-поведение с установкой и офлайн-оболочкой
- Опциональные hooks для Supabase при сохранении гостевого режима

### Что обновлено в этой beta-версии
- Вся основная документация переведена на русский язык
- Во всех ключевых документах русская версия перенесена в начало
- README, GitHub metadata и release notes синхронизированы по версии `1.2.0-beta`
- Инструкции по Vercel и лицензированию приведены к единому формату

### Примечания
- Расчётная логика приложения намеренно не менялась.
- Настройка Supabase остаётся опциональной; гостевой режим работает без backend.
- Релиз ориентирован на быструю проверку и подготовку к публичной публикации.
```

## Чеклист релиза
1. Выбрать итоговую open-source лицензию и добавить файл `LICENSE` в корень.
2. Проверить, что `README.md` содержит актуальные URL, статус и инструкции.
3. Создать tag `v1.2.0-beta` из нужного коммита.
4. Опубликовать GitHub Release, используя черновик выше.

---

# GitHub Metadata Recommendations

Use this file as copy-ready guidance when configuring the public GitHub repository.

## Repository Description
MotorLab is a browser-based BLDC winding and magnet design tool with visualization, engineering checks, PWA support, and optional Supabase cloud sync.

## Website Field
- If deployed, set it to your production URL (for example `https://motortool.example.com`).
- If not deployed yet, leave it blank until a stable public URL exists.

## Recommended Topics
- `bldc`
- `electric-motor`
- `motor-design`
- `winding`
- `calculator`
- `pwa`
- `supabase`
- `javascript`
- `engineering-tools`
- `offline-first`

## Current Beta Release Recommendation

### Title
`v1.2.0-beta - Russian-First Docs Beta`

### Tag
`v1.2.0-beta`

### Release Notes Draft
```markdown
## MotorLab v1.2.0-beta

Beta release focused on full Russian localization of the documentation, refreshed release materials, and aligned publishing guidance.

### Highlights
- Winding scheme calculator (slots/poles + manual schema mode)
- Winding visualization, engineering assessment, and scheme comparison
- Magnet advisor with coverage and width recommendations
- Save/load history, presets, JSON/CSV export, and share link
- Mobile-friendly PWA behavior with install/offline shell support
- Optional Supabase hooks while preserving guest mode

### What's Updated In This Beta
- All primary documentation translated to Russian
- Russian-first ordering across key markdown documents
- README, GitHub metadata, and release notes aligned to `1.2.0-beta`
- Vercel and licensing guidance normalized into one bilingual format

### Notes
- Core calculation logic is intentionally unchanged.
- Supabase setup is optional; guest mode works without backend.
- This release is intended for quick validation and public-release preparation.
```

## Release Checklist
1. Confirm the selected open-source license and commit a root `LICENSE` file.
2. Confirm `README.md` reflects the current production/demo URL state.
3. Create tag `v1.2.0-beta` from the intended release commit.
4. Publish the GitHub Release using the notes draft above.
