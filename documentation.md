# API Documentation

Hi this is a REST API built by Sanju ( 20JE0855)

## Endpoints

### Get all books

- **Endpoint URL:** `/api/books`
- **Description:** Get the list of all the books in the Database.
- **Request Method:** `GET`
- **Response Format:** JSON

---

### Add a Book

- **Endpoint URL:** `/api/books`
- **Description:** Add a book.
- **Request Method:** `POST`
- **Response Format:** JSON


---


### Update the details of a book

- **Endpoint URL:** `/api/books/:book_id`
- **Description:** Update the details of the book corresponding to the book_id.
- **Request Method:** `PUT`
- **Response Format:** JSON

---

### Sample POST request

`{
  "id": 6,
  "title": "New Book",
  "author": "New Author",
  "price": 39.99
}
`
