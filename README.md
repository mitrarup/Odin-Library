
# 📚 Book Library

A Book Library application built as part of **The Odin Project – JavaScript Path**.

This project focuses on managing application state using JavaScript objects and keeping the UI in sync with that state through dynamic DOM updates.

---

## 🚀 Live Demo
👉 https://mitrarup.github.io/Odin-Library/

---

## ✨ Features
- Add books using a modal form
- Each book includes:
  - Title
  - Author
  - Number of pages
  - Read / Not Read status
- Toggle read status for each book
- Remove books from the library
- Books are assigned unique IDs using `crypto.randomUUID()`
- UI updates dynamically based on application state
- Uses event delegation for efficient event handling

---

## 🧩 How the App Works
- All books are stored in a `myLibrary` array
- Each book is an instance of the `Book` constructor
- A prototype method (`toggleStatus`) updates a book’s read status
- The UI is rendered using a `renderLibrary()` function, which:
  - Clears the previous UI
  - Rebuilds the DOM based on the current application state
- User interactions update the data first, then re-render the UI

---

## 🧠 Key Concepts Practiced
- Constructor functions and object instances
- Prototypes and shared methods
- Managing state with arrays
- DOM manipulation and dynamic rendering
- Event delegation for dynamically created elements
- Keeping data as the single source of truth
- Debugging event listener and state synchronization issues

---

## 🛠️ Built With
- HTML
- CSS
- Vanilla JavaScript (ES6+)

---

## 📂 Project Structure
├── index.html
├── style.css
├── script.js
└── README.md

---
## 📝 Notes
This project does not use localStorage. Data is reset on page refresh.