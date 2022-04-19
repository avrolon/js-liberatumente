displayNotes();
var addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function () {
  let notesObj;
  let addNote = document.getElementById("addNote");
  let notesString = localStorage.getItem("notes");

  if (notesString == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notesString);
  }

  let now = new Date();
  let dateTime = `${now.getDate()}-${
    now.getMonth() + 1
  }-${now.getFullYear()} | ${now.getHours()}:${now.getMinutes()}`;

  let tempObj = { text: addNote.value, time: dateTime };

  notesObj.push(tempObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  addNote.value = "";

  displayNotes();
});

function displayNotes() {
  let notesObj;
  let notesString = localStorage.getItem("notes");

  if (notesString == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notesString);
  }

  let add = "";

  notesObj.forEach(function (element, index) {
    add += `
				<div class="card mx-4 my-2 bg-light text-dark" style="width: 18rem;">
					<div class="card-body">
						<h6>${element.time}</h6>
						<p class="card-text">${element.text
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")}</p>
						<button id="${index}" onclick=deleteNote(this.id) class="btn btn-success">Borrar</button>
					</div>
				</div>
			`;
  });

  let noteEle = document.getElementById("notes");

  if (notesObj.length != 0) {
    noteEle.innerHTML = add;
  } else {
    noteEle.innerHTML =
      '<h3 style="text-align: center; color: grey;">Aún no agregaste ninguna nota...</h3>';
  }
}

function deleteNote(index) {
  let notesObj;
  let notesString = localStorage.getItem("notes");

  if (notesString == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notesString);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  displayNotes();
}
