# API для E-commerce Проєкту

Цей документ описує API для бекенду e-commerce додатку. API надає функціонал для роботи з продуктами, категоріями та автентифікацією користувачів.

---

## API Ендпоїнти

### Автентифікація

---

#### `POST /api/register`

```
https://online-market-api-eight.vercel.app/api/register
```

Реєструє нового користувача в системі.

**Опис:** Створює новий запис користувача в базі даних. Пароль хешується перед збереженням.

**Тіло запиту (Request Body):**

```json
{
  "username": "exampleUser",
  "email": "user@example.com",
  "password": "yourpassword123"
}
```

**Успішна відповідь (`201 Created`):** Повертає створений об'єкт користувача (без пароля).

```json
{
  "result": {
    "username": "exampleUser",
    "email": "user@example.com",
    "bucketProducts": [],
    "savedProducts": [],
    "reviews": [], 
    "_id": "60d0fe4f5311236168a109ca",
    "createdAt": "2025-10-20T10:00:00.000Z",
    "updatedAt": "2025-10-20T10:00:00.000Z"
  }
}
```

**Помилки:**
* `400 Bad Request`: `{"message": "User already exists"}` - якщо користувач з такою електронною поштою вже існує.

---

#### `POST /api/login`

```
https://online-market-api-eight.vercel.app/api/login
```

Автентифікує користувача та повертає JWT токен.

**Опис:** Перевіряє надані `email` та `password`. У разі успіху генерує `accessToken` та повертає дані користувача.

**Тіло запиту (Request Body):**

```json
{
  "email": "user@example.com",
  "password": "yourpassword123"
}
```

**Успішна відповідь (`200 OK`):**

```json
{
  "accessToken": "your.jwt.token",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "username": "exampleUser",
    "email": "user@example.com",
    "bucketProducts": [
      // populated product items      
    ],
    "savedProducts": [      
      // populated product items
    ],
    "reviews": [
      //populated review item
    ] 
  }
}
```

**Помилки:**
* `404 Not Found`: `{"message": "User not found"}` - якщо користувача з такою поштою не знайдено.
* `400 Bad Request`: `{"message": "Invalid credentials"}` - якщо пароль невірний.

---

#### `GET /api`

```
https://online-market-api-eight.vercel.app/api
```

Отримує дані поточного автентифікованого користувача. **Потребує авторизації.**

**Опис:** Перевіряє JWT токен з заголовка `Authorization` і повертає повну інформацію про користувача, включаючи товари в кошику та збережені товари.

**Заголовки (Headers):**

```
Authorization: Bearer your.jwt.token
```

**Успішна відповідь (`200 OK`):**

```json
{
  "_id": "60d0fe4f5311236168a109ca",
  "username": "exampleUser",
  "email": "user@example.com",
  "bucketProducts": [
    // populated product items
  ],
  "savedProducts": [
    // populated product items
  ],
  "reviews": [
    //populated review item
  ]
}
```

**Помилки:**
* `401 Unauthorized`: Якщо токен відсутній, недійсний або термін його дії закінчився.

---

### Продукти

---

#### `GET /api/products`

```
https://online-market-api-eight.vercel.app/api/products
```

Отримує список продуктів з можливістю фільтрації та пагінації.

**Опис:** Повертає масив продуктів та загальну кількість продуктів, що відповідають критеріям фільтрації.

