
let offX, offY;
let opcionesCargadas = false;

// Carga las mesas en los pisos
document.addEventListener("DOMContentLoaded", function () {
  const floorsDropdown = document.getElementById("floors");
  const floorValue = document.getElementById("floorValue");
  const mesasContainer = document.getElementById("dropzone");


  floorsDropdown.addEventListener("change", function () {
    const selectedFloorId = floorsDropdown.value;
    floorValue.textContent = `Piso 1`;
    //mostrarMesas(selectedFloorId, mesasContainer);

  });

});

document.addEventListener('DOMContentLoaded', function () {
  //obtenerOpciones(); // Llamar a la función para obtener las opciones cuando el DOM esté listo
});


/*
  function actualizarEstadoMesa(mesaId, nuevoEstado) {
    fetch('/update_mesa_status/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `mesa_id=${mesaId}&new_status=${nuevoEstado}`,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Estado de la mesa actualizado correctamente');
          // Puedes hacer otras acciones si la actualización fue exitosa
        } else {
          console.error('Error al actualizar el estado de la mesa:', data.error);
          // Manejar el error apropiadamente si la actualización falla
        }
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
        // Manejar errores de red u otros errores de solicitud
      });
      
  }
*/


function mostrarMesas(selectedFloorId, mesasContainer) {
  while (mesasContainer.firstChild) {
    mesasContainer.removeChild(mesasContainer.firstChild);
  }

  const mesaDiv = document.createElement("div");
  mesaDiv.className = "new-data";
  mesaDiv.style.position = "absolute";
  mesaDiv.style.left = mesa.cor_x + "px";
  mesaDiv.style.top = mesa.cor_y + "px";
  if (mesa.status == false) {
    mesaDiv.style.backgroundColor = "red";
  } else {
    mesaDiv.style.backgroundColor = "green";
  }
  mesaDiv.innerHTML = `
                <p>Número de mesa: ${mesa.no_table}</p>
                <img src="${mesa.img_url}" alt="imagen de la mesa" class="img-articulo"></img>
                <!-- Otros campos... -->`;
  mesasContainer.appendChild(mesaDiv);

  mesaDiv.addEventListener("click", function (event) {
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);

    const modal = document.createElement("div");
    modal.className = "modal";

    const mesaBox = document.createElement("div");
    mesaBox.className = "mesa-box";
    mesaBox.innerHTML = `
                  <h2 class="h2">Detalles de la mesa</h2>`;
    const button = document.createElement("button");
    mesa.status ? (button.textContent = "Disponible") : (button.textContent = "Ocupada");
    mesa.status ? (button.className = "btn-disponible") : (button.className = "btn-ocupado");
    mesaBox.appendChild(button);
    const select = document.createElement("select");
    select.name = "mesero";
    select.id = "mesero";
    const option = document.createElement("option");
    option.value = "Selccione un mesero";
    option.text = "Seleccione un mesero";
    select.appendChild(option);
    //obtenerMeseros(select);
    select.className = "for-select";
    mesaBox.appendChild(select);

    const orden = document.createElement("button");
    orden.textContent = "Realizar orden";
    orden.className = "btn-orden";
    orden.addEventListener("click", crearModal);
    mesaBox.appendChild(orden);

    const imgm = document.createElement("img");
    imgm.src = mesa.img_url;
    imgm.alt = "imagen de la mesa";
    mesaBox.appendChild(imgm);

    const cancelar = document.createElement("button");
    cancelar.textContent = "Cancelar";
    cancelar.className = "btn-cancelar";
    mesaBox.appendChild(cancelar);
    cancelar.addEventListener("click", closeModal);

    const guardar = document.createElement("button");
    guardar.textContent = "Guardar";

    guardar.className = "btn-guardar";
    mesaBox.appendChild(guardar);

    modal.appendChild(mesaBox);
    document.body.appendChild(modal);

    overlay.style.display = "block";
    modal.style.display = "block";
  });

  window.closeModal = function () {
    const overlay = document.querySelector(".overlay");
    const modal = document.querySelector(".modal");
    if (overlay && modal) {
      overlay.remove();
      modal.remove();
    }
  };
}

