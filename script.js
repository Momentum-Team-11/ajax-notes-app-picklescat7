// use Ajax to make GET, POST, PUT/PATCH, and DELETE request
// should display a list of all my notes and give you the ability to create new notes, edit old notes, and delete notes
// notes include title, text, date/time

const url = "http://localhost:3000/notes";
const form = document.getElementById('note-form')
const noteList = document.getElementById('notes-list')

//listen for form submit
form.addEventListener('submit', function(e) {
    e.preventDefault()
    //grab the value from the input
    const noteTitle = document.getElementById('note-title').value 
    const noteText = document.querySelector('#note-text').value
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            //I don't have to include "id" here bc json server adds it for me
            title: noteTitle,
            body: noteText,
            created_at: moment().format(),
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
            for (let listObj of data){
                renderListItem(listObj)
            }
        })  
}

listNotes()

//code block below from Paul- need to remove and try this myself tomorrow
function renderListItem(listObj) {
    const noteEl = document.createElement("li");
    noteEl.id = listObj.id;
    noteEl.classList.add("noted");
    noteEl.innerHTML = `<input type="radio" name="note" id="${listObj.id}" class="radio"><h3 class="title" id="${listObj.id}">${listObj.title}</h3><span class= "bodyNote" id="${listObj.id}">${listObj.body}</span><span id="${listObj.id}" class="date">${listObj.date}</span>`;
    noteList.appendChild(noteEl);
}


/***** DOM changing functions *****/

// Add one todo item to the list on the page

function clearInputs() {
form.reset()
}

  /**** Function that runs as soon as the script file loads *****/
  // call this when the script first runs (on page load)
  // This runs only on the first load!
//listNotes()

// PATCH request Localhost:3000/notes/1 <==make sure to hvae the iD!!!!