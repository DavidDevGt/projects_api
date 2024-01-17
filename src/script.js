$(document).ready(function () {
  /**
   * The function `loadProjects` makes an AJAX GET request to retrieve a list of projects from a
   * specified URL and dynamically creates project cards based on the response.
   */
  function loadProjects() {
    $.ajax({
      url: "https://djangorest-test-wt11.onrender.com/api/projects/",
      type: "GET",
      success: function (projects) {
        $("#projectsContainer").empty();
        projects.forEach((project) => {
          $("#projectsContainer").append(createProjectCard(project));
        });
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
      "dark",
    ];
    let usedColors = {};

    const techBadges = project.tech
      .split(", ")
      .map((tech) => {
        let color;
        do {
          color = colors[Math.floor(Math.random() * colors.length)];
        } while (usedColors[color]);
        usedColors[color] = true;
        return `<span class="badge bg-${color}">${tech}</span>`;
      })
      .join(" ");

    return `
            <div class="card mb-3">
                <img src="${
                  project.image_url || "https://via.placeholder.com/300x200"
                }" class="card-img-top" alt="${project.title}">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                    <p class="card-text">${techBadges}</p>

                </div>
            </div>
        `;
  }

  // Load projects when the page loads
  loadProjects();

  /* This code attaching an event listener to
  the `keyup` event of the element with the id `searchInput`. */
  $("#searchInput").on("keyup", function () {
    const searchTerm = $(this).val().toLowerCase();
    $(".card").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(searchTerm) > -1);
    });
  });
});
