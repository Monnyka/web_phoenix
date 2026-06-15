import DashboardLayout from "../components/DashboardLayout";

function ReportsPage() {
  return (
    <DashboardLayout title="Reports" footerNote="Reporting and analytics panel">
      <section className="dashboard-card placeholder-card">
        <h2>Reports</h2>
        <p>Reporting content can be added here.</p>
      </section>
    </DashboardLayout>
  );
}

export default ReportsPage;
