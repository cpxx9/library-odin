// let test = new Book("hobbit", "jrr tolkien", "290", false);
// let test2 = new Book("potter", "jk rowling", "400", true);
// let test3 = new Book("potter", "jk rowling", "400", true);
// let test4 = new Book("potter", "jk rowling", "400", true);
// let test5 = new Book("potter", "jk rowling", "400", true);
// let test6 = new Book("potter", "jk rowling", "400", true);
// let test7 = new Book("potter", "jk rowling", "400", true);
// let test8 = new Book("potter", "jk rowling", "400", true);
// let test9 = new Book("potter", "jk rowling", "400", true);
// let test10 = new Book("potter", "jk rowling", "400", true);
// let test11 = new Book("potter", "jk rowling", "400", true);

// myLibrary.push(test);
// myLibrary.push(test2);
// myLibrary.push(test3);
// myLibrary.push(test4);
// myLibrary.push(test5);
// myLibrary.push(test6);
// myLibrary.push(test7);
// myLibrary.push(test8);
// myLibrary.push(test9);
// myLibrary.push(test10);
// myLibrary.push(test11);
const myLibrary = [];
let newBookCard = document.createElement('div');
newBookCard.classList.add('book-card');

const cardGrid = document.querySelector('.book-card-area');
const showFormBtn = document.querySelector('.show-form');
const bookForm = document.querySelector('#bookForm');
const hideFormBtn = document.querySelector('.hide-form');
const addBookBtn = document.querySelector('.add-book');
const formInputs = document.querySelectorAll('#bookForm input');

function Book(title, author, pages, hasRead) {
  this.title = title.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());  
  this.author = author.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());  
  this.pages = pages;  
  this.hasRead = hasRead;
}

function addBookToLibrary(event) {
  console.log(event);
  let readOrNot = false;
  if(event.target[5].checked) {
    readOrNot = true;
    console.log(readOrNot, "true");
  } else {
    readOrNot = false;
    console.log(readOrNot, "false");
  }
  let newBook = new Book(event.target[1].value, event.target[2].value, event.target[3].value, readOrNot);
  myLibrary.push(newBook);

  event.target[1].value = ''; 
  event.target[2].value = '';
  event.target[3].value = '';
  event.target[5].checked = false;
  event.target[6].checked = true;
  
  displayBooks();

  event.preventDefault();
}

function displayBooks() {
  myLibrary.forEach((book) => {
    newBookCard.innerHTML = `<h2>${book.title}</h2>
                              <h3>${book.author}</h3>
                              <h4>${book.pages}</h4>
                              <p>${book.hasRead ? "You have read this" : "You have not read this"}</p>
                              <button type='button' class='btn change-hasRead'>Toggle whether you have read this book</button>
                              <button type='button' class='btn delete-book'>-</button>`;
    
    cardGrid.appendChild(newBookCard);
  });
}

function showForm() {
  bookForm.style.display = 'flex';
}

function hideForm() {
  bookForm.style.display = 'none';
}

showFormBtn.addEventListener('click', showForm);
hideFormBtn.addEventListener('click', hideForm);
bookForm.addEventListener('submit', addBookToLibrary);