/*
async function obtenerOpciones() {
  try {
    const response = await fetch("/obtener_opciones/");
    if (!response.ok) {
      throw new Error('La solicitud no fue exitosa');
    }
    const data = await response.json();

    actualizarInterfaz(data); // Llamar a una función para actualizar la interfaz con las opciones obtenidas
  } catch (error) {
    console.error('Error al obtener opciones:', error);
  }
}

async function obtenerMeseros(select) {
  try {
    const response = await fetch("/obtener_meseros/");
    if (!response.ok) {
      throw new Error('La solicitud no fue exitosa');
    }
    const data = await response.json();

    actualizarMesero(data, select); // Llamar a una función para actualizar la interfaz con las opciones obtenidas
  } catch (error) {
    console.error('Error al obtener opciones:', error);
  }
}

async function obtenerComidas(divComidas) {
  try {
    const response = await fetch("/obtener_comidas/");
    if (!response.ok) {
      throw new Error('La solicitud no fue exitosa');
    }
    const data = await response.json();

    mostrarComidas(data, divComidas);// Llamar a una función para actualizar la interfaz con las opciones obtenidas
  } catch (error) {
    console.error('Error al obtener opciones:', error);
  }
}

function actualizarMesero(opciones, select) {
  select.innerHTML = ''; // Limpiar el select antes de agregar nuevas opciones
  const option = document.createElement('option');
  option.textContent = 'Seleccione un mesero';
  option.disabled = true;
  option.selected = true;
  select.value = 'Seleccione un mesero';
  console.log(opciones);

  select.appendChild(option);
  opciones.forEach(opcion => {
    const option2 = document.createElement('option');
    option2.value = opcion.id;
    option2.textContent = opcion.nombre + ' ' + opcion.apellido;
    select.appendChild(option2);
  });
}

function actualizarInterfaz(opciones) {
  const select = document.getElementById('floors');
  const selectedFloorId = select.value;
  select.innerHTML = ''; // Limpiar el select antes de agregar nuevas opciones
  const option = document.createElement('option');
  option.textContent = 'Seleccione un piso';
  option.disabled = true;
  option.selected = true;
  select.value = 'Seleccione un piso';

  select.appendChild(option);
  opciones.forEach(opcion => {
    const option2 = document.createElement('option');
    option2.value = opcion.id;
    option2.textContent = 'Piso ' + opcion.id;
    select.appendChild(option2);
  });

  if (select.value === 'Seleccione un piso' && opcionesCargadas === false) {
    // Si hay elementos en opciones, establecer el último piso agregado como seleccionado
    select.value = 'Seleccione un piso';
    const floorValue = document.getElementById("floorValue");
    floorValue.textContent = 'Ningún piso seleccionado';
  } else if (opcionesCargadas) {
    select.value = opciones[opciones.length - 1].id;
    const floorValue = document.getElementById("floorValue");
    floorValue.textContent = `Piso ${select.value}`;
    mostrarMesas(select.value, document.getElementById("dropzone"));
  }
  else {
    // Si no hay elementos en opciones, establecer el piso previamente seleccionado (si existe)
    if (selectedFloorId && select.querySelector(`option[value="${selectedFloorId}"]`)) {
      select.value = selectedFloorId;
      const floorValue = document.getElementById("floorValue");
      floorValue.textContent = `Piso ${select.value}`;
      mostrarMesas(select.value, document.getElementById("dropzone"));
    }
  }
}

*/

/*function mostrarComidas(datos, divComidas) {
  datos.forEach((data) => {
    const div = document.createElement("div");
    div.className = "div-comida";
    div.innerHTML = `
        <h3 class="h3">${data.nombre}</h3>
        <img src="${data.imagen_url}" alt="imagen de la comida" class="img-articulo"></img>
        <p class="p">Descripción: ${data.descripcion}</p>
        <p class="p">Precio: ${data.precio}</p>
        `;
    divComidas.appendChild(div);
  });
}*/



function crearModal() {
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  const modal = document.createElement("div");
  modal.className = "modal";

  const pedidoBox = document.createElement("div");
  pedidoBox.className = "pedido-box";
  pedidoBox.innerHTML = `
      <h2 class="h2">Realizar Pedido</h2>
    `;

  const divComidas = document.createElement("div");
  divComidas.className = "div-comidas";
  //obtenerComidas(divComidas);
  pedidoBox.appendChild(divComidas);

  const cancelar = document.createElement("button");
  cancelar.textContent = "Cancelar";
  cancelar.className = "btn-cancelar";
  pedidoBox.appendChild(cancelar);
  cancelar.addEventListener("click", closeModal);

  const realizarPedido = document.createElement("button");
  realizarPedido.textContent = "Realizar Pedido";
  realizarPedido.className = "btn-realizar-pedido";
  pedidoBox.appendChild(realizarPedido);

  modal.appendChild(pedidoBox);
  document.body.appendChild(modal);

  overlay.style.display = "block";
  modal.style.display = "block";

  function closeModal() {
    overlay.remove();
    modal.remove();
  }
}


