const myLibrary = [];
const tableBody = document.querySelector("tbody");
const dialog = document.querySelector("dialog");
const addButton = document.getElementById("add-book");
const submitButton = document.getElementById("submit");
let newBookTitle = document.getElementById("title");
let newBookAuthor = document.getElementById("author");
let newBookPages = document.getElementById("pages");
let newBookRead = document.getElementById("read");
let removeButton = document.getElementsByClassName("remove");

submitButton.onclick = addBookToLibrary;
removeButton.onclick = removeBook;

addButton.addEventListener("click", () => {
  dialog.showModal();
});

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  dialog.close();
});

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

function addBookToLibrary() {
  let newBook = new Book(newBookTitle.value, newBookAuthor.value, newBookPages.value, newBookRead.value, 0);
  myLibrary.push(newBook);
  newBookTitle.value = "";
  newBookAuthor.value = "";
  newBookPages.value = "";
  newBookRead.checked = false;
  displayBook();
}

function displayBook() {
  while (tableBody.hasChildNodes()) {
    tableBody.removeChild(tableBody.firstChild);
  }
  for (let i = 0; i < myLibrary.length; i++) {
    let row = tableBody.insertRow(i);
    row.dataset.id = `${i}`
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    cell1.innerHTML = myLibrary[i].title;
    cell2.innerHTML = myLibrary[i].author;
    cell3.innerHTML = myLibrary[i].pages;
    cell4.innerHTML = myLibrary[i].read;
    cell5.innerHTML = "<button class=\"remove\">Remove</button>";
    myLibrary[i].id = `${i}`;
  }
}

function removeBook(){
  let parent = removeButton.parentNode;
  parent.remove();
}