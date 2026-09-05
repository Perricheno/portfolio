# CV — личный сайт-резюме

Минималистичный сайт-резюме на React + TypeScript + Vite + Tailwind CSS, с переключателем языка (RU/EN) и плавными анимациями (Framer Motion).

## Структура контента

Весь текст резюме лежит в одном месте — [src/data/content.ts](src/data/content.ts): имя, роль, «Обо мне», опыт, образование, сертификаты, навыки, проекты. Правьте оба блока (`ru` и `en`) — переключатель языка в шапке сайта работает автоматически.

Ссылки на соцсети (GitHub, LinkedIn, Telegram, Email) настраиваются отдельно в [src/data/socials.ts](src/data/socials.ts) — просто добавьте или удалите элемент массива, ничего больше менять не нужно.

Резюме в PDF (кнопка «Скачать резюме») должно лежать в `public/resume.pdf`.

## Разработка

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build   # tsc + vite build -> dist/
npm run preview # локальный просмотр собранной версии
```

## Деплой на Cloudflare Workers

Сайт настроен на деплой как статический сайт через Workers Static Assets (см. `wrangler.jsonc`).

```bash
npx wrangler login   # один раз, авторизация в Cloudflare
npm run deploy        # сборка + wrangler deploy
```

Локальный предпросмотр в среде Workers:

```bash
npm run cf:dev
```

При необходимости поменяйте `name` в `wrangler.jsonc` — это станет частью адреса `*.workers.dev` и/или используется при привязке своего домена.
