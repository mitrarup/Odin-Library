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

const container = document.querySelector(".card_container");

const myLibrary = [];

function Book(title, author, pages, status) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = crypto.randomUUID();
}
//Adding method in protype to change read status
Book.prototype.toggleStatus = function () {
    this.status = !this.status;
}
//Function to Create and Add book in myLibrary
function addBookToLibrary(title, author, pages, status) {

    const book = new Book(title, author, pages, status);
    myLibrary.push(book);
}

function renderLibrary(){
    //Clearing the previous data
    container.innerHTML="";
    // Updating the DOM through myLibrary
    myLibrary.forEach((book) => {    
        let card = document.createElement("div");
        card.classList.add("card");
        card.id = book.id;
        let title=document.createElement("h2");
        title.textContent= book.title;
        card.appendChild(title);
        let author=document.createElement("p");
        author.textContent= book.author;
        card.appendChild(author);
        let page=document.createElement("p");
        page.textContent=`${book.pages} pages`;
        card.appendChild(page);

        let btn_container=document.createElement("div");
        let status_btn=document.createElement("button");
        let remove_btn=document.createElement("button");
        status_btn.setAttribute("data-carduid",`${book.id}`);
        status_btn.textContent = book.status ? "Read" : "Not Read";
        status_btn.classList.add("button","toggle_status");
        status_btn.classList.add( book.status ? "read_btn":"notread_btn");

        remove_btn.classList.add("button","remove_btn");
        remove_btn.setAttribute("data-cardid",`${book.id}`);
        remove_btn.textContent="Remove";
        btn_container.appendChild(status_btn);
        btn_container.appendChild(remove_btn);
        card.appendChild(btn_container);
        container.appendChild(card);
    })
}

//Taking dialog and form elements
const addBook = document.getElementById("add_book");
const cancel = document.getElementById("cancel");
const dialog = document.getElementById("my_dialog");
const myForm = document.getElementById("myform");


addBook.addEventListener("click", () => {
    dialog.showModal();
})
cancel.addEventListener("click", () => {
    dialog.close();
})

myForm.addEventListener("submit", function (event) {
    event.preventDefault();
    //mapping the form input values
    const title = myForm.querySelector('[name="title"]').value;
    const author = myForm.querySelector('[name="author"]').value;
    const pages = Number(myForm.querySelector('[name="pages"]').value);
    const status = myForm.querySelector('[name="read"]').checked;

    addBookToLibrary(title, author, pages, status);
    dialog.close();
    myForm.reset();
    renderLibrary();
});


container.addEventListener("click", (current_button) => {
    // Removing the card
    if(current_button.target.classList.contains("remove_btn")){
        //get the card id
        const uId = current_button.target.dataset.cardid;
        // removing the book from myLibrary
        const index=myLibrary.findIndex(book => book.id === uId);
        if(index !== -1){
            myLibrary.splice(index,1);
        }
    }
    // Changing read status
    if (current_button.target.classList.contains("toggle_status")) {
        // getting the card id of the clicked status button
        const uId = current_button.target.dataset.carduid;
        // getting the book from mtLibrary
        const current_book = myLibrary.find(book => book.id === uId);
        // changing the read status
        if(current_book){
            current_book.toggleStatus();
        }
    }
    // Updating the UI
    renderLibrary();

});

// Creating some books manually
addBookToLibrary('The Habbit','J.R.R. Tolkien',295,true);
addBookToLibrary('The Power Of NOW','Eckhart Tolle',181,false);
addBookToLibrary('The Metamorphosis','Franz Kafka',97,true);
addBookToLibrary('Atomic Habits','James Clear',585,false);
addBookToLibrary('Rich Dad Poor Dad','Robert Kiyosaki and Sharon Lechter',472,true);
renderLibrary();