# Cleaning Service - Сервис Клининговых Услуг, инструмент для персонала 🧹

## 🚀 Технологии

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- NextAuth.js
- Stripe (для платежей)

## 📋 Функциональность

- Аутентификация пользователей
- Бронирование услуг
- Онлайн оплата
- Управление профилем
- Административная панель
- Отслеживание статуса заказов
- Отзывы и рейтинги

## 🛠 Установка и Запуск

### Предварительные требования

- Node.js (версия 18.18.0 или выше)
- npm или yarn

### Шаги установки

1. Клонируйте репозиторий:
```bash
git clone https://github.com/Frontedward/cleaning-service.git
cd cleaning-service
```

2. Установите зависимости:
```bash
npm install
# или
yarn install
```

3. Создайте файл `.env` и настройте переменные окружения:
```env
NEXTAUTH_SECRET="your-secret"
STRIPE_SECRET_KEY="your-stripe-secret"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
```

4. Запустите приложение:
```bash
npm run dev
# или
yarn dev
```

Приложение будет доступно по адресу: `http://localhost:3000`

## 🌐 Структура проекта

```
src/
├── components/             # Компоненты приложения
│   ├── ActiveRequestCard.tsx
│   ├── GeneralRequestCard.tsx
│   ├── MyRequestCard.tsx
│   ├── RequestCard.tsx
│   ├── Sidebar.tsx
│   └── StatusBadge.tsx
├── context/               # Контекст React
│   └── CleaningContext.tsx
├── data/                 # Данные приложения
│   └── mockData.ts
├── pages/                # Страницы приложения
│   ├── Dashboard.tsx
│   ├── RequestDetails.tsx
│   └── Settings.tsx
├── types/                # TypeScript типы
│   └── index.ts
├── App.tsx              # Корневой компонент
├── App.css              # Стили приложения
├── index.css            # Глобальные стили
├── main.tsx             # Точка входа
└── vite-env.d.ts        # Объявления типов Vite
```

## 🔒 Безопасность

- Используется NextAuth.js для безопасной аутентификации
- Все платежные операции проходят через защищенный API Stripe
- Применяется шифрование чувствительных данных
- Реализована защита от CSRF-атак

## 📱 Адаптивный дизайн

Приложение полностью адаптивно и корректно отображается на:
- Десктопах
- Планшетах
- Мобильных устройствах

## 🤝 Вклад в проект

Мы приветствуем вклад в развитие проекта! Пожалуйста, создавайте issue или pull request для предложения изменений.
