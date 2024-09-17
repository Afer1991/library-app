const myLibrary = [];
const tableBody = document.querySelector("tbody");
const dialog = document.querySelector("dialog");
const addButton = document.getElementById("add-book");
const submitForm = document.querySelector("form");
const newBookTitle = document.getElementById("title");
const newBookAuthor = document.getElementById("author");
const newBookPages = document.getElementById("pages");
const newBookRead = document.getElementById("read");
const titleSpan = document.getElementById("ttl-sp");
const authorSpan = document.getElementById("ath-sp");
const pgSpan = document.getElementById("pg-sp");

addButton.addEventListener("click", () => {
  dialog.showModal();
});

submitForm.addEventListener("submit", (e) => { 
  if (areInputsValid()) {
    e.preventDefault();
    addBookToLibrary();
    dialog.close();
  } else {
    e.preventDefault();
    checkValidity();
  };
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
  const newBook = new Book(newBookTitle.value, newBookAuthor.value, newBookPages.value, newBookRead.checked);
  myLibrary.push(newBook);
  newBookTitle.value = "";
  newBookAuthor.value = "";
  newBookPages.value = "";
  newBookRead.checked = false;
  displayBook();
};

function displayBook() {
  while (tableBody.hasChildNodes()) {
    tableBody.removeChild(tableBody.firstChild);
  }
  for (let i = 0; i < myLibrary.length; i++) {
    const row = tableBody.insertRow(i);
    row.dataset.id = `${i}`
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
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
};

function deleteItem(btn) {
  const parentID = btn.closest("tr").dataset.id;
  myLibrary.splice(parentID, 1);
  displayBook();
};

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
};

function areInputsValid() {
  if(newBookTitle.validity.valid && newBookAuthor.validity.valid && newBookPages.validity.valid ) {

    newBookTitle.style.border = "none";
    newBookAuthor.style.border = "none";
    newBookPages.style.border = "none";

    titleSpan.textContent = "";
    authorSpan.textContent = "";
    pgSpan.textContent = "";

    return true;
  } else {
    return false;
  };
};

function checkValidity() {

  if (newBookTitle.validity.valid) {
    newBookTitle.style.border = "1px solid #6EEB83";
    titleSpan.textContent = "";
  } else {
    newBookTitle.style.border = "1px solid #FF312E";
    titleSpan.textContent = "Title is required";
  };
 
  if (newBookAuthor.validity.valid) {
    newBookAuthor.style.border = "1px solid #6EEB83";
    authorSpan.textContent = "";
  } else {
    newBookAuthor.style.border = "1px solid #FF312E";
    authorSpan.textContent = "Author is required";
  };
  
  if (newBookPages.validity.valid) {
    newBookPages.style.border = "1px solid #6EEB83";
    pgSpan.textContent = "";
  } else if (newBookPages.validity.rangeUnderflow) {
    newBookPages.style.border = "1px solid #FF312E";
    pgSpan.textContent = "Number of pages must be greater than 0";
  } else if (newBookPages.validity.valueMissing) {
    newBookPages.style.border = "1px solid #FF312E";
    pgSpan.textContent = "Number of pages is required";
  };

};