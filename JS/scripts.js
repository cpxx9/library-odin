let tempLibrary = [];
let myLibrary = [];
let libraryIndex = 0;
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

// tempLibrary.push(test);
// tempLibrary.push(test2);
// tempLibrary.push(test3);
// tempLibrary.push(test4);
// tempLibrary.push(test5);
// tempLibrary.push(test6);
// tempLibrary.push(test7);
// tempLibrary.push(test8);
// tempLibrary.push(test9);
// tempLibrary.push(test10);
// tempLibrary.push(test11);

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

function createBook(event) {
  let readOrNot = false;
  if(event.target[5].checked) {
    readOrNot = true;
  } else {
    readOrNot = false;
  }
  let newBook = new Book(event.target[1].value, event.target[2].value, event.target[3].value, readOrNot);
  tempLibrary.push(newBook);
  
  displayBooks();
  tempLibrary.forEach((book) => {
    myLibrary.push(book);
  });
  tempLibrary = [];

  event.target[1].value = ''; 
  event.target[2].value = '';
  event.target[3].value = '';
  event.target[5].checked = false;
  event.target[6].checked = true;
  event.target[7].textContent = 'Add another?';

  event.preventDefault();
}

function displayBooks() {
  tempLibrary.forEach((book) => {    
    let toggleHasReadBtn = document.createElement('button');
    toggleHasReadBtn.classList.add('btn', 'change-hasRead');
    toggleHasReadBtn.type = 'button';
    toggleHasReadBtn.textContent = 'Toggle whether you have read this book';
    toggleHasReadBtn.dataset.index = libraryIndex;

    let deleteBookBtn = document.createElement('button');
    deleteBookBtn.classList.add('btn', 'delete-book');
    deleteBookBtn.type = 'button';
    deleteBookBtn.textContent = '-';
    deleteBookBtn.dataset.index = libraryIndex;

    let newBookCard = document.createElement('div');
    newBookCard.classList.add('book-card');
    newBookCard.innerHTML = `<h2>${book.title}</h2>
                             <h3>${book.author}</h3>
                             <h4>${book.pages}</h4>
                             <p>${book.hasRead ? "You have read this" : "You have not read this"}</p>`;
    newBookCard.appendChild(toggleHasReadBtn);
    newBookCard.appendChild(deleteBookBtn);
    libraryIndex++;
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
bookForm.addEventListener('submit', createBook);