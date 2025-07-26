import React, { useEffect, useState } from "react";
import { medchain_project_backend } from "../../declarations/medchain_project_backend";

function Dashboard({ principalId, onLogout }) {
  const [rekamMedisList, setRekamMedisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
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
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await medchain_project_backend.getAllRekamMedis();
      setRekamMedisList(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age) {
      alert("Name and age are required.");
      return;
    }

    setSubmitting(true);
    try {
      const ageNumber = Number(formData.age);
      await medchain_project_backend.createRekamMedis({
        ...formData,
        umur: ageNumber,
        nama: formData.name,
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
      });

      alert("Data successfully added.");
      fetchData();
      setFormData({
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
      });
    } catch (error) {
      console.error("Failed to add data:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-blue-700">Medical Record Dashboard</h2>
          <p className="text-sm text-gray-500">
            Principal ID: <span className="font-mono">{principalId}</span>
          </p>
        </div>
        <button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow rounded px-6 py-4 mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h3 className="col-span-full text-lg font-semibold mb-2">Add Medical Record</h3>

        {[
          ["name", "Full Name", "text"],
          ["age", "Age", "number"],
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
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            {type === "select" ? (
              <select name={name} value={formData[name]} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <input type={type} name={name} value={formData[name]} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
            )}
          </div>
        ))}

        <div className="col-span-full">
          <button type="submit" disabled={submitting} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {submitting ? "Saving..." : "Add Record"}
          </button>
        </div>
      </form>

      {/* Table */}
      <h3 className="text-xl font-semibold mb-4"> Medical Records</h3>

      {loading ? (
        <p>Loading data...</p>
      ) : rekamMedisList.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-600 text-white uppercase">
              <tr>
                {["ID", "Name", "Age", "Gender", "Birth Date", "Address", "Checkup Date", "Complaint", "Diagnosis", "Treatment", "Prescription", "Doctor", "Hospital", "Status"].map((header) => (
                  <th key={header} className="px-4 py-2 whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rekamMedisList.map(([id, data], index) => (
                <tr key={Number(id)} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 font-mono text-xs text-gray-700">{id}</td>
                  <td className="px-4 py-2">{data.nama}</td>
                  <td className="px-4 py-2">{data.umur}</td>
                  <td className="px-4 py-2">{data.jenis_kelamin}</td>
                  <td className="px-4 py-2">{data.tanggal_lahir}</td>
                  <td className="px-4 py-2">{data.alamat}</td>
                  <td className="px-4 py-2">{data.tanggal_periksa}</td>
                  <td className="px-4 py-2">{data.keluhan}</td>
                  <td className="px-4 py-2">{data.diagnosa}</td>
                  <td className="px-4 py-2">{data.tindakan}</td>
                  <td className="px-4 py-2">{data.resep_obat}</td>
                  <td className="px-4 py-2">{data.dokter}</td>
                  <td className="px-4 py-2">{data.rumah_sakit}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${data.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>{data.is_active ? "Active" : "Inactive"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
