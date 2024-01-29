const myLibrary = [];
let test = new Book("hobbit", "jrr tolkien", "290", false);

myLibrary.push(test);
const cardGrid = document.querySelector('.main-wrapper');

console.log(cardGrid);

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