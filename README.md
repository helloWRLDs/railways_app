# Railways Task

## Required
- Docker Engine или Docker Desktop

## Run 
```bash
docker-compose up -d --build
```

## API Reference

### Вопросы и ответы
|Метод   |URL                  |Описание                          |Параметры | 
|:-------|:--------------------|:---------------------------------|:---------|
|`GET`   |/polls/{id}          |Получить вопрос по ID             |`id`      |
|`POST`  |/polls               |Создать новый вопрос              |          |
|`GET`   |/polls/responses     |Получить все ответы на все вопросы|          |
|`GET`   |/polls/{id}/responses|Получить ответы на вопрос по ID   |          |
|`DELETE`|
### Пользователи
|Метод   |URL        | Описание |Параметры|
|:-------|:----------|:---------|:--------|
|`GET`   |/users     |
|`GET`   |/users/{id}|
|`POST`  |/users     |
|`DELETE`|/users/{id}|
|`PUT`   |/users/{id}|
### Авторизация
|Метод   |URL        | Описание  |Параметры|
|:-------|:----------|:----------|:--------|
|`POST`  |/auth/login|Логин      |         |


### Получить ответ на определенный вопрос
```http
GET /polls/${id}/responses
```
| Параметр  | Тип     | Описание                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of item to fetch |


