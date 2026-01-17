import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../services/api";
export default function LeadDetails() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);

  useEffect(() => {
    axios
      api.get(`/api/leads/${id}`)
      .then((res) => setLead(res.data))
      .catch(console.error);
  }, [id]);

  if (!lead) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h2>{lead.name}</h2>
      <p>Email: {lead.email}</p>
      <p>Status: {lead.status}</p>
      <p>Source: {lead.source}</p>
    </div>
  );
}
