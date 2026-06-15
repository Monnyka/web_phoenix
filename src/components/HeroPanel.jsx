import heroImg from "../assets/hero.png";

function HeroPanel() {
  return (
    <section className="hero-panel">
      <div className="hero-art" aria-hidden="true">
        <img src={heroImg} alt="" />
      </div>
      <p className="hero-kicker">Welcome back</p>
      <h1>Sign in to Phoenix Dashboard</h1>
      <p className="hero-subtext">
        Enter your email and password to continue to your workspace.
      </p>
    </section>
  );
}

export default HeroPanel;
