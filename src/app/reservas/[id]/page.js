"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { jsPDF } from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";
import { habsApi } from "@/api/habs";

const useReservation = (id) => {
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  const getReservation = async () => {
    try {
      setLoading(true);
      const response = await habsApi.getReservation(id);
      setReservation(response.data);
      setLoading(false);
    } catch (error) {
      setReservation(null);
      setLoading(false);
    }
  };

  /**
   * No soy partidario de descargar archivos desde el cliente, pero
   * en este caso se solicita la descarga de un PDF desde el front, lo ideal seria generar el PDF
   * en el servidor y devolver la URL para descargarlo. (La url del PDF generado debería apuntar a otro servidor o a un bucket de S3, para evitar saturar el servidor principal)
   */
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Factura de Reserva", 20, 20);
    doc.setFontSize(12);
    doc.text(`Nombre del cliente: ${reservation.user_name}`, 20, 40);
    doc.text(`Email: ${reservation.user_email}`, 20, 50);
    doc.text(`Teléfono: ${reservation.user_phone}`, 20, 60);
    doc.text(`Habitación: ${reservation.bedroom_name}`, 20, 70);
    doc.text(`Descripción: ${reservation.bedroom_description}`, 20, 80);
    doc.text(`Check-in: ${reservation.check_in}`, 20, 90);
    doc.text(`Check-out: ${reservation.check_out}`, 20, 100);
    doc.text(`Total: ${reservation.total}`, 20, 110);
    doc.text(
      `Fecha de reserva: ${new Date(reservation.created_at).toLocaleString()}`,
      20,
      120
    );

    // Guardar el PDF
    doc.save("factura_reserva.pdf");
  };

  useEffect(() => {
    getReservation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { reservation, loading, downloadPDF };
};

export default function Page({ params }) {
  const { reservation, loading, downloadPDF } = useReservation(params.id);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="invoice bg-light p-4 rounded shadow">
        <div className="invoice-header border-bottom mb-4 d-flex justify-content-between align-items-center">
          <h1 className="invoice-title">Detalles de Reserva</h1>
          <button className="btn btn-primary" onClick={downloadPDF}>
            Descargar factura
          </button>
        </div>

        <p className="text-muted">
          Reserva ID: <strong>{reservation?.id}</strong>
        </p>

        <div className="row mb-4">
          <div className="col-md-6">
            <h5>Datos de Usuario</h5>
            <p>
              <strong>Nombre:</strong> {reservation?.user_name}
            </p>
            <p>
              <strong>Email:</strong> {reservation?.user_email}
            </p>
            <p>
              <strong>Teléfono:</strong> {reservation?.user_phone}
            </p>
          </div>
          <div className="col-md-6 text-right">
            <h5>Datos de la Habitación</h5>
            <p>
              <strong>Nombre:</strong> {reservation?.bedroom_name}
            </p>
            <p>
              <strong>Descripción:</strong> {reservation?.bedroom_description}
            </p>
            <p>
              <strong>Tipo de Habitación:</strong>{" "}
              {reservation?.bedrooms_type_id}
            </p>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <h5>Fechas de Reserva</h5>
            <p>
              <strong>Check-in:</strong> {reservation?.check_in}
            </p>
            <p>
              <strong>Check-out:</strong> {reservation?.check_out}
            </p>
          </div>
          <div className="col-md-6 text-right">
            <h5>Total</h5>
            <p className="text-success">
              <strong>${parseFloat(reservation?.total).toFixed(2)}</strong>
            </p>
          </div>
        </div>

        <div className="mb-4">
          <h5>Extras de la Habitación</h5>
          <ul className="list-unstyled">
            <li>
              <strong>Adaptada para minusválido:</strong>{" "}
              {reservation?.adapted_use === "1" ? "Sí" : "No"}
            </li>
            <li>
              <strong>Detector de humo:</strong>{" "}
              {reservation?.available_smoke_detector === "1" ? "Sí" : "No"}
            </li>
            <li>
              <strong>Chimenea:</strong>{" "}
              {reservation?.chimney === "1" ? "Sí" : "No"}
            </li>
            <li>
              <strong>Calefacción:</strong>{" "}
              {reservation?.heating === "1" ? "Sí" : "No"}
            </li>
            <li>
              <strong>Garaje:</strong>{" "}
              {reservation?.parking_lot === "1" ? "Sí" : "No"}
            </li>
            <li>
              <strong>Terraza:</strong>{" "}
              {reservation?.terrace === "1" ? "Sí" : "No"}
            </li>
            <li>
              <strong>TV:</strong> {reservation?.tv === "1" ? "Sí" : "No"}
            </li>
            <li>
              <strong>WiFi:</strong> {reservation?.wifi === "1" ? "Sí" : "No"}
            </li>
          </ul>
        </div>

        <div className="invoice-footer border-top pt-3">
          <p className="text-muted">
            Fecha de creación:{" "}
            {format(
              new Date(reservation?.created_at ?? new Date()),
              "dd/MM/yyyy"
            )}
          </p>
          <p className="text-muted">
            Última actualización:{" "}
            {format(
              new Date(reservation?.updated_at ?? new Date()),
              "dd/MM/yyyy"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
