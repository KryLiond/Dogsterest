# Dogsterest-backend

# Структура проекта

```
└── 📁src
    └── 📁controllers
        ├── dog.controller.ts
    └── 📁routes
        ├── dog.router.ts
    └── 📁services
        ├── dog.service.ts
    └── index.ts
```

# Развертывание в Docker

Соберите Docker-образ: `docker build -t dogsterest-backend .`

Запустите контейнер: `docker run -p 4200:4200 dogsterest-backend`

# API Endpoints

- `GET /dog/:fileName` - получить по имени один файл
- `GET /dogs` - получить массив файлов с пагинацией. Query параметры — page, count
