
let offX, offY;
let opcionesCargadas = false;

function drag(event, id = 1) {
  const draggedElement = event.target;
  const data = {
    id: id,
    textContent: draggedElement.textContent,
    imageSrc: draggedElement.querySelector(".img-articulo").src,
  };

  event.dataTransfer.setData("text", JSON.stringify(data));

  const rect = draggedElement.getBoundingClientRect();
  offX = event.clientX - rect.left;
  offY = event.clientY - rect.top;
}

function allowDrop(event) {
  event.preventDefault();
}

async function drop(event) {
  event.preventDefault();
  const dataString = event.dataTransfer.getData("text");
  const data = JSON.parse(dataString);

  // Obtener la posición relativa al contenedor
  const contenedor = document.getElementById("dropzone");
  const contenedorRect = contenedor.getBoundingClientRect();
  let offsetX = event.clientX - contenedorRect.left;
  let offsetY = event.clientY - contenedorRect.top;

  // Establecer estilos para el nuevo div
  let x = offsetX - offX;
  let y = offsetY - offY;

  try {
    //await insertarRegistro(x, y, data);
    mostrarMesas(document.getElementById("floors").value, document.getElementById("dropzone"), event);
  } catch (error) {
    console.error("Error al insertar registro:", error);
  }
}


// Crear piso
/*document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("crear_piso").addEventListener("click", async function (event) {
    event.preventDefault();
    opcionesCargadas = true;
    try {
      const response = await fetch("/insert_floor/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
      });
 
      const data = await response.json();
      if (data.success) {
        await obtenerOpciones();
      } else {
        // Manejar caso de error si es necesario
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
 
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
});*/

/*
// Carga las mesas en los pisos
document.addEventListener("DOMContentLoaded", function () {
  const floorsDropdown = document.getElementById("floors");
  const floorValue = document.getElementById("floorValue");
  const mesasContainer = document.getElementById("dropzone");
 

  floorsDropdown.addEventListener("change", function () {
    const selectedFloorId = floorsDropdown.value;
    floorValue.textContent = `Piso ${selectedFloorId}`;
    mostrarMesas(selectedFloorId, mesasContainer);
    
  });
  
});

document.addEventListener('DOMContentLoaded', function() {
  obtenerOpciones(); // Llamar a la función para obtener las opciones cuando el DOM esté listo
});
 
 

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

function actualizarCoordenadas(mesaid, mesaX, mesaY) {
  fetch('/update_mesa_coor/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `mesa_id=${mesaid}&mesa_x=${mesaX}&mesa_y=${mesaY}`,
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

async function insertarRegistro(x, y, data) {
  try {
        const response = await fetch("/insertar_registro/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "articuloId=" +
                data.id +
                "&piso=" +
                document.getElementById("floors").value +
                "&x=" +
                x +
                "&y=" +
                y +
                "&img=" +
                data.imageSrc,
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data_1 = await response.json();
        if ("message" in data_1) {
            console.log(data_1.message);
        } else if ("error" in data_1) {
            console.error(data_1.error);
        } else {
            console.error("Respuesta inesperada del servidor");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}
 
*/
function mostrarMesas(selectedFloorId, mesasContainer, event) {
  while (mesasContainer.firstChild) {
    mesasContainer.removeChild(mesasContainer.firstChild);
  }

  const mesaDiv = document.createElement("div");
  mesaDiv.className = "new-data";
  mesaDiv.style.position = "absolute";
  mesaDiv.style.left = event.clientX - mesaDiv.getBoundingClientRect().left + "px";
  mesaDiv.style.top = event.clientX - mesaDiv.getBoundingClientRect().left; + "px";
    mesaDiv.style.backgroundColor = "red";
  mesaDiv.innerHTML = `
                <p>Número de mesa: 1 </p>
                <img src="img/mesa2.png" alt="imagen de la mesa" class="img-articulo"></img>
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
                  <h2 class="h2">Detalles de la mesa</h2>
                  <h3 class="h3">Numero de mesa: 1</h3>`;
    const select = document.createElement("select");


    const imgm = document.createElement("img");
    imgm.src = 'img/mesa2.png';
    imgm.alt = "imagen de la mesa";
    mesaBox.appendChild(imgm);

    const cancelar = document.createElement("button");
    cancelar.textContent = "Cancelar";
    cancelar.className = "btn-cancelar";
    mesaBox.appendChild(cancelar);
    cancelar.addEventListener("click", closeModal);

    const guardar = document.createElement("button");
    guardar.textContent = "Eliminar";
    guardar.addEventListener("click", async function () {
      try {
        //await eliminarElemento(mesa.no_table);
        window.closeModal();
      } catch (error) {
        console.error('Error al eliminar el elemento:', error);
        // Maneja errores de eliminación aquí
      }
    });

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

  mesaDiv.addEventListener("mousedown", function (event) {
    let isDragging = true;
    let offsetX = event.clientX - mesaDiv.getBoundingClientRect().left;
    let offsetY = event.clientY - mesaDiv.getBoundingClientRect().top;
    mesaDiv.style.zIndex = 1000;

    function moveHandler(event) {
      if (isDragging) {
        event.preventDefault();
        const parentBoundingRect =
          mesasContainer.getBoundingClientRect();
        const currentX =
          event.clientX - parentBoundingRect.left - offsetX;
        const currentY =
          event.clientY - parentBoundingRect.top - offsetY;

        mesaDiv.style.left = `${currentX}px`;
        mesaDiv.style.top = `${currentY}px`;
        actualizarCoordenadas(mesa.no_table, currentX, currentY);
      }
    }

    function stopDragging() {
      isDragging = false;
      mesaDiv.style.zIndex = "";
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", stopDragging);
    }

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", stopDragging);
  });

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

async function eliminarElemento(elementoIdAEliminar) {
  try {  
    const response = await fetch('/eliminar_elemento/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `elemento_id=${elementoIdAEliminar}`,
    });
 
    if (!response.ok) {
      throw new Error('Error al eliminar el elemento');
    }
 
    const data = await response.json();
    console.log(data.message); // Mensaje de éxito

    mostrarMesas(document.getElementById("floors").value, document.getElementById("dropzone"));
  } catch (error) {
    console.error('Error:', error);
    // Maneja errores de eliminación aquí
  }
}
 
*/
