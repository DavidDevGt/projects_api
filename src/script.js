$(document).ready(function () {
  // Función para cargar proyectos
  function loadProjects(callback) {
    $.ajax({
      url: "https://djangorest-test-wt11.onrender.com/api/projects/",
      type: "GET",
      success: function (projects) {
        $("#projectsContainer").empty();
        projects.forEach((project) => {
          $("#projectsContainer").append(createProjectCard(project));
        });
        if (callback) callback();
      },
    });
  }

  function createProjectCard(project) {
    const colors = [
      "primary",
      "secondary",
      "success",
      "danger",
      "warning",
      "info",
      "dark",
    ];
    let lastColor = "";

    const techBadges = project.tech
      .split(", ")
      .map((tech) => {
        let color;
        do {
          color = colors[Math.floor(Math.random() * colors.length)];
        } while (color === lastColor);
        lastColor = color;
        return `<span class="badge bg-${color} me-1">${tech}</span>`;
      })
      .join(" ");

    const projectLink = project.project_url
      ? `<a href="${project.project_url}" class="btn btn-outline-primary mt-2" target="_blank">Ver Proyecto</a>`
      : "";

    return `
      <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div class="card h-100 shadow-sm">
              <img src="${
                project.image_url || "https://via.placeholder.com/300x200"
              }" class="card-img-top" alt="${project.title}">
              <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${project.title}</h5>
                  <p class="card-text mb-2">${project.description.substring(
                    0,
                    100
                  )}...</p>
                  <div class="mt-auto">
                      <div class="mb-2">${techBadges}</div>
                      ${projectLink}
                  </div>
              </div>
          </div>
      </div>
  `;
  }

  // Función para filtrar proyectos por término de búsqueda
  function filterProjects(searchTerm) {
    let count = 0;
    $(".card").each(function () {
      const match = $(this).text().toLowerCase().indexOf(searchTerm) > -1;
      $(this).toggle(match);
      if (match) count++;
    });

    if (count === 0) {
      $("#projectsContainer").html(
        "<p class='text-center'>No projects found.</p>"
      );
    }
  }

  // Evento para escuchar el ingreso de texto en el campo de búsqueda
  $("#searchInput").on("keyup", function (e) {
    const searchTerm = $(this).val().toLowerCase();
    if (e.key === "Enter" || searchTerm === "") {
      loadProjects(() => filterProjects(searchTerm));
    } else {
      filterProjects(searchTerm);
    }
  });

  // Cargar proyectos al iniciar
  loadProjects();
});
