const primerSelect = document.getElementById('primerSelect');
const segundoSelect = document.getElementById('segundoSelect');
const tercerSelect = document.getElementById('tercerSelect');
const nombreAlumno = document.getElementById('nombre');
const boxForm = document.getElementById('box-form');
const infoBox = document.getElementsByClassName('info-box')[0];
const searchForm = document.getElementById('search-form');
const desde = document.getElementById('desde');
const hasta = document.getElementById('hasta');
const showFilter = document.getElementById('show-filter');

class Alumno {
  constructor(nombre, nota1, nota2, nota3) {
    this.nombre = nombre;
    this.nota1 = nota1;
    this.nota2 = nota2;
    this.nota3 = nota3;
    this.promedioFinal = 0;
  }
  promedio() {
    this.promedioFinal = (this.nota1 + this.nota2 + this.nota3) / 3;
    return this.promedioFinal;
  }

  showNotaDom() {
    infoBox.innerHTML = `<p>El promedio del alumno ${
      this.nombre
    } es ${this.promedioFinal.toFixed(2)}</p>`;

    setTimeout(() => {
      infoBox.innerHTML = '';
    }, 2000);
  }
}

function mostrarToast() {
  Toastify({
    text: 'Alumno ingresado exitosamente',
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'left',
    stopOnFocus: true,
    style: {
      background: 'linear-gradient(to right, #00b09b, #96c93d)'
    }
  }).showToast();
}

let alumnosLS = JSON.parse(localStorage.getItem('alumnos'));

if (alumnosLS === null) {
  alumnosLS = [];
}

boxForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (nombreAlumno.value === '') {
    return null;
  }

  if (
    isNaN(primerSelect.value) ||
    isNaN(segundoSelect.value) ||
    isNaN(tercerSelect.value)
  ) {
    return null;
  }

  const newAlumno = new Alumno(
    nombreAlumno.value,
    Number(primerSelect.value),
    Number(segundoSelect.value),
    Number(tercerSelect.value)
  );
  newAlumno.promedio();
  newAlumno.showNotaDom();
  alumnosLS.push(newAlumno);
  console.log(alumnosLS);
  localStorage.setItem('alumnos', JSON.stringify(alumnosLS));
  mostrarToast();
});

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const desdeVal = Number(desde.value);
  const hastaVal = Number(hasta.value);

  let arrFiltrado = alumnosLS.filter((alumno) => {
    if (alumno.promedioFinal > desdeVal && alumno.promedioFinal < hastaVal) {
      return alumno;
    }
  });

  showFilter.innerHTML = '';
  arrFiltrado.forEach((element) => {
    showFilter.innerHTML += `<div style='border: 1px solid black'>
                            <p>Nombre: ${element.nombre}</p>
                            <p>Promedio: ${element.promedioFinal}</p>
                            </div>`;
  });
});
