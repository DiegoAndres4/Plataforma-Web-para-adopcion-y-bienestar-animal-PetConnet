document.addEventListener("DOMContentLoaded", () => {
  // Botones de adoptar
  const botonesAdoptar = document.querySelectorAll(".btn-adoptar");
  botonesAdoptar.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      btn.textContent = btn.classList.contains("active")
        ? "Adoptado 🐾"
        : "Adoptar";
    });
  });

  // Filtros seleccionables
  const filtros = document.querySelectorAll(".filtro");
  filtros.forEach(f => {
    f.addEventListener("click", () => {
      f.classList.toggle("active");
    });
  });
});
