import React, { useEffect, useMemo, useState } from "react";
import { medchain_project_backend } from "../../declarations/medchain_project_backend";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Eye, EyeOff, LogOut, Search, Filter, Activity, UserCircle2, Pill, Building2, Loader2 } from "lucide-react";

export default function Dashboard({ principalId, onLogout }) {
  const [rekamMedisList, setRekamMedisList] = useState([]); // Array<[id, data]>
  const [loading, setLoading] = useState(true);

  // Form state
  const initialForm = {
    name: "",
    age: "",
    birth_date: "",
    gender: "",
    address: "",
    checkup_date: "",
    complaint: "",
    diagnosis: "",
    treatment: "",
    prescription: "",
    doctor: "",
    hospital: "",
  };
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showOnlyActive, setShowOnlyActive] = useState(true);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Toast state
  const [toasts, setToasts] = useState([]);
  const pushToast = (msg, type = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await medchain_project_backend.getAllRekamMedis();
      setRekamMedisList(result || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      pushToast("Gagal memuat data.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredList = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (rekamMedisList || [])
      .filter(([_, data]) => (showOnlyActive ? data.is_active : true))
      .filter(([_, data]) => {
        if (!q) return true;
        const fields = [data?.nama, data?.dokter, data?.rumah_sakit, data?.diagnosa, data?.keluhan, data?.tindakan].filter(Boolean).map((x) => String(x).toLowerCase());
        return fields.some((f) => f.includes(q));
      })
      .sort((a, b) => Number(b[0]) - Number(a[0])); // newest first by id
  }, [rekamMedisList, showOnlyActive, query]);

  const stats = useMemo(() => {
    const total = rekamMedisList.length;
    const active = rekamMedisList.filter(([, d]) => d.is_active).length;
    const inactive = total - active;
    const pct = total ? Math.round((active / total) * 100) : 0;
    return { total, active, inactive, pct };
  }, [rekamMedisList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => setFormData(initialForm);

  const openAdd = () => {
    setEditingId(null);
    resetForm();
    setShowForm(true);
  };

  const enterEditMode = (id, data) => {
    setEditingId(Number(id));
    setFormData({
      name: data.nama ?? "",
      age: String(data.umur ?? ""),
      birth_date: data.tanggal_lahir ?? "",
      gender: data.jenis_kelamin ?? "",
      address: data.alamat ?? "",
      checkup_date: data.tanggal_periksa ?? "",
      complaint: data.keluhan ?? "",
      diagnosis: data.diagnosa ?? "",
      treatment: data.tindakan ?? "",
      prescription: data.resep_obat ?? "",
      doctor: data.dokter ?? "",
      hospital: data.rumah_sakit ?? "",
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!formData.name || !formData.age) {
      pushToast("Name dan Age wajib diisi.", "error");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        nama: formData.name,
        umur: Number(formData.age),
        tanggal_lahir: formData.birth_date,
        jenis_kelamin: formData.gender,
        alamat: formData.address,
        tanggal_periksa: formData.checkup_date,
        keluhan: formData.complaint,
        diagnosa: formData.diagnosis,
        tindakan: formData.treatment,
        resep_obat: formData.prescription,
        dokter: formData.doctor,
        rumah_sakit: formData.hospital,
        is_active: true,
      };

      if (editingId !== null) {
        const ok = await medchain_project_backend.updateRekamMedis(editingId, payload);
        if (!ok) throw new Error("Update failed");
        pushToast("Record berhasil diupdate.");
      } else {
        await medchain_project_backend.createRekamMedis(payload);
        pushToast("Record berhasil ditambahkan.");
      }

      await fetchData();
      resetForm();
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Submit error:", error);
      pushToast(error?.message || "Gagal menyimpan.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (id, isActive) => {
    try {
      if (typeof medchain_project_backend.toggleActive === "function") {
        await medchain_project_backend.toggleActive(Number(id));
      } else if (isActive) {
        await medchain_project_backend.hideRekamMedis(Number(id));
      } else {
        await medchain_project_backend.restoreRekamMedis(Number(id));
      }
      await fetchData();
      pushToast(isActive ? "Record disembunyikan." : "Record ditampilkan.");
    } catch (e) {
      console.error("Toggle failed:", e);
      pushToast("Gagal mengubah status.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70 bg-slate-900/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400 grid place-items-center shadow-lg shadow-cyan-500/20">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">MedChain · Rekam Medis</h1>
              <p className="text-xs text-slate-300/80">
                Principal: <span className="font-mono">{principalId}</span>
              </p>
            </div>
          </div>
          <button onClick={onLogout} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 px-4 py-2 text-white shadow-sm hover:shadow-rose-500/30 active:scale-[0.98] transition">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats + Actions */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icon={UserCircle2} title="Total" value={stats.total} sub={`${stats.pct}% aktif`} />
          <StatCard icon={Pill} title="Aktif" value={stats.active} sub="Rekam aktif" accent="from-emerald-500 to-teal-400" />
          <StatCard icon={EyeOff} title="Nonaktif" value={stats.inactive} sub="Rekam tersembunyi" accent="from-amber-500 to-orange-400" />
          <StatCard icon={Building2} title="RS Terdaftar" value={uniqueCount(rekamMedisList, (d) => d.rumah_sakit)} sub="Distinct" accent="from-indigo-500 to-violet-400" />
        </section>

        {/* Filters Bar */}
        <section className="mb-6 flex flex-col md:flex-row gap-3 md:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama, dokter, rumah sakit, diagnosa…"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 select-none">
              <input type="checkbox" checked={showOnlyActive} onChange={(e) => setShowOnlyActive(e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-white/10" />
              <span className="text-sm text-slate-300">Hanya Active</span>
            </label>
            <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-white shadow hover:shadow-cyan-500/30 active:scale-[0.98]">
              <Plus className="h-4 w-4" /> Add Record
            </button>
          </div>
        </section>

        {/* Table / Skeleton */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-xl shadow-black/20 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2 text-slate-300">
            <Filter className="h-4 w-4" />
            <span className="text-sm">{filteredList.length} baris</span>
          </div>

          {loading ? (
            <TableSkeleton />
          ) : filteredList.length === 0 ? (
            <div className="p-10 text-center text-slate-400">Tidak ada data yang cocok.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-white/[0.04] text-slate-300 sticky top-0">
                  <tr className="border-b border-white/10">
                    {["ID", "Name", "Age", "Gender", "Birth Date", "Address", "Checkup Date", "Complaint", "Diagnosis", "Treatment", "Prescription", "Doctor", "Hospital", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map(([id, data]) => (
                    <tr key={Number(id)} className="border-b border-white/5 hover:bg-white/[0.03] transition">
                      <TdMono>{Number(id)}</TdMono>
                      <Td>{data.nama}</Td>
                      <Td>{Number(data.umur)}</Td>
                      <Td>{data.jenis_kelamin}</Td>
                      <Td>{data.tanggal_lahir}</Td>
                      <Td truncate>{data.alamat}</Td>
                      <Td>{data.tanggal_periksa}</Td>
                      <Td truncate>{data.keluhan}</Td>
                      <Td truncate>{data.diagnosa}</Td>
                      <Td truncate>{data.tindakan}</Td>
                      <Td truncate>{data.resep_obat}</Td>
                      <Td>{data.dokter}</Td>
                      <Td>{data.rumah_sakit}</Td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full ${
                            data.is_active ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30" : "bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/30"
                          }`}
                        >
                          {data.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button onClick={() => enterEditMode(id, data)} className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 hover:bg-white/10 active:scale-[0.98]" title="Edit">
                            <Edit className="h-4 w-4" />
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                          <button
                            onClick={() => toggleActive(id, data.is_active)}
                            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 active:scale-[0.98] ${
                              data.is_active ? "bg-white/5 border border-white/10 hover:bg-white/10" : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                            }`}
                            title={data.is_active ? "Sembunyikan" : "Tampilkan"}
                          >
                            {data.is_active ? (
                              <>
                                <EyeOff className="h-4 w-4" />
                                <span className="hidden sm:inline">Hide</span>
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4" />
                                <span className="hidden sm:inline">Show</span>
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <button onClick={openAdd} className="fixed bottom-6 right-6 md:hidden inline-flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30" aria-label="Add Record">
        <Plus className="h-6 w-6 text-white" />
      </button>

      <AnimatePresence>
        {showForm && (
          <Modal onClose={() => setShowForm(false)}>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 24 }} className="w-full max-w-3xl mx-auto">
              <div className="rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{editingId !== null ? `Edit Medical Record #${editingId}` : "Add Medical Record"}</h3>
                    <p className="text-xs text-slate-400">Lengkapi form berikut, kolom dengan * wajib diisi.</p>
                  </div>
                  <button onClick={() => setShowForm(false)} className="text-slate-300 hover:text-white">
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    ["name", "Full Name*", "text"],
                    ["age", "Age*", "number"],
                    ["birth_date", "Date of Birth", "date"],
                    ["gender", "Gender", "select"],
                    ["address", "Address", "text"],
                    ["checkup_date", "Checkup Date", "date"],
                    ["complaint", "Complaint", "text"],
                    ["diagnosis", "Diagnosis", "text"],
                    ["treatment", "Treatment", "text"],
                    ["prescription", "Prescription", "text"],
                    ["doctor", "Doctor", "text"],
                    ["hospital", "Hospital", "text"],
                  ].map(([name, label, type]) => (
                    <div key={name} className="space-y-1.5">
                      <label className="block text-xs text-slate-300">{label}</label>
                      {type === "select" ? (
                        <select name={name} value={formData[name]} onChange={handleChange} className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/60">
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      ) : (
                        <input type={type} name={name} value={formData[name]} onChange={handleChange} className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/60" />
                      )}
                    </div>
                  ))}

                  <div className="col-span-full flex gap-2 pt-2">
                    <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-white disabled:opacity-70">
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {editingId !== null ? "Updating..." : "Saving..."}
                        </>
                      ) : editingId !== null ? (
                        "Update Record"
                      ) : (
                        "Add Record"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingId(null);
                        resetForm();
                      }}
                      className="rounded-xl border border-white/10 px-4 py-2 hover:bg-white/5"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      <div className="fixed top-5 right-5 z-[60] space-y-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className={`rounded-xl px-4 py-2 shadow-lg border ${t.type === "error" ? "bg-rose-600/90 border-rose-400/40 text-white" : "bg-emerald-600/90 border-emerald-400/40 text-white"}`}
            >
              {t.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function uniqueCount(list, getter) {
  const s = new Set();
  for (const [, d] of list) s.add(getter(d));
  return s.has(undefined) ? s.size - 1 : s.size;
}

function Td({ children, truncate }) {
  return (
    <td className={`px-4 py-3 align-top ${truncate ? "max-w-[16rem] truncate" : ""}`} title={truncate ? String(children || "") : undefined}>
      {children}
    </td>
  );
}

function TdMono({ children }) {
  return <td className="px-4 py-3 align-top font-mono text-[12px] text-slate-300/80">{children}</td>;
}

function StatCard({ icon: Icon, title, value, sub, accent = "from-cyan-500 to-blue-500" }) {
  return (
    <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.25 }} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-4 shadow-xl shadow-black/20">
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-xl bg-gradient-to-tr ${accent} grid place-items-center shadow-md shadow-black/30`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-xs text-slate-300/80">{title}</div>
          <div className="text-2xl font-semibold tracking-tight">{value}</div>
          <div className="text-xs text-slate-400 mt-0.5">{sub}</div>
        </div>
      </div>
    </motion.div>
  );
}

function TableSkeleton() {
  return (
    <div className="p-4 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-10 bg-white/5 rounded-md mb-2" />
      ))}
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/60" onClick={onClose} />
        <div className="absolute inset-0 overflow-y-auto p-6">{children}</div>
      </motion.div>
    </AnimatePresence>
  );
}
