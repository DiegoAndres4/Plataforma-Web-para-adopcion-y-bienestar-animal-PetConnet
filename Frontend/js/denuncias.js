const API_DENUNCIAS = "http://localhost:8083/api/denuncias";

let paginaActual = 0;
let size = 6; // denuncias por página
let modo = "activos"; // "activos" | "completo"

// Cargar denuncias desde la API
async function cargarDenuncias() {
  // En "activos" filtramos por estado, en "completo" no filtramos
  let url = ${API_DENUNCIAS}?page=${paginaActual}&size=${size};

  if (modo === "activos") {
    // filtramos por estado "En Revisión" (ajusta al valor que uses en BD)
    url += &estado=En%20Revisión;
  }

  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error("Error HTTP:", res.status, res.statusText);
      mostrarError("No se pudieron cargar las denuncias.");
      return;
    }

    const data = await res.json();
    const lista = data.content || [];
    mostrarDenuncias(lista);
    mostrarPaginacion(data.totalPages || 0);

  } catch (err) {
    console.error("Error al llamar al backend de denuncias:", err);
    mostrarError("Error de conexión con el servidor.");
  }
}

// Mostrar las tarjetas en el grid
function mostrarDenuncias(lista) {
  const contenedor = document.getElementById("denuncias-container");
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = <p class="text-center mt-4">No hay denuncias en este momento.</p>;
    return;
  }

  lista.forEach(d => {
    const fechaTexto = d.fechaDenuncia
      ? new Date(d.fechaDenuncia).toLocaleDateString("es-CO")
      : "";

    // Texto de estado en la etiqueta
    let textoEstado = d.estado || "Sin estado";
    let claseEstado = "revision";
    if (textoEstado.toLowerCase().includes("resuelto")) {
      claseEstado = "resuelto";
    } else if (textoEstado.toLowerCase().includes("grave")) {
      claseEstado = "grave";
    }

    const tipo = d.tipo || "Sin tipo";
    const ubicacion = (d.ciudad || "") + (d.direccion ? , ${d.direccion} : "");

    contenedor.innerHTML += `
      <div class="denuncia-card">
        <div class="denuncia-card-relative">
          <span class="estado ${claseEstado}">${textoEstado}</span>
          <img src="${d.fotoUrl || 'img/animal1.png'}" alt="${d.titulo}">
        </div>
        <div class="denuncia-content">
          <h5>${d.titulo}</h5>
          <p>
            Tipo: ${tipo}<br>
            Ubicación: ${ubicacion || "No especificada"}
          </p>
          ${
            fechaTexto
              ? <p class="fecha-denuncia">Fecha: ${fechaTexto}</p>
              : ""
          }
          <button class="btn-detalles" onclick="verDetalles(${d.id})">
            Ver Detalles
          </button>
        </div>
      </div>
    `;
  });
}

// Mostrar paginación
function mostrarPaginacion(totalPaginas) {
  const pagDiv = document.getElementById("pagination");
  pagDiv.innerHTML = "";

  if (totalPaginas <= 1) return;

  for (let i = 0; i < totalPaginas; i++) {
    pagDiv.innerHTML += `
      <button 
        class="${i === paginaActual ? "active" : ""}"
        onclick="cambiarPagina(${i})"
      >
        ${i + 1}
      </button>
    `;
  }
}

function cambiarPagina(num) {
  paginaActual = num;
  cargarDenuncias();
}

// Si quieres una página de detalle luego:
function verDetalles(id) {
  // Por ahora solo redirigimos pasando el id
  window.location.href = denuncia-detalle.html?id=${id};
}

// Mostrar mensajes de error en el grid
function mostrarError(msg) {
  const contenedor = document.getElementById("denuncias-container");
  contenedor.innerHTML = <p class="text-center mt-4 text-danger">${msg}</p>;
}

// Manejo de pestañas "Reportes Activos" / "Historial Completo"
document.addEventListener("DOMContentLoaded", () => {
  const btnActivos = document.getElementById("activos-btn");
  const btnCompleto = document.getElementById("completo-btn");

  btnActivos.addEventListener("click", () => {
    modo = "activos";
    paginaActual = 0;
    btnActivos.classList.add("active");
    btnCompleto.classList.remove("active");
    cargarDenuncias();
  });

  btnCompleto.addEventListener("click", () => {
    modo = "completo";
    paginaActual = 0;
    btnCompleto.classList.add("active");
    btnActivos.classList.remove("active");
    cargarDenuncias();
  });

  // Carga inicial
  cargarDenuncias();
});