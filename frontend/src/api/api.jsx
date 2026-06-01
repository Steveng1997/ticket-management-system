import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000" });

export const getTickets = (status = "") =>
  api.get("/tickets", { params: { status } });

export const getStats = () => api.get("/tickets/stats");

export const createTicket = (data) => api.post("/tickets", data);

export const assignTicket = (id, email) =>
  api.patch(`/tickets/${id}`, { assignedTo: email });
