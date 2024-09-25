import { useAuth } from "@/hooks/use-auth";

export default function MenuComponent() {
  const { user } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          eNubes Hotel
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/habitaciones"
              >
                Habitaciones
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu">
            {user ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
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
                <ul
                  className="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="/reservas">
                      <i className="fas fa-sliders-h fa-fw"></i> Mis reservas
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => {}}>
                      <i className="fas fa-sign-out-alt fa-fw"></i> Cerrar
                      sesión
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
