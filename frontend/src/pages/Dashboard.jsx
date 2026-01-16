import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const [leads, setLeads] = useState([]);
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    convertedLeads: 0,
    newLeads: 0,
  });

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/leads?search=${search}&status=${status}&source=${source}&page=${page}&limit=${limit}`
      )
      .then((res) => {
        setLeads(res.data.data);
        setMetrics(res.data.metrics);
      })
      .catch(console.error);
  }, [search, status, source, page]);

  return (
    
    <div style={{ padding: 40 }}>
      <h2>Dashboard</h2>
      <h3>Showing Leads = 10</h3>

      <p>Total Leads: {metrics.totalLeads}</p>
      <p>Converted Leads: {metrics.convertedLeads}</p>
      <p>New Leads: {metrics.newLeads}</p>

      <input
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Status</option>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="converted">Converted</option>
      </select>

      <select value={source} onChange={(e) => setSource(e.target.value)}>
        <option value="">All Sources</option>
        <option value="facebook">Facebook</option>
        <option value="google">Google</option>
        <option value="referral">Referral</option>
      </select>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th >Name</th>
            <th color="red">Email</th>
            <th>Status</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>
                <a href={`/lead/${lead._id}`}>{lead.name}</a>
              </td>
              <td>{lead.email}</td>
              <td>{lead.status}</td>
              <td>{lead.source}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Prev</button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}
