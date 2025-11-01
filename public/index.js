const express = require("express");
const app = express();

document.getElementById('sellBookForm').addEventListener('submit', function(e) {
  e.preventDefault();
  fetch('http://localhost:3000/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: document.getElementById('title').value,
      price: document.getElementById('price').value,
      img: document.getElementById('img').value
    })
  })
  .then(res => res.json())
  .then(book => {
    alert('Book added!');
    // Optionally, refresh the book list here
  });
});

function loadBooks() {
  fetch('http://localhost:3000/api/books')
    .then(res => res.json())
    .then(books => {
      const bookList = document.getElementById("book-list");
      bookList.innerHTML = "";
      books.forEach(book => {
        const div = document.createElement("div");
        div.classList.add("book-card");
        div.innerHTML = `
          <img src="${book.img}" alt="${book.title}">
          <div class="book-title">${book.title}</div>
          <div class="book-price">₹${book.price}</div>
        `;
        bookList.appendChild(div);
      });
    });
}
// Load books on page load
window.onload = loadBooks;