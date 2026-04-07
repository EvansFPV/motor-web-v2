# GitHub Metadata Recommendations

Use this file as copy-ready guidance when configuring the public GitHub repository.

## Repository Description
MotorLab is a browser-based BLDC winding and magnet design tool with visualization, engineering checks, PWA support, and optional Supabase cloud sync.

## Website Field
- If deployed: set to your production URL (for example `https://motortool.example.com`).
- If not deployed yet: leave blank until a stable public URL exists.

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
`v1.1.0-beta - Public Beta`

### Tag
`v1.1.0-beta`

### Release Notes Draft
```markdown
## MotorLab v1.1.0-beta

Public beta release of MotorLab focused on stability, UX polish, and release-readiness.

### Highlights
- Stable winding scheme calculator (slots/poles + schema mode)
- Winding visualization, engineering assessment, and scheme comparison
- Magnet advisor with coverage/width recommendation and warning groups
- Save/load history, presets, JSON/CSV export, and share link
- Mobile-friendly PWA behavior with install/offline shell support
- Optional Supabase auth/cloud project hooks while preserving guest mode

### In This Beta
- Dark-theme readability and UI consistency improvements
- Advanced controls visual polish and card-layout stabilization
- Improved table-to-calculation scheme handling with safer fallback behavior
- Release metadata/docs aligned for public GitHub publication

### Notes
- Core calculation logic is intentionally preserved.
- Supabase setup is optional; guest mode works without backend.
- This is a beta release intended for community testing and fast iteration.
```

## Release Checklist
1. Confirm selected open-source license and commit root `LICENSE` file.
2. Confirm README reflects current production/demo URL state.
3. Create tag `v1.1.0-beta` from the intended release commit.
4. Publish GitHub Release using the notes draft above.

---

# Рекомендации по GitHub-метаданным

Используйте этот файл как готовую памятку при настройке публичного репозитория.

## Описание репозитория
MotorLab — веб-инструмент для проектирования BLDC-двигателей: обмотки, визуализация, инженерные проверки, PWA и опциональная облачная синхронизация через Supabase.

## Поле Website
- Если есть стабильный прод-URL — укажите его.
- Если ещё нет стабильного домена — оставьте поле пустым до публикации.

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

## Чеклист релиза
1. Выбрать финальную лицензию и добавить файл `LICENSE`.
2. Проверить актуальность README (URL, статус, инструкции).
3. Создать tag релиза (например, `v1.1.0-beta`).
4. Опубликовать GitHub Release с заметками изменений.
