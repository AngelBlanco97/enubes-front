"use client";

import { use, useCallback, useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { DayPicker } from "react-day-picker";
import { habsApi } from "@/api/habs";
import { es } from "react-day-picker/locale";
import classNames from "react-day-picker/style.module.css";
import { toMoneyNumber } from "@/utils/formatter";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const useHabitacion = (slug) => {
  const [data, setData] = useState({ habitacion: null, loading: true });

  const fetchHabitacion = useCallback(async () => {
    try {
      setData((prev) => ({ ...prev, loading: true }));
      const response = await habsApi.getHabInfo(slug);
      const formattedData = {
        ...response.data,
        images: response.data.images.split(","),
        reservas:
          response.data.reservation_dates?.split(",").map((dates) => {
            const datesSplitted = dates.split("-");
            return {
              start: new Date(
                datesSplitted[0],
                datesSplitted[1] - 1,
                datesSplitted[2]
              ),

              end: new Date(
                datesSplitted[3],
                datesSplitted[4] - 1,
                datesSplitted[5]
              ),
            };
          }) || [],
      };
      setData({ habitacion: formattedData, loading: false });
    } catch (error) {
      setData({ habitacion: null, loading: false });
    }
  }, [slug]);

  useEffect(() => {
    fetchHabitacion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return {
    habitacion: data.habitacion,
    loading: data.loading,
  };
};

const useReservation = (habId) => {
  const router = useRouter();
  const [date, setDate] = useState({ from: null, to: null });
  const [reserving, setReserving] = useState(false);

  const reserveDate = useCallback(async () => {
    try {
      setReserving(true);
      await habsApi.reserveHab(habId, date.from, date.to).then((reserva) => {
        setReserving(false);
        toast.success("Reserva realizada con éxito");
        router.push(`/reservas/${reserva.data.id}`);
      });
    } catch (error) {
      toast.error(error);
      setReserving(false);
    }
  }, [date, habId]);

  return {
    dateObj: date,
    setDate,
    reserving,
    reserveDate,
    setReserving,
  };
};

export default function Page({ params }) {
  const { habitacion, loading } = useHabitacion(params.slug);
  const { dateObj, setDate, reserveDate, reserving } = useReservation(
    habitacion?.id
  );

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {habitacion && (
        <div className="container m-5 room-detail-container">
          <div className="row mb-4">
            <div className="col-md-12">
              <h2 className="room-name text-center h1 mb-4">
                {habitacion.name}
              </h2>
              <Carousel className="room-carousel">
                {habitacion.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <Image
                      className="d-block w-100 h-auto rounded"
                      src={img}
                      alt={`Room image ${index + 1}`}
                      width={1200}
                      height={900}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>

          <div className="row mx-3">
            <div className="col-md-6 ">
              <h3 className="room-type h2 mb-3">{habitacion.type}</h3>
              <p className="room-description text-muted mb-3">
                {habitacion.description}
              </p>
              <p className="room-price">
                <strong>Precio por noche:</strong> ${habitacion.price}
              </p>
              <p>
                <strong>Metros cuadrados:</strong> {habitacion.square_meters} m²
              </p>
              <p>
                <strong>Baños:</strong> {habitacion.num_bathrooms}
              </p>
            </div>

            <div className="col-md-6">
              <div className="room-services">
                <h4 className="mb-3">Extras de la habitación</h4>
                <ul className="list-unstyled">
                  <li>
                    <strong>Terraza:</strong>{" "}
                    {habitacion.terrace === "1"
                      ? "Disponible"
                      : "No disponible"}
                  </li>
                  <li>
                    <strong>TV:</strong>{" "}
                    {habitacion.tv === "1" ? "Disponible" : "No disponible"}
                  </li>
                  <li>
                    <strong>WiFi:</strong>{" "}
                    {habitacion.wifi === "1" ? "Disponible" : "No disponible"}
                  </li>
                  <li>
                    <strong>Calefacción:</strong>{" "}
                    {habitacion.heating === "1"
                      ? "Disponible"
                      : "No disponible"}
                  </li>
                  <li>
                    <strong>Chimenea:</strong>{" "}
                    {habitacion.chimney === "1"
                      ? "Disponible"
                      : "No disponible"}
                  </li>
                  <li>
                    <strong>Garaje:</strong>{" "}
                    {habitacion.parking_lot === "1"
                      ? "Disponible bajo petición"
                      : "No disponible"}
                  </li>
                  <li>
                    <strong>Permitido fumar:</strong>{" "}
                    {habitacion.available_smoke_detector === "1"
                      ? "Disponible"
                      : "No permitido"}
                  </li>
                  <li>
                    <strong>Adaptada para minusválidos:</strong>{" "}
                    {habitacion.adapted_use === "1"
                      ? "Habilitada"
                      : "No está habilitada"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row my-5 mx-3 d-flex justify-content-center">
            <h4 className="mb-3 h2 text-center">Reserva tu habitación</h4>
            <div className="col-md-4">
              <DayPicker
                locale={es}
                mode="range"
                classNames={classNames}
                selected={dateObj}
                onSelect={setDate}
                required={true}
                disabled={{ before: new Date() }}
                modifiers={{
                  disabled: habitacion.reservas.map((reserva) => ({
                    from: reserva.start,
                    to: reserva.end,
                  })),
                }}
              />
            </div>
            <div className="col-md-4 mt-4">
              {dateObj.from && dateObj.to && (
                <form>
                  <p>
                    <strong>Fecha de entrada:</strong>{" "}
                    {dateObj.from.toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Fecha de salida:</strong>{" "}
                    {dateObj.to.toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Precio total:</strong>{" "}
                    {toMoneyNumber(
                      habitacion.price *
                        (dateObj.to.getDate() - dateObj.from.getDate())
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={reserveDate}
                    className="btn btn-primary"
                    disabled={reserving}
                  >
                    {reserving ? "Reservando..." : "Reservar"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
