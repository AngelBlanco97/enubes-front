import Image from "next/image";

export default function Home() {
  return (
    <section className="">
      <div className="px-4 py-5 px-md-5 text-center text-lg-start">
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                Hotel eNubes
                <br />
                <span className="text-primary">Bienvenido</span>
              </h1>
              <p className="lead fw-normal text-muted mb-5">
                ¿Quieres reservar una habitación? ¿O prefieres disfrutar de
                nuestras ofertas? ¡No te lo pierdas! 🌟 Revisa nuestras
                habitaciones y disfruta de la mejor experiencia de tu vida.
              </p>
              <a
                className="btn btn-primary btn-lg"
                href="/habitaciones"
                role="button"
              >
                Ver habitaciones
              </a>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
              <Image
                src="/pexels-pixabay-261102.jpg"
                alt="Imagen de bienvenida"
                width={1000}
                height={700}
                layout="responsive"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
