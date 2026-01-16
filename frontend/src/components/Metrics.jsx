export default function Metrics({ leads }) {
  const total = leads.length;
  const converted = leads.filter(l => l.status === "converted").length;

  return (
    <div>
      <h3>Total Leads: {total}</h3>
      <h3>Converted Leads: {converted}</h3>
    </div>
  );
}
