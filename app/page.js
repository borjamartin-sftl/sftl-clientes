"use client";
import { useState, useEffect } from "react";

const COLORS = [
  { dot: "#F2E2A4" },
  { dot: "#73FBF9" },
  { dot: "#D4C478" },
  { dot: "#000E37" },
  { dot: "#F2E2A4" },
];

const DEFAULT_DATA = {
  categories: ["Promotores de conciertos", "Festivales de música", "Artistas", "Giras (participamos)", "Agencias de Management y Booking"],
  clients: [
    { id: 1, name: "Medusa/Zevra Festival", category: "Promotores de conciertos" },
    { id: 10, name: "Medusa Festival", category: "Festivales de música", promotor: "Medusa/Zevra Festival" },
    { id: 11, name: "Zevra Festival", category: "Festivales de música", promotor: "Medusa/Zevra Festival" },
    { id: 12, name: "Coca-Cola Music Experience", category: "Festivales de música", promotor: null },
    { id: 13, name: "Z Live Rock Fest", category: "Festivales de música", promotor: null },
    { id: 14, name: "Share Festival", category: "Festivales de música", promotor: null },
    { id: 15, name: "Cooltural", category: "Festivales de música", promotor: null },
    { id: 16, name: "Fury y Jackies Music Electronic Fest", category: "Festivales de música", promotor: null },
    { id: 17, name: "Andalucía Salvaje", category: "Festivales de música", promotor: null },
    { id: 18, name: "Sonoramex", category: "Festivales de música", promotor: null },
    { id: 19, name: "Sonorama Goes to Ibiza", category: "Festivales de música", promotor: null },
    { id: 20, name: "Oasis Sound", category: "Festivales de música", promotor: null },
    { id: 21, name: "Bella Festival", category: "Festivales de música", promotor: null },
    { id: 22, name: "Festival Mas i Mas", category: "Festivales de música", promotor: null },
    { id: 23, name: "Sound Isidro", category: "Festivales de música", promotor: null },
    { id: 24, name: "Festival Planeta Sound", category: "Festivales de música", promotor: null },
    { id: 25, name: "Infierno Festival", category: "Festivales de música", promotor: null },
    { id: 26, name: "El Bosque Sonoro", category: "Festivales de música", promotor: null },
    { id: 30, name: "Judeline", category: "Artistas", agencia: null },
    { id: 31, name: "Sanguijuelas del Guadiana", category: "Artistas", agencia: null },
    { id: 32, name: "Kiddo", category: "Artistas", agencia: null },
    { id: 33, name: "La Raíz", category: "Artistas", agencia: null },
    { id: 34, name: "Barry B", category: "Artistas", agencia: null },
    { id: 35, name: "Hard GZ", category: "Artistas", agencia: null },
    { id: 36, name: "Víctor Martínez", category: "Artistas", agencia: null },
    { id: 37, name: "Sexy Zebras", category: "Artistas", agencia: null },
    { id: 38, name: "La M.O.D.A.", category: "Artistas", agencia: null },
    { id: 39, name: "Zetak Mitoaroa I, II, III", category: "Artistas", agencia: null },
    { id: 40, name: "Amparanoia", category: "Artistas", agencia: null },
    { id: 50, name: "Katy Perry", category: "Giras (participamos)", agencia: null },
    { id: 51, name: "Shawn Mendes", category: "Giras (participamos)", agencia: null },
    { id: 52, name: "Yerai Cortés", category: "Giras (participamos)", agencia: null },
    { id: 53, name: "María Becerra", category: "Giras (participamos)", agencia: null },
    { id: 54, name: "Carolina Durante", category: "Giras (participamos)", agencia: null },
    { id: 55, name: "Rosario Flores", category: "Giras (participamos)", agencia: null },
    { id: 56, name: "Amaral", category: "Giras (participamos)", agencia: null },
    { id: 57, name: "Bustamante", category: "Giras (participamos)", agencia: null },
    { id: 58, name: "Antonio Orozco", category: "Giras (participamos)", agencia: null },
    { id: 59, name: "Alba Reche", category: "Giras (participamos)", agencia: null },
    { id: 60, name: "Pablo López", category: "Giras (participamos)", agencia: null },
    { id: 61, name: "Morad", category: "Giras (participamos)", agencia: "Polar" },
    { id: 62, name: "La Zowi", category: "Giras (participamos)", agencia: "Polar" },
    { id: 70, name: "Polar", category: "Agencias de Management y Booking" },
  ],
};

