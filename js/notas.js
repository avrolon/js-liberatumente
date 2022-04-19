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

  let pant = "";

  notesObj.forEach(function (element, index) {
    pant += `
				<div class="card mx-4 my-2 bg-light text-dark thatsMyNote" style="width: 18rem;">
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
    noteEle.innerHTML = pant;
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

let search = document.getElementById("search");
search.addEventListener("input", function (e) {
  let inputText = search.value;

  if (inputText == "") {
    document.getElementById("noMatches").innerHTML = "";
  }

  var countNone = 0;

  let cards = document.getElementsByClassName("thatsMyNote");

  Array.from(cards).forEach(function (ele) {
    let cardText = ele.getElementsByTagName("p")[0].innerText;
    if (cardText.includes(inputText)) {
      ele.style.display = "block";
    } else {
      ele.style.display = "none";

      countNone++;

      if (countNone === cards.length) {
        document.getElementById("noMatches").innerHTML =
          '<h3 style="text-align: center; color: grey;">No matches found</h3>';
      } else {
        document.getElementById("noMatches").innerHTML = "";
      }
    }
  });

  if (countNone === 0) {
    document.getElementById("noMatches").innerHTML = "";
  }
});