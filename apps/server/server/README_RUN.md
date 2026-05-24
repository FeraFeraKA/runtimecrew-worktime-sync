# Запуск проекта

Проект переведён на UUID и настроен так, чтобы не подключаться к старой локальной базе PostgreSQL на `localhost:5432`.

## Запуск через Docker Compose

```bash
docker compose down -v --remove-orphans
docker compose up --build
```

Backend будет доступен на:

```text
http://localhost:8080
```

PostgreSQL внутри Docker доступен для локального запуска backend из IntelliJ на:

```text
localhost:5433
```

Данные подключения:

```text
Database: crew_db
Username: crew_user
Password: crew_password
```

## Запуск backend из IntelliJ

Сначала запусти только базу:

```bash
docker compose up database
```

Потом запускай Spring Boot приложение из IntelliJ. В `application.properties` уже указаны правильные локальные параметры:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5433/crew_db
spring.datasource.username=crew_user
spring.datasource.password=crew_password
```

## Почему раньше была ошибка

Ошибка вида:

```text
Пользователь "postgres" не прошёл проверку подлинности по паролю
```

появлялась потому, что приложение подключалось под пользователем `postgres` к старой базе или старому Docker volume, где пароль отличался от пароля в проекте. В новой версии используется отдельный пользователь `crew_user`, отдельный пароль `crew_password`, отдельный volume `crew_uuid_postgres_data` и порт `5433`, чтобы не конфликтовать со старым PostgreSQL.
