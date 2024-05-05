const myLibrary = [];
const table = document.getElementById("table");
const dialog = document.querySelector("dialog");
const addButton = document.getElementById("add-book");
const submitButton = document.getElementById("submit");

submitButton.onclick = addBookToLibrary;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
  let newBookTitle = document.getElementById("title");
  let newBookAuthor = document.getElementById("author");
  let newBookPages = document.getElementById("pages");
  let newBookRead = document.getElementById("read");
  let newBook = new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead);
  myLibrary.push(newBook);
}

function displayBook() {
  for (let i = 0; i < myLibrary.length; i++) {
    let row = table.insertRow(i + 1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    cell1.innerHTML = myLibrary[i].title;
    cell2.innerHTML = myLibrary[i].author;
    cell3.innerHTML = myLibrary[i].pages;
    cell4.innerHTML = myLibrary[i].read;
  }
}

addButton.addEventListener("click", () => {
  dialog.showModal();
});

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
});
