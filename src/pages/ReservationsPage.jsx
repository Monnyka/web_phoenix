import DashboardLayout from "../components/DashboardLayout";

function ReservationsPage() {
  return (
    <DashboardLayout
      title="Reservations"
      footerNote="Reservation management panel"
    >
      <section className="dashboard-card placeholder-card">
        <h2>Reservations</h2>
        <p>Reservation management content can be added here.</p>
      </section>
    </DashboardLayout>
  );
}

export default ReservationsPage;
