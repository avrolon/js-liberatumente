let getDate = new Date();
let getDay = getDate.getDay();
let getMonth = getDate.getMonth();

const day = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];
const [d1, d2, d3, d4, d5, d6, d7] = day;

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12] = months;

let today = day[getDay];
let month = months[getMonth];
let date = getDate.getDate();
let year = getDate.getFullYear();
document.querySelector(".time").innerHTML = `${today.substring(
  0,
  3
)}, ${date} ${month} ${year}`;

class Lista {
  constructor(tarea, categoria, prioridad) {
    this.tarea = tarea;
    this.categoria = categoria;
    this.prioridad = prioridad;
  }
}

function cargarListado() {
  let listadoTareas = JSON.parse(localStorage.getItem("listadoTareas"));
  if (listadoTareas == null) {
    return [];
  }
  return listadoTareas;
}

function guardarListado(e) {
  e.preventDefault();

  let tarea = document.querySelector("#tarea").value;
  let categoria = document.querySelector("#categoria").value;
  let prioridad = document.querySelector("#prioridad").value;

  let listadoTareas = cargarListado();

  listadoTareas.push(new Lista(tarea, categoria, prioridad));

  localStorage.setItem("listadoTareas", JSON.stringify(listadoTareas));
  mostrarListado(listadoTareas);

  document.getElementById("formularioActividades").reset();
}

// Se arma tarjeta

function armarTarjeta(elemento) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("tarjeta");

  const nombreTarea = document.createElement("h3");
  nombreTarea.textContent = `${elemento.tarea}`;
  tarjeta.appendChild(nombreTarea);

  const categoria = document.createElement("div");
  categoria.textContent = `Categoría: ${elemento.categoria}`;
  tarjeta.appendChild(categoria);

  const prioridad = document.createElement("div");
  prioridad.textContent = `Prioridad: ${elemento.prioridad}`;
  tarjeta.appendChild(prioridad);

  // Botón pendiente
  const botonToDo = document.createElement("input");
  botonToDo.type = "button";
  botonToDo.id = `${elemento.tarea}`;
  botonToDo.value = "Pendiente";
  botonToDo.className = "btn-1";
  botonToDo.addEventListener("click", function () {
    tarjeta.style.backgroundColor = "#F8C471";
  });
  tarjeta.appendChild(botonToDo);

  // Botón hecho
  const botonDo = document.createElement("input");
  botonDo.type = "button";
  botonDo.id = `${elemento.tarea}`;
  botonDo.value = "Hecho!";
  botonDo.className = "btn-1";
  botonDo.addEventListener("click", function () {
    tarjeta.style.backgroundColor = "#7DCEA0";
  });
  tarjeta.appendChild(botonDo);

  return tarjeta;
}

function mostrarListado(listadoTareas) {
  let listado = document.getElementById("listado");
  listado.textContent = "";
  listadoTareas.forEach((elemento) => {
    listado.appendChild(armarTarjeta(elemento));
  });
}

let formulario = document.getElementById("formularioActividades");
formulario.addEventListener("submit", guardarListado);

mostrarListado(cargarListado());

//LIBRERIAS

const boton = document.getElementById("btn");
boton.addEventListener("click", () => {
  Swal.fire({
    title: "Genial!",
    text: "Agregaste tu tarea con éxito.",
    icon: "success",
    iconColor: "#185a2b",
    confirmButtonText: "Continuar",
    confirmButtonColor: "#185a2b",
  });
});

Toastify({
  text: "Crear una nota",
  duration: 6000,
  gravity: "bottom",
  position: "right",
  destination: "notas.html",
  style: {
    background: "linear-gradient(to right, #00b09b, #185a2b)",
  },
}).showToast();
