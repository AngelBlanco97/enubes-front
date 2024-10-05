"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { es } from "date-fns/locale/es";
const { habsApi } = require("@/api/habs");
import "react-datepicker/dist/react-datepicker.css";

const useCategories = () => {
  const [data, setData] = useState({
    categories: [],
    loading: true,
  });

  useEffect(() => {
    setData({ ...data, loading: true });
    habsApi.getCategoriesHabs().then((response) => {
      setData({ categories: response.data, loading: false });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    categories: data.categories,
    loadingCategoriesValues: data.loading,
  };
};

const useSearch = () => {
  const [search, setSearch] = useState({
    categories: "",
    price_since: 0,
    price_until: 0,
    date_since: "",
    date_until: "",
    page: 1,
    limit: 9,
  });

  return {
    search,
    setSearch,
  };
};

const useHabitaciones = (search) => {
  const [data, setData] = useState({
    habitaciones: [],
    isLoading: true,
    pagination: {
      page: 1,
      limit: 9,
      total: 0,
      total_pages: 0,
    },
  });

  const fetchData = useCallback(async () => {
    try {
      setData({ ...data, isLoading: true });
      habsApi.getHabs(search).then((response) => {
        setData({
          habitaciones: response.data.data,
          isLoading: false,
          pagination: response.data.pagination,
        });
      });
    } catch (error) {
      console.error(error);
      setData({ ...data, isLoading: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Solo se ejecuta cuando cambia el valor de search y pasa un sec
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchData();
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return {
    data: data.habitaciones,
    pagination: data.pagination,
    isLoading: data.isLoading,
  };
};

export default function Habitaciones() {
  const { categories } = useCategories();
  const { search, setSearch } = useSearch();
  const { data, pagination, isLoading } = useHabitaciones(search);

  return (
    <div className="container">
      <div className="row">
        <div className="container text-center mt-3">
          <div className="row align-items-start gap-2 gap-md-0">
            <div className="col-12 col-md-4 ">
              <article className="filter-group container ">
                <div className="filter-content collapse show" id="collapse_1">
                  <div>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={() => {
                        setSearch((prev) => ({
                          ...prev,
                          categories: event.target.value,
                        }));
                      }}
                    >
                      <option selected value={""}>
                        Todos las categorías
                      </option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.nice_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </article>
            </div>
            <div className="col-12 col-md-4">
              <article className="container">
                <div className="row">
                  <div className="col">
                    <input
                      className="form-control"
                      placeholder="Precio desde"
                      onChange={(event) => {
                        setSearch((prev) => ({
                          ...prev,
                          price_since: event.target.value,
                        }));
                      }}
                      type="number"
                    />
                  </div>
                  <div className="col">
                    <input
                      className="form-control"
                      placeholder="Precio hasta"
                      onChange={(event) => {
                        setSearch((prev) => ({
                          ...prev,
                          price_until: event.target.value,
                        }));
                      }}
                      type="number"
                    />
                  </div>
                </div>
              </article>
            </div>
            <div className="col-12 col-md-4">
              <article className="container">
                <div className="row">
                  <div className="col">
                    <DatePicker
                      locale={es}
                      startDate={new Date()}
                      selected={search.date_since}
                      customInput={<input className="input-date" />}
                      placeholderText="Fecha desde"
                      minDate={new Date()}
                      onChange={(date) => {
                        setSearch((prev) => ({
                          ...prev,
                          date_since: date,
                        }));
                      }}
                    />
                  </div>
                  <div className="col">
                    <DatePicker
                      locale={es}
                      startDate={new Date()}
                      selected={search.date_until}
                      customInput={<input className="input-date" />}
                      placeholderText="Fecha hasta"
                      minDate={new Date()}
                      onChange={(date) => {
                        setSearch((prev) => ({
                          ...prev,
                          date_until: date,
                        }));
                      }}
                    />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <main className="col-12">
          <header className="border-bottom my-4 py-3">
            <div className="form-inline">
              <span className="mr-md-auto">Búsqueda de habitaciones</span>
            </div>
          </header>

          <div className="row">
            <div class="container text-center">
              <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">
                {!data && !isLoading && (
                  <div className="alert alert-warning">No hay resultados</div>
                )}

                {!data && isLoading && (
                  <div className="alert alert-info">Cargando...</div>
                )}

                {data?.map((habitacion, index) => {
                  const url = `/habitaciones/${habitacion.id}`;
                  const randomNumber = Math.floor(
                    Math.random() * habitacion?.images.length
                  );
                  const urlImage = habitacion?.images[randomNumber];

                  return (
                    <div key={index} className="px-2 pb-3">
                      <figure className="card card-product-grid min-height-200">
                        <div className="img-wrap">
                          <Image
                            src={urlImage}
                            className="img-fluid"
                            height={500}
                            width={400}
                            style={{ objectFit: "cover" }}
                            alt="Hotel Image"
                          />
                          <a className="btn-overlay" href={url}>
                            <i className="fa fa-search-plus"></i> Ver más
                          </a>
                        </div>
                        <figcaption className="info-wrap">
                          <div className="fix-height">
                            <a href={url} className="title">
                              {habitacion?.name ?? "Habitación"}
                            </a>
                            <div className="price-wrap mt-2">
                              <span className="price-new">
                                Desde{" "}
                                {habitacion?.price + "€ la noche" ??
                                  "No está disponible el precio"}
                              </span>
                            </div>
                          </div>
                          <a
                            href={url}
                            className="btn btn-block btn-primary mt-2"
                          >
                            Reservar ahora
                          </a>
                        </figcaption>
                      </figure>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <nav
            className="mt-4 d-flex justify-content-center "
            aria-label="Page navigation sample"
          >
            <ul className="pagination">
              {pagination?.total_pages && pagination.page > 1 && (
                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={() => {
                      setSearch((prev) => ({
                        ...prev,
                        page: prev.page - 1,
                      }));
                    }}
                  >
                    Anterior
                  </a>
                </li>
              )}

              {pagination?.total_pages &&
                Array.from({ length: pagination.total_pages }, (_, index) => {
                  const activeClassName =
                    pagination.page === index + 1
                      ? "page-item active"
                      : "page-item";

                  return (
                    <li key={index} className={activeClassName}>
                      <a
                        className="page-link"
                        onClick={() => {
                          setSearch((prev) => ({
                            ...prev,
                            page: index + 1,
                          }));
                        }}
                      >
                        {index + 1}
                      </a>
                    </li>
                  );
                })}
              {pagination?.total_pages !== pagination.page && (
                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={() => {
                      setSearch((prev) => ({
                        ...prev,
                        page: prev.page + 1,
                      }));
                    }}
                  >
                    Siguiente
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </main>
      </div>
    </div>
  );
}
