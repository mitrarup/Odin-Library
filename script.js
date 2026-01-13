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
        let read = book.status ? "Read" : "Not Read";
        card.classList.add("card");
        card.id = book.id;
        card.innerHTML = `
            <h1>${book.title}</h1>
            <h2>${book.author}</h2>
            <h2>${book.pages} Pages</h2>
            <div>
                <button class="button read_btn" data-carduid="${book.id}">${read}</button>
                <button class="button remove_btn" data-cardid="${book.id}">Remove</button>
            </div>
        `;
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
    const pages = myForm.querySelector('[name="pages"]').value;
    const status = myForm.querySelector('[name="read"]').checked;

    addBookToLibrary(title, author, pages, status);
    dialog.close();
    myForm.reset();
    renderLibrary();
});

// // logic to remove the book
// function runAgain() {
//     const remove = document.querySelectorAll(".remove_btn");
//     remove.forEach(function (currentButton) {

//         currentButton.addEventListener("click", () => {
//             let cId = currentButton.dataset.cardid;
//             let remove_card = document.getElementById(cId);
//             remove_card.remove();
//         });
//     })

// }

// const read_btns=document.querySelectorAll(".read_btn");
// read_btns.forEach(function(toggle_btn){

//     // toggle_btn.replaceWith(toggle_btn.cloneNode(true));


//     toggle_btn.addEventListener("click",()=>{
//         let uId = toggle_btn.dataset.carduid;
//         myLibrary.forEach((book,index)=>{
//             if(book.id===uId){
//                 book.toggleStatus();
//                 console.log(book ===myLibrary[index]);
//             }
//         });

//         console.log(myLibrary);
//     });
// })

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
    if (current_button.target.classList.contains("read_btn")) {
        // getting the card id of the clicked status button
        const uId = current_button.target.dataset.carduid;
        // getting the book from mtLibrary
        const current_book = myLibrary.find(book => book.id === uId);
        // changing the read status
        current_book.toggleStatus();
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