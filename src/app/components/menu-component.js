export default function MenuComponent() {
  const user = {
    first_name: "John",
    last_name: "Doe",
  };
  const isAuthenticated = true;
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          eNubes Hotel
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                href="/habitaciones"
              >
                Habitaciones
              </a>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu">
            {isAuthenticated ? (
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {isAuthenticated
                    ? user.first_name + " " + user.last_name
                    : "Inicia sesión"}
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a class="dropdown-item" href="/reservas">
                      <i class="fas fa-sliders-h fa-fw"></i> Mis reservas
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <button class="dropdown-item" onClick={() => {}}>
                      <i class="fas fa-sign-out-alt fa-fw"></i> Cerrar sesión
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <a className="btn btn-dark" href="/login">
                Inicia sesión
              </a>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
