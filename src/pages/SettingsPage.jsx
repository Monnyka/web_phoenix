import DashboardLayout from "../components/DashboardLayout";

function SettingsPage() {
  return (
    <DashboardLayout
      title="Settings"
      footerNote="Workspace configuration panel"
    >
      <section className="dashboard-card placeholder-card">
        <h2>Settings</h2>
        <p>Workspace settings content can be added here.</p>
      </section>
    </DashboardLayout>
  );
}

export default SettingsPage;