function getStoredData() {
  if (typeof window === "undefined") return DEFAULT_DATA;
  try {
    const raw = localStorage.getItem("sftl-clients-v4");
    return raw ? JSON.parse(raw) : DEFAULT_DATA;
  } catch { return DEFAULT_DATA; }
}

function storeData(d) {
  try { localStorage.setItem("sftl-clients-v4", JSON.stringify(d)); } catch {}
}

const Initials = ({ name }) => {
  const letters = name.split(" ").map(w => w[0]).filter(Boolean).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{ backgroundColor: "#1E1E1C", border: "1px solid #F2E2A433" }} className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
      <span style={{ color: "#F2E2A4" }}>{letters}</span>
    </div>
  );
};

export default function Home() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todas");
  const [showAddClient, setShowAddClient] = useState(false);
  const [showAddCat, setShowAddCat] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCat, setNewCat] = useState("");
  const [newPromotor, setNewPromotor] = useState("");
  const [newAgencia, setNewAgencia] = useState("");
  const [newCatName, setNewCatName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCatName, setEditCatName] = useState("");
  const [editPromotor, setEditPromotor] = useState("");
  const [editAgencia, setEditAgencia] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmDeleteCat, setConfirmDeleteCat] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => { setData(getStoredData()); }, []);

  const save = (d) => { setData(d); storeData(d); };

  const addClient = () => {
    if (!newName.trim() || !newCat) return;
    const c = {
      id: Date.now(), name: newName.trim(), category: newCat,
      promotor: newCat === "Festivales de música" && newPromotor ? newPromotor : null,
      agencia: (newCat === "Artistas" || newCat === "Giras (participamos)") && newAgencia ? newAgencia : null,
    };
    save({ ...data, clients: [...data.clients, c] });
    setNewName(""); setNewCat(""); setNewPromotor(""); setNewAgencia(""); setShowAddClient(false);
  };

  const addCategory = () => {
    if (!newCatName.trim() || data.categories.includes(newCatName.trim())) return;
    save({ ...data, categories: [...data.categories, newCatName.trim()] });
    setNewCatName(""); setShowAddCat(false);
  };

  const deleteClient = (id) => {
    const client = data.clients.find(c => c.id === id);
    let updated = data.clients.filter(c => c.id !== id);
    if (client && client.category === "Promotores de conciertos") {
      updated = updated.map(c => c.promotor === client.name ? { ...c, promotor: null } : c);
    }
    if (client && client.category === "Agencias de Management y Booking") {
      updated = updated.map(c => c.agencia === client.name ? { ...c, agencia: null } : c);
    }
    save({ ...data, clients: updated });
    setConfirmDelete(null);
  };

  const deleteCategory = (cat) => {
    save({ ...data, categories: data.categories.filter(c => c !== cat), clients: data.clients.filter(c => c.category !== cat) });
    setConfirmDeleteCat(null);
  };

  const saveEdit = (id) => {
    if (!editName.trim()) return;
    const oldClient = data.clients.find(c => c.id === id);
    let updated = data.clients.map(c => {
      if (c.id === id) return {
        ...c, name: editName.trim(), category: editCatName || c.category,
        promotor: editCatName === "Festivales de música" ? (editPromotor || null) : c.promotor,
        agencia: (editCatName === "Artistas" || editCatName === "Giras (participamos)") ? (editAgencia || null) : c.agencia,
      };
      return c;
    });
    if (oldClient.category === "Promotores de conciertos" && oldClient.name !== editName.trim()) {
      updated = updated.map(c => c.promotor === oldClient.name ? { ...c, promotor: editName.trim() } : c);
    }
    if (oldClient.category === "Agencias de Management y Booking" && oldClient.name !== editName.trim()) {
      updated = updated.map(c => c.agencia === oldClient.name ? { ...c, agencia: editName.trim() } : c);
    }
    save({ ...data, clients: updated });
    setEditingId(null);
  };

  if (!data) return <div style={{ backgroundColor: "#1E1E1C" }} className="min-h-screen flex items-center justify-center"><p style={{ color: "#F2E2A4" }} className="text-lg">Cargando...</p></div>;

  const cats = data.categories;
  const promotores = data.clients.filter(c => c.category === "Promotores de conciertos");
  const agencias = data.clients.filter(c => c.category === "Agencias de Management y Booking");
  const filtered = data.clients.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "Todas" || c.category === filter;
    return matchSearch && matchFilter;
  });
  const grouped = {};
  cats.forEach(cat => { grouped[cat] = []; });
  filtered.forEach(c => { if (grouped[c.category]) grouped[c.category].push(c); });
  const total = data.clients.length;

  const getLinkedItems = (client) => {
    if (client.category === "Promotores de conciertos") {
      return data.clients.filter(c => c.category === "Festivales de música" && c.promotor === client.name);
    }
    if (client.category === "Agencias de Management y Booking") {
      return data.clients.filter(c => (c.category === "Artistas" || c.category === "Giras (participamos)") && c.agencia === client.name);
    }
    return [];
  };

  const isExpandable = (client) => client.category === "Promotores de conciertos" || client.category === "Agencias de Management y Booking";
  const showAgenciaField = (cat) => cat === "Artistas" || cat === "Giras (participamos)";
  const showPromotorField = (cat) => cat === "Festivales de música";

  return (
    <div style={{ backgroundColor: "#1E1E1C" }} className="min-h-screen">
      <div style={{ backgroundColor: "#1E1E1C", borderBottom: "1px solid #2a2a28" }} className="sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between mb-1">
            <div>
              <div className="flex items-center gap-3">
                <h1 style={{ color: "#F2E2A4" }} className="text-2xl font-bold tracking-wide">SFTL</h1>
                <span style={{ color: "#73FBF9" }} className="text-2xl font-bold tracking-wide">INCENTIVA</span>
              </div>
              <p style={{ color: "#F2E2A466" }} className="text-xs mt-0.5">Sympathy for the Lawyer</p>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4 mt-3">
            <p style={{ color: "#F2E2A488" }} className="text-sm">{total} cliente{total !== 1 ? "s" : ""} · {cats.length} categoría{cats.length !== 1 ? "s" : ""}</p>
            <div className="flex gap-2">
              <button onClick={() => setShowAddCat(true)} style={{ borderColor: "#F2E2A433", color: "#F2E2A4" }} className="px-3 py-2 text-xs rounded-xl border hover:opacity-80 transition">+ Categoría</button>
              <button onClick={() => { setShowAddClient(true); setNewCat(cats[0] || ""); setNewPromotor(""); setNewAgencia(""); }} style={{ backgroundColor: "#F2E2A4", color: "#1E1E1C" }} className="px-3 py-2 text-xs rounded-xl font-semibold hover:opacity-90 transition">+ Cliente</button>
            </div>
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar cliente..." style={{ backgroundColor: "#2a2a28", borderColor: "#3a3a38", color: "#F2E2A4" }} className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none placeholder-stone-500" />
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {["Todas", ...cats].map(c => (
              <button key={c} onClick={() => setFilter(c)} style={filter === c ? { backgroundColor: "#F2E2A4", color: "#1E1E1C" } : { backgroundColor: "#2a2a28", color: "#F2E2A488" }} className="px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition font-medium hover:opacity-80">{c}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {cats.filter(cat => filter === "Todas" || filter === cat).map((cat, ci) => {
          const col = COLORS[ci % COLORS.length];
          const clients = grouped[cat] || [];
          return (
            <div key={cat}>
              <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col.dot }} />
                  <span style={{ color: "#F2E2A4" }} className="text-sm font-semibold">{cat}</span>
                  <span style={{ backgroundColor: "#2a2a28", color: "#F2E2A4" }} className="text-xs px-2 py-0.5 rounded-full font-medium">{clients.length}</span>
                </div>
                <button onClick={() => setConfirmDeleteCat(cat)} style={{ color: "#F2E2A433" }} className="hover:text-red-400 transition text-xs">eliminar</button>
              </div>
              {clients.length === 0 ? (
                <div style={{ backgroundColor: "#2a2a28", borderColor: "#3a3a38" }} className="rounded-2xl border p-6 text-center">
                  <p style={{ color: "#F2E2A444" }} className="text-sm">Sin clientes en esta categoría</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {clients.map(c => {
                    const canExpand = isExpandable(c);
                    const linked = canExpand ? getLinkedItems(c) : [];
                    const isExp = expandedId === c.id;
                    const hasLinked = linked.length > 0;
                    return (
                      <div key={c.id}>
                        <div style={{ backgroundColor: "#252523", borderColor: "#3a3a38" }} className={`rounded-2xl border p-3.5 flex items-center justify-between hover:border-yellow-800 transition group ${canExpand && hasLinked ? "cursor-pointer" : ""}`} onClick={() => canExpand && hasLinked && setExpandedId(isExp ? null : c.id)}>
                          {editingId === c.id ? (
                            <div className="flex-1 flex gap-2 items-center flex-wrap" onClick={e => e.stopPropagation()}>
                              <input autoFocus value={editName} onChange={e => setEditName(e.target.value)} style={{ backgroundColor: "#2a2a28", borderColor: "#3a3a38", color: "#F2E2A4" }} className="flex-1 min-w-0 px-3 py-1.5 rounded-lg border text-sm focus:outline-none" onKeyDown={e => e.key === "Enter" && saveEdit(c.id)} />
                              <select value={editCatName} onChange={e => setEditCatName(e.target.value)} style={{ backgroundColor: "#2a2a28", borderColor: "#3a3a38", color: "#F2E2A4" }} className="px-2 py-1.5 rounded-lg border text-sm focus:outline-none">
                                {cats.map(ct => <option key={ct} value={ct}>{ct}</option>)}
                              </select>
                              {showPromotorField(editCatName) && (
                                <select value={editPromotor} onChange={e => setEditPromotor(e.target.value)} style={{ backgroundColor: "#2a2a28", borderColor: "#3a3a38", color: "#F2E2A4" }} className="px-2 py-1.5 rounded-lg border text-sm focus:outline-none">
                                  <option value="">Sin promotor</option>
                                  {promotores.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                                </select>
                              )}
                              {showAgenciaField(editCatName) && (
                                <select value={editAgencia} onChange={e => setEditAgencia(e.target.value)} style={{ backgroundColor: "#2a2a28", borderColor: "#3a3a38", color: "#F2E2A4" }} className="px-2 py-1.5 rounded-lg border text-sm focus:outline-none">
                                  <option value="">Sin agencia</option>
                                  {agencias.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                                </select>
                              )}
                              <button onClick={() => saveEdit(c.id)} style={{ color: "#73FBF9" }} className="text-sm font-medium">✓</button>
                              <button onClick={() => setEditingId(null)} style={{ color: "#F2E2A466" }} className="text-sm">✕</button>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center gap-3 min-w-0">
                                <Initials name={c.name} />
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1 flex-wrap">
                                    <span style={{ color: "#F2E2A4" }} className="text-sm font-medium">{c.name}</span>
                                    {c.promotor && <span style={{ backgroundColor: "#73FBF915", color: "#73FBF9" }} className="text-xs px-2 py-0.5 rounded-full font-medium">{c.promotor}</span>}
                                    {c.agencia && <span style={{ backgroundColor: "#F2E2A415", color: "#F2E2A4" }} className="text-xs px-2 py-0.5 rounded-full font-medium">{c.agencia}</span>}
                                  </div>
                                  {canExpand && hasLinked && <p style={{ color: "#F2E2A444" }} className="text-xs mt-0.5">{linked.length} vinculado{linked.length !== 1 ? "s" : ""}</p>}
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                {canExpand && hasLinked && <span style={{ color: "#F2E2A444" }} className="text-xs mr-1">{isExp ? "▲" : "▼"}</span>}
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition" onClick={e => e.stopPropagation()}>
                                  <button onClick={() => { setEditingId(c.id); setEditName(c.name); setEditCatName(c.category); setEditPromotor(c.promotor || ""); setEditAgencia(c.agencia || ""); }} style={{ color: "#F2E2A466" }} className="p-1.5 rounded-lg text-xs hover:opacity-100">editar</button>
                                  <button onClick={() => setConfirmDelete(c.id)} style={{ color: "#F2E2A433" }} className="p-1.5 rounded-lg hover:text-red-400 text-xs">borrar</button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                        {canExpand && isExp && hasLinked && (
                          <div style={{ borderColor: "#73FBF944" }} className="ml-6 mt-1 space-y-1 border-l-2 pl-3">
                            {linked.map(f => (
                              <div key={f.id} style={{ backgroundColor: "#73FBF910" }} className="rounded-xl px-3 py-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#73FBF9" }} />
                                  <span style={{ color: "#73FBF9" }} className="text-sm">{f.name}</span>
                                </div>
                                <span style={{ color: "#73FBF988" }} className="text-xs">{f.category}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showAddClient && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={() => setShowAddClient(false)}>
          <div style={{ backgroundColor: "#252523", borderColor: "#3a3a38" }} className="rounded-2xl border p-6 w-full max-w-sm shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 style={{ color: "#F2E2A4" }} className="text-lg font-bold mb-4">Nuevo cliente</h2>
            <input autoFocus value={newName} onChange={e => setNewName(e.target.value)} placeholder="Nombre del cliente" style={{ backgroundColor: "#2a2a28", borderColor: "#3a3a38", color: "#F2E2A4" }} className="w-full px-4 py-2.5 rounded-xl border text-sm mb-3 focus:outline-none placeholder-stone-500" onKeyDown={e => e.key === "Enter" && addClient()} />
            <select value={newCat} onChange={e => { setNewCat(e.target.value); setNewPromotor(""); setNewAgencia(""); }} style={{ backgroundColor: "#2a2a28", borderColor: "#3a3a38", color: "#F2E2A4" }} className="w-full px-4 py-2.5 rounded-xl border text-sm mb-3 focus:outline-none">
              {cats.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {showPromotorField(newCat) && promotores.length > 0 && (
              <select value={newPromotor} onChange={e => setNewPromotor(e.target.value)} style={{ backgroundColor: "#2a2a28", borderColor: "#3a3a38", color: "#F2E2A4" }} className="w-full px-4 py-2.5 rounded-xl border text-sm mb-3 focus:outline-none">
                <option value="">Sin promotor vinculado</option>
                {promotores.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            )}
            {showAgenciaField(newCat) && agencias.length > 0 && (
              <select value={newAgencia} onChange={e => setNewAgencia(e.target.value)} style={{ backgroundColor: "#2a2a28", borderColor: "#3a3a38", color: "#F2E2A4" }} className="w-full px-4 py-2.5 rounded-xl border text-sm mb-3 focus:outline-none">
                <option value="">Sin agencia vinculada</option>
                {agencias.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
              </select>
            )}
            <div className="flex gap-2 mt-1">
              <button onClick={() => setShowAddClient(false)} style={{ borderColor: "#3a3a38", color: "#F2E2A488" }} className="flex-1 px-4 py-2.5 rounded-xl border text-sm hover:opacity-80 transition">Cancelar</button>
              <button onClick={addClient} style={{ backgroundColor: "#F2E2A4", color: "#1E1E1C" }} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition">Añadir</button>
            </div>
          </div>
        </div>
      )}

      {showAddCat && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={() => setShowAddCat(false)}>
          <div style={{ backgroundColor: "#252523", borderColor: "#3a3a38" }} className="rounded-2xl border p-6 w-full max-w-sm shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 style={{ color: "#F2E2A4" }} className="text-lg font-bold mb-4">Nueva categoría</h2>
            <input autoFocus value={newCatName} onChange={e => setNewCatName(e.target.value)} placeholder="Nombre de la categoría" style={{ backgroundColor: "#2a2a28", borderColor: "#3a3a38", color: "#F2E2A4" }} className="w-full px-4 py-2.5 rounded-xl border text-sm mb-4 focus:outline-none placeholder-stone-500" onKeyDown={e => e.key === "Enter" && addCategory()} />
            <div className="flex gap-2">
              <button onClick={() => setShowAddCat(false)} style={{ borderColor: "#3a3a38", color: "#F2E2A488" }} className="flex-1 px-4 py-2.5 rounded-xl border text-sm hover:opacity-80 transition">Cancelar</button>
              <button onClick={addCategory} style={{ backgroundColor: "#F2E2A4", color: "#1E1E1C" }} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition">Crear</button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={() => setConfirmDelete(null)}>
          <div style={{ backgroundColor: "#252523", borderColor: "#3a3a38" }} className="rounded-2xl border p-6 w-full max-w-sm shadow-xl" onClick={e => e.stopPropagation()}>
            <p style={{ color: "#F2E2A4" }} className="text-sm mb-4">¿Seguro que quieres eliminar este cliente?</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmDelete(null)} style={{ borderColor: "#3a3a38", color: "#F2E2A488" }} className="flex-1 px-4 py-2.5 rounded-xl border text-sm">Cancelar</button>
              <button onClick={() => deleteClient(confirmDelete)} className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium">Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {confirmDeleteCat && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={() => setConfirmDeleteCat(null)}>
          <div style={{ backgroundColor: "#252523", borderColor: "#3a3a38" }} className="rounded-2xl border p-6 w-full max-w-sm shadow-xl" onClick={e => e.stopPropagation()}>
            <p style={{ color: "#F2E2A4" }} className="text-sm mb-4">¿Eliminar la categoría <strong>{confirmDeleteCat}</strong> y todos sus clientes?</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmDeleteCat(null)} style={{ borderColor: "#3a3a38", color: "#F2E2A488" }} className="flex-1 px-4 py-2.5 rounded-xl border text-sm">Cancelar</button>
              <button onClick={() => deleteCategory(confirmDeleteCat)} className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
