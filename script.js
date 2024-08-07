const myLibrary = [];
const tableBody = document.querySelector("tbody");
const dialog = document.querySelector("dialog");
const addButton = document.getElementById("add-book");
const submitForm = document.querySelector("form");
let newBookTitle = document.getElementById("title");
let newBookAuthor = document.getElementById("author");
let newBookPages = document.getElementById("pages");
let newBookRead = document.getElementById("read");

addButton.addEventListener("click", () => {
  dialog.showModal();
});

submitForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
  dialog.close();
});

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary() {
  let newBook = new Book(newBookTitle.value, newBookAuthor.value, newBookPages.value, newBookRead.checked);
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
    if (myLibrary[i].read) {
      cell4.innerHTML = "<button onclick=\"readStatus(this)\" class=\"read\">Read</button>";
    } else {
      cell4.innerHTML = "<button onclick=\"readStatus(this)\" class=\"unread\">Not Read</button>";
    }
    cell5.innerHTML = "<button onclick=\"deleteItem(this)\" class=\"remove\">Remove</button>";
  }
}

function deleteItem(btn) {
  const parentID = btn.closest("tr").dataset.id;
  myLibrary.splice(parentID, 1);
  displayBook();
}

function readStatus(btn) {
  const parentID = btn.closest("tr").dataset.id;
  if(myLibrary[parentID].read) {
    myLibrary[parentID].read = false;
    btn.setAttribute("class", "unread");
    btn.innerHTML = "Not Read";
  } else {
    myLibrary[parentID].read = true;
    btn.setAttribute("class", "read");
    btn.innerHTML = "Read";
  }
}