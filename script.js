// function Book(title,author,pages,read){
//     if(!new.target){
//         throw Error("You must use the 'new' operator to call the constructor");
//     }
//     this.title=title;
//     this.author=author;
//     this.pages=pages;
//     this.read=read;
//     this.info= function(){
//        return `"${this.title} by ${this.author},${this.pages} pages, ${this.read}"`;
//     };
// }
// const book1= new Book('The Habbit','J.R.R. Tolkien',295,'not read yet');
// console.log(book1.info());


const myLibrary=[];

function Book(title,author,pages,status) {
    if(!new.target){
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.status=status;
 
}
let n=1;
let container = document.querySelector(".card_container");


function addBookToLibrary(title,author,pages,status) {
  // take params, create a book then store it in the array
    const book = new Book(title,author,pages,status);
    book.id=crypto.randomUUID();
    myLibrary.push(book);
    // myLibrary.push(new Book(title,author,pages,status));
    //NOw adding the book on page
    let card=document.createElement("div");
    card.classList.add("card");
    card.id=book.id;
    card.innerHTML=`
        <h1>${title}</h1>
        <h2>${author}</h2>
        <h2>${pages} Pages</h2>
    `;
    container.append(card);
}
addBookToLibrary('The Habbit','J.R.R. Tolkien',295,'not read yet');
addBookToLibrary('The Rabbit','J.R.R. Tolkien',185,' read ');
console.log(myLibrary[0]);
console.log(myLibrary[1]);