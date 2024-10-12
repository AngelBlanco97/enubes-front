import { useAuth } from "@/hooks/use-auth";

export default function FooterComponent() {
  const { user } = useAuth();

  return (
    <footer className="bg-dark text-white pt-4 pb-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="mb-3">eNubes Hotel</h5>
            <p>
              Disfruta de una experiencia única en nuestro hotel. Te ofrecemos
              el mejor servicio para que tu estancia sea inolvidable.
            </p>
          </div>
          <div className="col-md-4">
            <h5 className="mb-3">Enlaces rápidos</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="/habitaciones"
                  className="text-white text-decoration-none"
                >
                  Habitaciones
                </a>
              </li>
              <li>
                <a href="/reservas" className="text-white text-decoration-none">
                  Mis reservas
                </a>
              </li>
              <li>
                <a href="/contacto" className="text-white text-decoration-none">
                  Contacto
                </a>
              </li>
              <li>
                <a href="/login" className="text-white text-decoration-none">
                  {user ? "Mi perfil" : "Inicia sesión"}
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5 className="mb-3">Contáctanos</h5>
            <ul className="list-unstyled">
              <li>
                <i className="fas fa-map-marker-alt"></i> Calle Falsa 123,
                Ciudad, País
              </li>
              <li>
                <i className="fas fa-phone"></i> +123 456 789
              </li>
              <li>
                <i className="fas fa-envelope"></i> info@enubeshotel.com
              </li>
            </ul>
            <div className="mt-3">
              <a href="#" className="text-white me-2">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="text-white me-2">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} eNubes Hotel. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
