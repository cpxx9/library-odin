const myLibrary = [];
let test = new Book("hobbit", "jrr tolkien", "290", false);
let test2 = new Book("potter", "jk rowling", "400", true);
let test3 = new Book("potter", "jk rowling", "400", true);
let test4 = new Book("potter", "jk rowling", "400", true);
let test5 = new Book("potter", "jk rowling", "400", true);
let test6 = new Book("potter", "jk rowling", "400", true);
let test7 = new Book("potter", "jk rowling", "400", true);
let test8 = new Book("potter", "jk rowling", "400", true);
let test9 = new Book("potter", "jk rowling", "400", true);
let test10 = new Book("potter", "jk rowling", "400", true);
let test11 = new Book("potter", "jk rowling", "400", true);

myLibrary.push(test);
myLibrary.push(test2);
myLibrary.push(test3);
myLibrary.push(test4);
myLibrary.push(test5);
myLibrary.push(test6);
myLibrary.push(test7);
myLibrary.push(test8);
myLibrary.push(test9);
myLibrary.push(test10);
myLibrary.push(test11);
const cardGrid = document.querySelector('.book-card-area');

function Book(title, author, pages, hasRead) {
  this.title = title;  
  this.author = author;  
  this.pages = pages;  
  this.hasRead = hasRead;
  this.info = function() {
    return `${this.title.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())} by ${this.author.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}, ${this.pages} pages, ${this.hasRead ? "has been read" : "not read yet"}`;
  };
}

function addBookToLibrary() {

}

function displayBooks() {
  myLibrary.forEach((book) => {
    let newBookCard = document.createElement('div');
    newBookCard.innerHTML = `<h2>${book.title}</h2>
                              <h3>${book.author}</h3>
                              <h4>${book.pages}</h4>
                              <p>${book.hasRead ? "You have read this" : "You have not read this"}</p>`;
    newBookCard.classList.add('book-card');
    cardGrid.appendChild(newBookCard);
  });
}