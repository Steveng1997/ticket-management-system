import { useState } from "react";
import { createTicket } from "../api/api";

export const TicketForm = ({ onTicketCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createTicket(formData);
      setFormData({ title: "", description: "", priority: "medium" });
      onTicketCreated();
    } catch (error) {
      alert("Error al crear el ticket. Por favor intenta de nuevo.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8"
    >
      <h3 className="text-lg font-bold mb-4">Nueva Solicitud</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          className="p-2.5 rounded-xl border border-gray-200"
          type="text"
          placeholder="Título"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          className="p-2.5 rounded-xl border border-gray-200"
          type="text"
          placeholder="Descripción"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
        <select
          className="p-2.5 rounded-xl border border-gray-200"
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value })
          }
        >
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </div>
      <button
        disabled={loading}
        type="submit"
        className="mt-4 w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2.5 rounded-xl font-semibold transition"
      >
        {loading ? "Creando..." : "Crear Ticket"}
      </button>
    </form>
  );
};
