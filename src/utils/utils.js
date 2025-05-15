class utils {
    getValueParams(parametros, params, name) {
        for (const key in parametros) {
            if (parametros.hasOwnProperty(key)) {
                const value = parametros[key];

                if (params.combustible[key] && Array.isArray(params.combustible[key].units)) {
                    let combustibleObj = params.combustible[key];

                    if (combustibleObj.units.includes(name)) {
                        return combustibleObj.equation(value); // Retorna el resultado
                    }
                }
            }
        }
        return null;
    }

    encontrarPrimerYUltimo(datos, params) {
        let resultados = {};

        // Recorremos los datos una sola vez
        datos.forEach((obj, index) => {
            for (const key in params.combustible) {
                if (obj.hasOwnProperty(key)) {
                    // Si es la primera vez que lo encontramos, lo guardamos
                    if (!resultados[key]) {
                        resultados[key] = { primero: index, ultimo: index };
                    } else {
                        // Si ya existía, solo actualizamos el último
                        resultados[key].ultimo = index;
                    }
                }
            }
        });

        return resultados;
    }

    showToast(mensaje, titulo = "Notificación", tipo = "info") {
    const tipos = {
        info: "text-bg-info",
        success: "text-bg-success",
        warning: "text-bg-warning",
        danger: "text-bg-danger"
    };

    const clase = tipos[tipo] || "text-bg-secondary";

    const toastContainer = document.getElementById("toast-container");

    const toast = document.createElement("div");
    toast.className = `toast align-items-center ${clase}`;
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");

    toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <strong>${titulo}:</strong> ${mensaje}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

    toastContainer.appendChild(toast);

    const toastBootstrap = new bootstrap.Toast(toast, { delay: 3000 });
    toastBootstrap.show();

    toast.addEventListener("hidden.bs.toast", () => toast.remove());
}

}

export default new utils();