**Параметри запиту (Query Parameters):**
* `page` (необов'язково): Номер сторінки. За замовчуванням `1`.
* `limit` (необов'язково): Кількість елементів на сторінці. За замовчуванням `20`.
* `title` (необов'язково): Пошук за назвою продукту (нечутливий до регістру).
* `categorySlug` (необов'язково): Фільтрація за "слагом" категорії (наприклад, `electronics`).

**Приклад запиту:** `/api/products?page=1&limit=10&categorySlug=electronics`

**Успішна відповідь (`200 OK`):**

```json
{
  "data": [
    {
      "_id": "60d0fe4f5311236168a109cb",
      "title": "Smartphone",
      "slug": "smartphone",
      "price": 699.99,
      "description": "A fantastic new smartphone.",
      "category": {
        "_id": "60d0fe4f5311236168a109cc",
        "name": "Electronics",
        "slug": "electronics"
      },
      "images": ["url-to-image1.jpg", "url-to-image2.jpg"],
      "reviews": [
        //populated review item
      ]
    }
  ],
  "totalCount": 150
}
```

---

### Категорії

---

#### `GET /api/categories`

```
https://online-market-api-eight.vercel.app/api/categories
```

Отримує список всіх категорій.

**Опис:** Повертає масив всіх доступних категорій, відсортованих за назвою в алфавітному порядку.
**Успішна відповідь (`200 OK`):**

```json
[
  {
    "_id": "60d0fe4f5311236168a109cd",
    "name": "Books",
    "slug": "books"
  },
  {
    "_id": "60d0fe4f5311236168a109cc",
    "name": "Electronics",
    "slug": "electronics"
  }
]
```
  

---

### Відгуки

---

#### `POST /api/reviews`

```
https://online-market-api-eight.vercel.app/api/reviews
```

Створює новий відгук до продукту. **Потребує авторизації.**

**Опис:** Створює новий запис відгуку в базі даних, прив'язаний до продукту та поточного користувача. Також додає ID цього відгуку до списку відгуків користувача.
**Заголовки (Headers):**

```
Authorization: Bearer your.jwt.token
```
**Тіло запиту (Request Body):**

```json
{
  "product": "60d0fe4f5311236168a109ca",
  "rate": 5,
  "text": "Це найкращий продукт, який я коли-небудь купував!"
}
```

**Успішна відповідь (`201 Created`):** Повертає повідомлення про успіх та створений об'єкт відгуку.

```json
{
  "_id": "60d0ff4f5311236168a109cc",
  "message": "Review successfully created",
  "review": {
  "user": "60d0fe4f5311236168a109cb",
  "product": "60d0fe4f5311236168a109ca",
  "rate": 5,
  "text": "Це найкращий продукт, який я коли-небудь купував!",
  "addedAt": "2025-10-20T10:30:00.000Z"
  }
}
```
  
**Помилки:**
  * `400 Bad Request`: `{"message": "Помилка валідації..."}` якщо тіло запиту не відповідає схемі (`reviewSchema`)..
  * `401 Unauthorized`: `{"message": "Not authorized"}` Якщо токен відсутній, недійсний або термін його дії закінчився.

---

`PUT /api/reviews/:id`

```
https://online-market-api-eight.vercel.app/api/reviews/:id
```

Оновлює існуючий відгук. **Потребує авторизації.**

**Опис:** Дозволяє користувачу оновити `rate` або `text` власного відгуку. Редагувати відгук може лише його автор.
**Заголовки (Headers):**

```
Authorization: Bearer your.jwt.token
```

**Тіло запиту (Request Body):**

```json
{
  "rate": 4,
  "text": "Оновлений текст відгуку. Все ще добре."
}
```

**Успішна відповідь (`200 OK`):** Повертає повідомлення про успіх та оновлений об'єкт відгуку.

```json
{
  "message": "Review successfully updated",
  "review": {
    "user": "66d0fe4f5311236168a109cb",
    "product": "60d0fe4f5311236168a109ca",
    "rate": 4,
    "text": "Оновлений текст відгуку. Все ще добре.",
    "_id": "60d0ff4f5311236168a109cc",
    "addedAt": "2025-10-20T10:35:00.000Z"
  }
}
```

**Помилки:**
  * `400 Bad Request`: `{"message": "Помилка валідації..."}` Якщо тіло запиту не відповідає схемі (`reviewUpdateSchema`)..
  * `401 Unauthorized`: `{"message": "Not authorized"}` Якщо токен відсутній, недійсний або термін його дії закінчився.
  * `403 Forbidden`: `{"message": "You are not allowed to edit this review"}` Якщо користувач намагається редагувати не свій відгук.
  * `404 Not Found`: `{"message": "Review not found"}` Якщо відгук із зазначеним `id` не знайдено.

---

`DELETE /api/reviews/:id`

```
https://online-market-api-eight.vercel.app/api/reviews/:id
```

Видаляє існуючий відгук. **Потребує авторизації.**

**Опис:** Дозволяє користувачу видалити власний відгук. Видалити відгук може лише його автор. Також видаляє ID цього відгуку з масиву `reviews` у профілі користувача та з масиву `reviews` у продукті.

**Заголовки (Headers):**

```
Authorization: Bearer your.jwt.token
```

**Параметри URL (URL Params)**
  * `id`: ID відгуку, який потрібно видалити

**Успішна відповідь (`200 OK`):** Повертає повідомлення про успіх та видалення об'єкту відгуку.
  ```json
  {
    "message": "Review successfully deleted"
  }
  ```
**Помилки:**
  * `401 Unauthorized`: `{"message": "Not authorized"}` Якщо токен відсутній, недійсний або термін його дії закінчився.
  * `403 Forbidden`: `{"message": "You are not allowed to delete this review"}` Якщо користувач намагається видалити не свій відгук.
  * `404 Not Found`: `{"message": "Review not found"}` Якщо відгук із зазначеним `id` не знайдено.

---

### Кошик

---
`POST /api/bucket/:id`

```
https://online-market-api-eight.vercel.app/api/bucket/:id
```

Додає продукт в кошик. **Потребує авторизації.**

**Опис:** Знаходить товар за `id` та додає його до масиву `bucketProducts` поточного користувача.

**Заголовки (Headers):**

```
Authorization: Bearer your.jwt.token
```
**Параметри URL (URL Params)**
* `id`: ID товару, який потрібно зберегти

**Успішна відповідь (`200 OK`):** Повертає повідомлення про успіх та оновлений об'єкт відгуку.

```json
{
  "message": "Product successfully saved",
  "item": {
    "_id": "68ecef877073892497ed962f",
    "title": "Wooden Puzzle Set",
    "slug": "wooden-puzzle-set",
    "price": 19.99,
    "description": "Eco-friendly wooden puzzle set that boosts creativity and problem-solving skills.",
    "category": "68ece8f5d83a6f63c6ec0f7c",
    "images": [
      "https://i.ibb.co/fkKKcHk/puzzle.jpg"
    ],
    "__v": 0,
    "reviews": []
  }
}
```

**Помилки:**
* `400 Bad Request`: `{ "message": "Product already in bucket"}` Якщо товар вже є в кошику.
* `401 Unauthorized`: `{"message": "Not authorized"}` Якщо токен відсутній, недійсний або термін його дії закінчився.
* `404 Not Found`: `{"message": "Product not found"}` Якщо товар із зазначеним `id` не знайдено.

---

`DELETE /api/bucket/:id`

```
https://online-market-api-eight.vercel.app/api/bucket/:id
```

Видаляє товар з кошика. **Потребує авторизації.**

**Опис:** Знаходить товар за `id` та видаляє його з масиву `bucketProducts` користувача.

**Заголовки (Headers):**

```
Authorization: Bearer your.jwt.token
```

**Параметри URL (URL Params)**
* `id`: ID товару, який потрібно видалити

**Успішна відповідь (`200 OK`):** Повертає повідомлення про успіх та видалення об'єкту з кошика.
  ```json
  {
  "message": "Bucket successfully deleted",
  "item": {
    "_id": "68ecef877073892497ed962f",
    "title": "Wooden Puzzle Set",
    "slug": "wooden-puzzle-set",
    "price": 19.99,
    "description": "Eco-friendly wooden puzzle set that boosts creativity and problem-solving skills.",
    "category": "68ece8f5d83a6f63c6ec0f7c",
    "images": [
      "https://i.ibb.co/fkKKcHk/puzzle.jpg"
    ],
    "__v": 0,
    "reviews": []
  }
}
  ```
**Помилки:**
* `401 Unauthorized`: `{"message": "Not authorized"}` Якщо токен відсутній, недійсний або термін його дії закінчився.
* `404 Not Found`: `{"message": "Product not found in bucket"}` Якщо товару немає в кошику.

---

### Збереження

---
`POST /api/favorite/:id`

```
https://online-market-api-eight.vercel.app/api/favorite/:id
```

Додає товар до списку обраних. **Потребує авторизації.**

**Опис:** Додає ID товару до масиву `savedProducts` користувача.

**Заголовки (Headers):**

```
Authorization: Bearer your.jwt.token
```
**Параметри URL (URL Params)**
* `id`: ID товару

**Успішна відповідь (`200 OK`):** Повертає повідомлення про успіх та оновлений об'єкт відгуку.

```json
{
  "message": "Product successfully saved",
  "itemId": {
    "_id": "68ecef877073892497ed962f",
    "title": "Wooden Puzzle Set",
    "slug": "wooden-puzzle-set",
    "price": 19.99,
    "description": "Eco-friendly wooden puzzle set that boosts creativity and problem-solving skills.",
    "category": "68ece8f5d83a6f63c6ec0f7c",
    "images": [
      "https://i.ibb.co/fkKKcHk/puzzle.jpg"
    ],
    "__v": 0,
    "reviews": []
  }
}
```

**Помилки:**
* `400 Bad Request`: `{ "message": "Product already in favorites"}` Якщо товар вже збережений.
* `401 Unauthorized`: `{"message": "Not authorized"}` Якщо токен відсутній, недійсний або термін його дії закінчився.
* `404 Not Found`: `{"message": "Product not found"}` Якщо товар із зазначеним `id` не знайдено.

---

`DELETE /api/favorite/:id`

```
https://online-market-api-eight.vercel.app/api/favorite/:id
```

Видаляє товар зі списку обраних. **Потребує авторизації.**

**Опис:** Знаходить товар за `id` та видаляє його з масиву `savedProducts` користувача.

**Заголовки (Headers):**

```
Authorization: Bearer your.jwt.token
```

**Параметри URL (URL Params)**
* `id`: ID товару, який потрібно видалити

**Успішна відповідь (`200 OK`):** Повертає повідомлення про успіх та видалення об'єкту з кошика.
```json
{
  "message": "Favorite successfully deleted",
  "itemId": {
    "_id": "68ecef877073892497ed962f",
    "title": "Wooden Puzzle Set",
    "slug": "wooden-puzzle-set",
    "price": 19.99,
    "description": "Eco-friendly wooden puzzle set that boosts creativity and problem-solving skills.",
    "category": "68ece8f5d83a6f63c6ec0f7c",
    "images": [
      "https://i.ibb.co/fkKKcHk/puzzle.jpg"
    ],
    "__v": 0,
    "reviews": []
  }
}
```
**Помилки:**
* `401 Unauthorized`: `{"message": "Not authorized"}` Якщо токен відсутній, недійсний або термін його дії закінчився.
* `404 Not Found`: `{"message": "Product not found in favorites"}` Якщо товару немає в збережених.

---

### Купівля

---
`PUT /api/buy/all`

```
https://online-market-api-eight.vercel.app/api/buy/all
```

Купує всі товари з кошика. **Потребує авторизації.**

**Опис:** Створює нове замовлення з усіма товарами з кошика, додає його в історію замовлень `ordersHistory` та повністю очищує кошик `bucketProducts`.

**Заголовки (Headers):**

```
Authorization: Bearer your.jwt.token
```

**Успішна відповідь (`200 OK`):** Повертає повідомлення про успіх та оновлений об'єкт відгуку.

```json
{
  "message": "Order successfully created",
  "order": {
    "items": [
      {
        "_id": "68ecef877073892497ed962f",
        "title": "Wooden Puzzle Set",
        "slug": "wooden-puzzle-set",
        "price": 19.99,
        "description": "Eco-friendly wooden puzzle set that boosts creativity and problem-solving skills.",
        "category": "68ece8f5d83a6f63c6ec0f7c",
        "images": [
          "https://i.ibb.co/fkKKcHk/puzzle.jpg"
        ],
        "__v": 0,
        "reviews": []
      },
      {
        "_id": "68ecef877073892497ed9634",
        "title": "Men’s Denim Jacket",
        "slug": "mens-denim-jacket",
        "price": 69,
        "description": "Classic denim jacket with a modern fit and soft lining for comfort.",
        "category": "68ece8f5d83a6f63c6ec0f77",
        "images": [
          "https://i.ibb.co/mFZk2T2/denim-jacket.jpg"
        ],
        "__v": 0,
        "reviews": []
      }
    ],
    "addedAt": "2025-10-27T09:23:31.320Z"
  }
}
```

**Помилки:**
* `400 Bad Request`: `{ "message": "Bucket is empty"}` Якщо кошик порожній..
* `401 Unauthorized`: `{"message": "Not authorized"}` Якщо токен відсутній, недійсний або термін його дії закінчився.
---

`PUT /api/buy/:id`

```
https://online-market-api-eight.vercel.app/api/buy/:id
```

Купує один конкретний товар з кошика. **Потребує авторизації.**

**Опис:** Створює замовлення з одним вказаним товаром, додає його до історії замовлень та видаляє цей товар з кошика.

**Заголовки (Headers):**

```
Authorization: Bearer your.jwt.token
```

**Параметри URL (URL Params)**
* `id`: ID товару

**Успішна відповідь (`200 OK`):** Повертає повідомлення про успіх та видалення об'єкту з кошика.
```json
{
  "message": "Order successfully created",
  "order": {
    "items": "68ecef877073892497ed9634",
    "addedAt": "2025-10-27T09:28:32.010Z"
  }
}
```
**Помилки:**
* `401 Unauthorized`: `{"message": "Not authorized"}` Якщо токен відсутній, недійсний або термін його дії закінчився.
* `404 Not Found`: `{"message": "Product not found in user's bucket"}` Якщо товару з таким `id` немає в кошику.

---