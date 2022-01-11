let library = [];


function Book(author, title, numPages, isRead){

    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.isRead = isRead;

    this.changeRead = function(){
        if(this.isRead === true){
            this.isRead = false;
        }
        else{
            this.isRead = true;
        }
    }

    this.asString = function(){
        return `${this.author}-${this.title}-${this.numPages}`;
    }

}

const form = document.querySelector("form");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBook();
    form.reset();
});

function addBook(){
    let queries = form.elements;

    let author = queries[0].value;
    let title = queries[1].value;
    let pages = +queries[2].value;
    let hasRead = queries[3].checked;

    let bookToAdd = new Book(author, title, pages, hasRead);
    console.log();
    if(library.map( (item) => {
        return item.asString();
    }).indexOf(bookToAdd.asString()) === -1){

        library.push(bookToAdd);

        createBookElement(bookToAdd);
    }

}

let bookSection = document.querySelector("#cards");

function createBookElement(book){
    let card = document.createElement('div');
    card.classList.add('card');
    card.id = library.map( (item) => {
        return item.asString();
    }).indexOf(book.asString());


    let h2 = document.createElement('h2');
    h2.textContent = book.title;

    let p1 = document.createElement('p');
    p1.textContent = "Author: " + book.author;

    let p2 = document.createElement('p');
    p2.textContent = "Pages: " + book.numPages;

    let toggleButton = document.createElement('button');
    toggleButton.addEventListener('click', updateBtn);

    if(book.isRead){
        toggleButton.textContent = "Read";
        toggleButton.style.backgroundColor = "green";
    }

    else{
        toggleButton.textContent = "Not Read";
        toggleButton.style.backgroundColor = "red";
    }

    let removeButton = document.createElement('button');
    removeButton.textContent = "Remove";

    removeButton.addEventListener('click', removeBook);

    card.appendChild(h2);
    card.appendChild(p1);
    card.appendChild(p2);
    card.appendChild(toggleButton);
    card.appendChild(removeButton);

    bookSection.appendChild(card);
}

function removeBook(e){
    let idx = e.target.parentElement.id;

    let bookToRem = library[idx];

    library = library.filter( (book, index) => {
        return index != idx;
    });

    displayBooks();
}

function displayBooks(){

    bookSection.textContent = "";

    for(let book of library){
        createBookElement(book);
    }

}


function updateBtn(e){
    let read = e.target.textContent;

    if(read === "Read"){
        e.target.style.backgroundColor = "red";
        e.target.textContent = "Not Read";
    }

    else{
        e.target.style.backgroundColor = "green";
        e.target.textContent = "Read";
    }

    library[e.target.parentElement.id].changeRead();
}


