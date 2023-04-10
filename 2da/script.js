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
  informe() {
    if (this.promedioFinal >= 7 && this.promedioFinal <= 10) {
      alert(this.nombre + ' APROBO con: ' + this.promedioFinal);
    } else if (this.promedioFinal >= 0 && this.promedioFinal < 7) {
      alert(this.nombre + ' DESAPROBO con: ' + this.promedioFinal);
    }
  }
}
let alumnos = [];
let opcion;

function solicitarDatos() {
  alumno = prompt('Ingrese Nombre alumno');
  nota1 = Number(prompt('Ingrese Primer nota:'));
  nota2 = Number(prompt('Ingrese Segunda nota:'));
  nota3 = Number(prompt('Ingrese Tercer nota:'));
  return new Alumno(alumno, nota1, nota2, nota3);
}

function mostrarPromedios() {
  alumnos.forEach((alumno) => {
    alumno.informe();
  });
}

function buscarPorNombre() {
  let buscar = prompt('Busque un alumno por su nombre: ');
  let alumnoFind = alumnos.find((alumno) => alumno.nombre === buscar);
  if (alumnoFind) {
    alert('El alumno se encuentra cursando...');
  } else {
    alert('Alumno no reconocido...');
  }
}

function init() {
  opcion = prompt('Desea ingresar un Alumno y sus notas \nResponder: si o no');
  while (opcion == 'si') {
    let newAlumno = solicitarDatos();
    newAlumno.promedio();
    alumnos.push(newAlumno);
    opcion = prompt(
      'Desea Ingresar un Alumno y sus notas \nResponder: si o no'
    );
  }
  mostrarPromedios();
  buscarPorNombre();
}

init();
