"use client";

import { useState, useEffect } from "react";
import { 
  Ticket, 
  Plus, 
  MessageSquare, 
  Clock, 
  AlertCircle, 
  CheckCircle2,
  Send,
  Loader2,
  ChevronRight
} from "lucide-react";

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [showNewTicket, setShowNewTicket] = useState(false);

  const fetchTickets = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/tickets");
      const data = await res.json();
      if (res.ok) setTickets(data);
    } catch (err) {
      console.error("Failed to fetch tickets", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message, priority }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create ticket");
      }

      setSubject("");
      setMessage("");
      setShowNewTicket(false);
      fetchTickets();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Support <span className="text-gradient">Tickets</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Get help from our expert support team 24/7.
          </p>
        </div>
        <button
          onClick={() => setShowNewTicket(!showNewTicket)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
        >
          {showNewTicket ? <Clock size={20} /> : <Plus size={20} />}
          {showNewTicket ? "View My Tickets" : "Create New Ticket"}
        </button>
      </div>

      {showNewTicket ? (
        <div className="glass-card p-8 bg-white dark:bg-slate-900/50 border-indigo-100 dark:border-indigo-900/30 max-w-3xl mx-auto w-full">
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
            <MessageSquare className="text-indigo-500" />
            Open a Support Ticket
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500">Subject</label>
              <input
                type="text"
                className="block w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-bold text-slate-900 dark:text-white"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Briefly describe your issue..."
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500">Priority Level</label>
              <div className="grid grid-cols-3 gap-4">
                {["LOW", "MEDIUM", "HIGH"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`py-3 px-4 rounded-xl text-xs font-black transition-all border-2 ${
                      priority === p 
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-indigo-500/50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500">Detailed Message</label>
              <textarea
                className="block w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-bold text-slate-900 dark:text-white min-h-[150px]"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us more about what's going on..."
                required
              />
            </div>
            
            {error && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 flex items-center gap-3">
                <AlertCircle size={20} className="text-rose-500 shrink-0" />
                <p className="text-rose-600 dark:text-rose-400 text-sm font-bold">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black text-lg shadow-xl shadow-indigo-600/20 transition-all disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
              {loading ? "Sending Ticket..." : "Send Ticket"}
            </button>
          </form>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="px-6 py-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Ticket History
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 font-medium">
              You have {tickets.length} support requests in our system.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
              <thead className="bg-slate-50/50 dark:bg-slate-800/30">
                <tr>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Ticket Info</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Priority</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Created</th>
                  <th className="px-6 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {fetching ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <Loader2 className="animate-spin mx-auto text-indigo-500" />
                    </td>
                  </tr>
                ) : tickets.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400 italic font-medium">
                      No tickets found. Need help? Create a new ticket!
                    </td>
                  </tr>
                ) : (
                  tickets.map((ticket: any) => (
                    <tr key={ticket.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {ticket.subject}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                            ID: {ticket.id.slice(-8)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-[10px] font-black rounded-md uppercase tracking-wider ${
                          ticket.status === 'OPEN' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 
                          ticket.status === 'ANSWERED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                          'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[11px] font-black ${
                          ticket.priority === 'HIGH' ? 'text-rose-500' : 
                          ticket.priority === 'MEDIUM' ? 'text-amber-500' : 
                          'text-emerald-500'
                        }`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                        {new Date(ticket.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-500 transition-all">
                          <ChevronRight size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
