/*challenge 36*/

class contacto {
  constructor(nombre, numero) {
    this.nombre = nombre;
    this.numero = numero;
  }
}

class agenda {
  constructor(cantidad = 10) {
    this.listaContactos = [];
    this.cantidad = cantidad;
  }

  agregarContacto(nombre, numero) {
    if (this.cantidad > this.listaContactos.length) {
      this.listaContactos.push(new contacto(nombre, numero));
      alert('Contacto agregado exitosamente');
    } else {
      alert('Su agenda no tiene espacio para mas contactos');
    }
  }

  existeContacto(nombre) {
    let existe = false;
    this.listaContactos.forEach(c => { if(c.nombre == nombre) existe = true; });
    return existe;
  }

  listarContactos() {
    this.listaContactos.forEach(c => { return c.nombre + ', ' + c.numero; });
  }

  buscarContacto(nombre) {
    if (this.existeContacto(nombre)) {
      let contacto = '';
      this.listaContactos.forEach(c => { if(c.nombre == nombre) contacto = c.nombre + ', ' + c.numero; });
      alert('El contacto que busca es: ' + contacto);
    } else {
      alert('El contacto que busca no existe en su agenda');
    }
  }

  eliminarContacto(nombre) {
    if (this.existeContacto(nombre)) {
      let pos = 0;
      this.listaContactos.map(c => {
        if (c.nombre == nombre) {
          this.listaContactos.splice(pos, 1);
          alert('Se a eliminado al contacto ' + nombre + ' exitosamente');
        }
        pos++;
      })
    } else {
      alert('El contacto que busca no existe en su agenda');
    }
  }

  agendaLlena() {
    return this.cantidad == this.listaContactos.length ? true : false;
  }

  huecosLibres() {
    if (this.agendaLlena()) {
      alert('No tiene espacio para mas contactos en su agenda');
    } else {
      alert('El espacio libre de su agenda es: ' + (this.cantidad - this.listaContactos.length).toString());
    }
  }
}

let newAgenda = new agenda();

const labelNombre = document.getElementById('nombre');
const labelNumero = document.getElementById('numero');
const labelBusca = document.getElementById('busca');
const labelElimina = document.getElementById('elimina');

const btnAgregar = document.getElementById('agregarContacto');
const btnMostrar = document.getElementById('mostrarContacto');
const btnBuscar = document.getElementById('buscarContacto');
const btnEliminar = document.getElementById('eliminarContacto');
const btnEspacio = document.getElementById('espacioAgenda');

const miTablaEstado = document.getElementById("mi-estado");


btnAgregar.addEventListener('click', () => {
  newAgenda.agregarContacto(labelNombre.value, labelNumero.value);
  document.getElementById('form-contacto').reset();
}
)

btnBuscar.addEventListener('click', () => {
  newAgenda.buscarContacto(labelBusca.value);
  document.getElementById('form-admin').reset();
}
)

btnEliminar.addEventListener('click', () => {
  newAgenda.eliminarContacto(labelElimina.value);
  document.getElementById('form-admin').reset();
}
)

btnEspacio.addEventListener('click', () => {
  newAgenda.huecosLibres();
  document.getElementById('form-admin').reset();
}
)

btnMostrar.addEventListener('click', () => {
  limpiarTablaContactos();
  for (let i = 0; i < newAgenda.listaContactos.length; i++) {
    const linea = document.createElement("tr");
    for (let j = 0; j < 2; j++) {
      const cell = document.createElement("td");
      let cellText = document.createTextNode('');
      switch (j) {
        case 0:
          cellText = document.createTextNode(newAgenda.listaContactos[i].nombre);
          break;
        case 1:
          cellText = document.createTextNode(newAgenda.listaContactos[i].numero);
          break;
      }
      linea.classList.add('lineaEstado');
      cell.appendChild(cellText);
      linea.appendChild(cell);
    }
    miTablaEstado.appendChild(linea);
  }
}
)

function limpiarTablaContactos() {
  const filas = document.querySelectorAll('.lineaEstado');
  filas.forEach(fila => { fila.remove(); });
}
