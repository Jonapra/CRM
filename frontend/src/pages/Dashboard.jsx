import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;


  useEffect(() => {
    axios
      axios.get(`http://localhost:5000/api/leads?search=${search}&status=${status}&source=${source}&page=${page}&limit=${limit}`)
      .then((res) => {
        setLeads(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [search,status,source,page]);

  if (loading) {
    return <p style={{ padding: 40 }}>Loading leads...</p>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Dashboard</h2>
      {/* Filter Section */}
      <p>Total Leads: {leads.length}</p>
      <p>Converted Leads: {leads.filter(l => l.status === "converted").length}</p>
      <p>New Leads: {leads.filter(l => l.status === "new").length}</p>

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 20, width: 300 }}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Status</option>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="converted">Converted</option>
      </select>

      <select
        value={source}
        onChange={(e) => setSource(e.target.value)}
        style={{ marginLeft: 10 }}
      >
        <option value="">All Sources</option>
        <option value="facebook">Facebook</option>
        <option value="google">Google</option>
        <option value="referral">Referral</option>
      </select>
      {/* Table to display data */}
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Source</th>
          </tr>
        </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.status}</td>
                <td>{lead.source}</td>
              </tr>
              ))}
          </tbody>
        </table>
        {/* Page Display */}
        <div style={{ marginTop: 20 }}>
          <button onClick={() => setPage(p => Math.max(p - 1, 1))}>
            Prev
          </button>

          <span style={{ margin: "0 10px" }}>Page {page}</span>

          <button onClick={() => setPage(p => p + 1)}>
            Next
          </button>
        </div>


    </div>
  );
}
