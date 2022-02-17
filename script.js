// use Ajax to make GET, POST, PUT/PATCH, and DELETE request
// should display a list of all my notes and give you the ability to create new notes, edit old notes, and delete notes
// notes include title, text, date/time

const url = "http://localhost:3000/notes";
const form = document.getElementById('note-form') //line 20-27 in html
const noteList = document.getElementById('notes-list-ul') //this is the notes container
//let eachList = document.getElementsByClassName('li').

//listen for form submit
form.addEventListener('submit', function(e) {
    e.preventDefault()
    //grab the value from the input
    const noteTitle = document.querySelector('#note-title').value
    const noteText = document.querySelector('#note-text').value
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            //I don't have to include "id" here bc json server adds it for me
            title: noteTitle,
            body: noteText,
            created_at: moment().format('MMMM Do YYYY'),
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            renderListItem(data)
        })
    clearInputs()
})
//GET all the notes
function listNotes () { //see line 41
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            //takes all the todos
            //loop through and create a new todo item on the page for each one
            for (let listObj of data){ //here's the loop
                renderListItem(listObj) //calls the function from line 48
            }
        })  
}

// Add one todo item to the list on the page
//create the title, text, and date for each note
function renderListItem(listObj) {
    const noteEl = document.createElement("li")
    noteEl.id = listObj.id;
    // noteEl.innerHTML = `
    //     <h3 class="title" id="return-title" id="${listObj.id}">${listObj.title}</h3>
    //     <h5 class="created_at" id="${listObj.id}">Posted: ${listObj.created_at}</h5>
    //     <h4 class= "bodyNote" id="${listObj.id}">${listObj.body}</h4> </br>
    //     <h6 class= "icons"  id="${listObj.id}"><i class="fa-regular fa-pen-to-square"></i> <i class="fa-solid fa-trash"></i></h6>
    //     `
    noteEl.innerHTML = `
        <h2 class="title" id="return-title">${listObj.title}</h2>
        <h3 class="created_at">Posted: ${listObj.created_at}</h3>
        <h4 class= "bodyNote">${listObj.body}</h4> </br>
        <p><i class="fa-regular fa-pen-to-square edit"></i> <i class="fa-solid fa-trash delete"></i></p>
        `
    noteList.prepend(noteEl) // this puts the new note at the beginning instead of the end
}
//reset/clear the form after each new note is submitted
function clearInputs() {
    form.reset()
}

  /**** Function that runs as soon as the script file loads *****/
  // call this when the script first runs (on page load)
  // This runs only on the first load!
listNotes()
//id="icons"

//Event listener for click on edit or trash
noteList.addEventListener('click', function(e) {
    e.preventDefault()
    console.log('you clicked')
    if (e.target.classList.contains('delete')) {
        console.log ('you found the trash icon') 
        deleteNote(e.target)
    } if (e.target.classList.contains('edit')) {
        console.log ('you found the edit icon') 
        alert("Oh you wanted to edit, TOO BAD!!!")
    }
})
        
function deleteNote(element) {
    //need to know which note to delete, so need the id (matching in db.json)
    const listId = element.parentElement.id //this pulls 'icons'...is that right?
    fetch(`http://localhost:3000/notes/${listId}`, { //this pulls each individual id that matches in the db.json
        method: 'DELETE',    
    }).then(function () {
        element.parentElement.remove() //removes the clicked on note
    })
}
//Next: Work on the edit features


// PATCH request Localhost:3000/notes/1 <==make sure to hvae the iD!!!!