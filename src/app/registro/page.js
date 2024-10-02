"use client";
import { authApi } from "@/api/auth";
import { useAuth } from "@/hooks/use-auth";
import { useState, useCallback } from "react";

const useRegister = () => {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
    password_confirm: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await authApi.registerUser(form);
    },
    [form]
  );

  return {
    form,
    handleChange,
    handleSubmit,
  };
};

export default function Register() {
  const { form, handleChange, handleSubmit } = useRegister();
  const { user } = useAuth();

  return (
    <section className="">
      <div className="px-4 py-5 px-md-5 text-center text-lg-start">
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                Hotel eNubes
                <br />
                <span className="text-primary">Regístrate</span>
              </h1>
              <p className="lead fw-normal text-muted mb-5">
                ¿Quieres reservar una habitación? Registrate y disfruta de
                nuestras ofertas. ¡No te lo pierdas! 🌟
              </p>
            </div>

            {!user && (
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <form onSubmit={handleSubmit}>
                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="text"
                          id="form2Example1"
                          className="form-control"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                        />
                        <label
                          className="form-label
                        "
                          htmlFor="form2Example1"
                        >
                          Nombre
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="text"
                          id="form2Example1"
                          className="form-control"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                        />
                        <label
                          className="form-label
                        "
                          htmlFor="form2Example1"
                        >
                          Apellido
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example1"
                          className="form-control"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="form2Example1">
                          Email address
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example2"
                          className="form-control"
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="form2Example2">
                          Password
                        </label>
                      </div>
                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example3"
                          className="form-control"
                          name="password_confirm"
                          value={form.password_confirm}
                          onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="form2Example2">
                          Confirm password
                        </label>
                      </div>

                      <button
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-primary btn-block mb-4 mt-2"
                      >
                        Regístrame 🚀
                      </button>

                      <div className="text-center">
                        <p>
                          o inicia sesión <a href="/login">aquí</a>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
