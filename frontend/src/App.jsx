import { useEffect, useState } from "react";
import { getTickets, getStats } from "./api/api";
import { TicketForm } from "./components/TicketForm";

function App() {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    byStatus: {},
    byPriority: {},
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tRes, sRes] = await Promise.all([getTickets(), getStats()]);
      setTickets(tRes.data);
      setStats(sRes.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial
  useEffect(() => {
    const init = async () => {
      await fetchData();
    };
    init();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard de Soporte</h1>

        <TicketForm onTicketCreated={fetchData} />

        {loading ? (
          <div className="text-center py-10 font-semibold text-gray-500">
            Cargando datos...
          </div>
        ) : (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl border shadow-sm">
                <p className="text-xs text-gray-500 font-bold uppercase">
                  Total
                </p>
                <h2 className="text-3xl font-bold">{stats.total}</h2>
              </div>
              <div className="bg-white p-6 rounded-2xl border shadow-sm">
                <p className="text-xs text-gray-500 font-bold uppercase">
                  Pendientes
                </p>
                <h2 className="text-3xl font-bold text-amber-600">
                  {stats.byStatus.pending || 0}
                </h2>
              </div>
            </section>

            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs uppercase text-gray-600">
                  <tr>
                    <th className="px-6 py-4">Título</th>
                    <th className="px-6 py-4">Descripción</th>
                    <th className="px-6 py-4">Prioridad</th>
                    <th className="px-6 py-4">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {tickets.map((t) => (
                    <tr key={t.id}>
                      <td className="px-6 py-4 font-medium">{t.title}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {t.description}
                      </td>
                      <td className="px-6 py-4">{t.priority}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100">
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
