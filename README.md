# Тестовое задание - Форма расчета цены

Vue 3 приложение для тестового задания с формой расчета цены, localStorage и журналом событий.

## Функциональность

- **Поля ввода**: Цена, Количество, Сумма
- **Автоматический пересчет**: При изменении любого поля остальные пересчитываются автоматически
- **Debounce**: Задержка 300ms для полей ввода
- **Сохранение в localStorage**: С задержкой 1 секунда (имитация backend)
- **Логика успешности**: Данные сохраняются только если сумма четная
- **Журнал событий**: Отображение всех событий в реальном времени
- **Счетчик**: Монотонно возрастающий номер для каждого сохранения

## Технологии

- Vue 3 (Composition API)
- TypeScript
- Vite
- GitHub Pages

## Требования

- Node.js 20+ (рекомендуется 20.19+ или 22.12+)
- npm

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview
```

## Деплой

### Автоматический деплой на GitHub Pages

1. **Настройка репозитория:**
   - Перейдите в Settings → Pages
   - В разделе "Source" выберите "GitHub Actions"

2. **Три варианта workflow:**
   - `deploy-gh-pages.yml` - официальный GitHub Actions workflow (рекомендуется)
   - `deploy-simple.yml` - упрощенный workflow с peaceiris/actions-gh-pages
   - `deploy-pat.yml` - workflow с Personal Access Token (требует настройки PAT)

3. **Запуск деплоя:**
   - При пуше в ветку `main` автоматически запустится деплой
   - Или запустите вручную через Actions → Deploy to GitHub Pages

4. **Настройка PAT токена (для deploy-pat.yml):**
   - Перейдите в Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Создайте новый токен с правами: `repo`, `workflow`, `write:packages`
   - Добавьте токен в Secrets репозитория как `PAT_TOKEN`

5. **Результат:**
   - Приложение будет доступно по адресу: `https://[username].github.io/test-applied-logistics/`

## Структура проекта

```
src/
├── components/
│   ├── PriceForm.vue      # Основная форма
│   └── EventLog.vue       # Журнал событий
├── composables/
│   ├── useEventLogger.ts  # Логирование событий
│   └── useLocalStorage.ts # Работа с localStorage
└── App.vue               # Главный компонент
```