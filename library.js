let library = [];

function Book(author, title, numPages, isRead){

    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.isRead = isRead;

}

Book.prototype.toggle = () => {
    this.isRead ? this.isRead = false: this.isRead = true;
}
const form = document.querySelector("form");

form.addEventListener('submit', addBook);

function addBook(){
    let queries = form.elements;

    let author = queries[0].value;
    let title = queries[1].value;
    let pages = +queries[2].value;
    let hasRead = queries[3].checked;

    let bookToAdd = new Book(author, title, page, hasRead);
    library.push(bookToAdd);
}

function toggle(book){
    book.toggle();
}
