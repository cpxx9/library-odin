let tempLibrary = [];
let myLibrary = [];
let libraryIndex = 0;

const cardGrid = document.querySelector(".book-card-area");
const showFormBtn = document.querySelector(".show-form");
const bookForm = document.querySelector("#bookForm");
const hideFormBtn = document.querySelector(".hide-form");
const addBookBtn = document.querySelector(".add-book");
const formInputs = document.querySelectorAll("#bookForm input");

const bookTitleV = document.querySelector("#bookTitle");
const bookAuthorV = document.querySelector("#bookAuthor");
const bookPagesV = document.querySelector("#bookPages");

const titleError = document.querySelector("#titleError");
const authorError = document.querySelector("#authorError");
const pagesError = document.querySelector("#pagesError");

if (localStorage.getItem("books") !== null) {
  tempLibrary = JSON.parse(localStorage.getItem("books"));
  displayBooks();
}

bookTitleV.addEventListener("input", (e) => {
  if (bookTitleV.validity.valid) {
    titleError.textContent = "";
    titleError.className = "error";
  } else {
    titleError.textContent = "Must have a title for the book.";
    titleError.className = "error active";
  }
});

bookAuthorV.addEventListener("input", (e) => {
  if (bookAuthorV.validity.valid) {
    authorError.textContent = "";
    authorError.className = "error";
  } else {
    authorError.textContent = "Must have a author for the book.";
    authorError.className = "error active";
  }
});

bookPagesV.addEventListener("input", (e) => {
  if (bookPagesV.validity.valid) {
    pagesError.textContent = "";
    pagesError.className = "error";
  } else {
    pagesError.textContent = "Book must have at least 20 pages.";
    pagesError.className = "error active";
  }
});

function showErrors() {
  if (bookTitleV.validity.valid) {
    titleError.textContent = "";
    titleError.className = "error";
  } else {
    titleError.textContent = "Must have a title for the book.";
    titleError.className = "error active";
  }

  if (bookAuthorV.validity.valid) {
    authorError.textContent = "";
    authorError.className = "error";
  } else {
    authorError.textContent = "Must have a author for the book.";
    authorError.className = "error active";
  }

  if (bookPagesV.validity.valid) {
    pagesError.textContent = "";
    pagesError.className = "error";
  } else {
    pagesError.textContent = "Book must have at least 20 pages.";
    pagesError.className = "error active";
  }
}

class Book {
  constructor(title, author, pages, hasRead) {
    this.title = title.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    );
    this.author = author.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    );
    this.pages = pages;
    this.hasRead = hasRead;
  }
  changeHasRead() {
    this.hasRead = !this.hasRead;
  }
}

function createBook(e) {
  showErrors();
  let readOrNot = false;
  if (e.target[5].checked) {
    readOrNot = true;
  } else {
    readOrNot = false;
  }
  let newBook = new Book(
    e.target[1].value,
    e.target[2].value,
    e.target[3].value,
    readOrNot
  );
  tempLibrary.push(newBook);

  if (localStorage.getItem("books") !== null) {
    let oldData = JSON.parse(localStorage.getItem("books"));
    oldData.push(newBook);
    localStorage.setItem("books", JSON.stringify(oldData));
  } else {
    let data = [];
    data.push(newBook);
    localStorage.setItem("books", JSON.stringify(data));
  }

  displayBooks();
  tempLibrary.forEach((book) => {
    myLibrary.push(book);
  });
  tempLibrary = [];

  e.target[1].value = "";
  e.target[2].value = "";
  e.target[3].value = "";
  e.target[5].checked = false;
  e.target[6].checked = true;
  e.target[7].textContent = "Add another?";

  e.preventDefault();
}

function displayBooks() {
  tempLibrary.forEach((book) => {
    let toggleHasReadBtn = document.createElement("button");
    toggleHasReadBtn.classList.add("btn", "change-hasRead");
    toggleHasReadBtn.type = "button";
    toggleHasReadBtn.textContent = "Toggle whether you have read this book";
    toggleHasReadBtn.dataset.index = libraryIndex;

    let deleteBookBtn = document.createElement("button");
    deleteBookBtn.classList.add("btn", "delete-book", "deleteBook");
    deleteBookBtn.type = "button";
    deleteBookBtn.textContent = "-";
    deleteBookBtn.dataset.index = libraryIndex;

    let newBookCard = document.createElement("div");
    newBookCard.classList.add("book-card");
    newBookCard.innerHTML = `<h2>${book.title}</h2>
                             <h3>${book.author}</h3>
                             <h4>${book.pages}</h4>
                             <p>${
                               book.hasRead
                                 ? "You have read this"
                                 : "You have not read this"
                             }</p>`;
    newBookCard.appendChild(toggleHasReadBtn);
    newBookCard.appendChild(deleteBookBtn);
    newBookCard.dataset.index = libraryIndex;
    libraryIndex++;
    cardGrid.appendChild(newBookCard);
  });
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  let currentBooks = document.querySelectorAll(".book-card");
  currentBooks.forEach((currentBook) => {
    if (currentBook.dataset.index === index) {
      currentBook.remove();
    }
  });
  libraryIndex--;
}

function showForm() {
  bookForm.style.display = "flex";
}

function hideForm() {
  bookForm.style.display = "none";
  addBookBtn.textContent = "ADD";
}

showFormBtn.addEventListener("click", showForm);
hideFormBtn.addEventListener("click", hideForm);
bookForm.addEventListener("submit", createBook);

document.addEventListener("click", function (e) {
  if (hasClass(e.target, "deleteBook")) {
    deleteBook(e.target.dataset.index);
  } else if (hasClass(e.target, "change-hasRead")) {
    myLibrary[e.target.dataset.index].changeHasRead();
    const currentBooks = document.querySelectorAll(".book-card");
    currentBooks.forEach((currentBook) => {
      testString = currentBook.querySelector("p");
      if (currentBook.dataset.index === e.target.dataset.index) {
        if (testString.textContent === "You have read this") {
          testString.textContent = "You have not read this";
        } else {
          testString.textContent = "You have read this";
        }
      }
    });
  }
});

function hasClass(elem, className) {
  return elem.className.split(" ").indexOf(className) > -1;
}
