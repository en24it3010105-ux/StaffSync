import { useState } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  const [role, setRole] = useState('Employee');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function login(e) {
    e.preventDefault();
    setName(name || email.split('@')[0] || 'Employee');
    setPage(role === 'HR Manager' ? 'hr' : 'dashboard');
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#" onClick={() => setPage('home')}>
          <span className="brand-icon">S</span> StaffSync
        </a>
        <nav>
          <button onClick={() => setPage('home')}>Home</button>
          <button onClick={() => setPage('login')}>Login</button>
          <button className="nav-cta" onClick={() => setPage('register')}>
            Get Started
          </button>
        </nav>
      </header>

      {page === 'home' && (
        <main>
          <section className="hero">
            <div className="hero-copy">
              <span className="eyebrow">SMARTER WORKPLACE · BETTER PEOPLE</span>
              <h1>Empower Your Workforce with <span>StaffSync.</span></h1>
              <p>
                One simple platform to manage employees, attendance,
                leave requests and team announcements.
              </p>
              <button className="primary" onClick={() => setPage('register')}>
                Get Started →
              </button>
              <button className="secondary" onClick={() => setPage('login')}>
                Sign In
              </button>
              <div className="trust">✓ Simple · Secure · Built for teams</div>
            </div>
            <div className="hero-card">
              <div className="card-top">
                <span>Team overview</span><span className="live">● Live demo</span>
              </div>
              <div className="welcome">Good morning! 👋</div>
              <p className="muted">Here's what's happening today.</p>
              <div className="stats">
                <div><span>Employees</span><strong>128</strong><small>+12 this month</small></div>
                <div><span>Present today</span><strong>116</strong><small>90.6% attendance</small></div>
              </div>
              <h3>Team activity</h3>
              <div className="activity"><i>👩‍💻</i><span><b>Priya Sharma</b><small>Checked in · 9:02 AM</small></span><em>Present</em></div>
              <div className="activity"><i>🧑‍💼</i><span><b>Rahul Verma</b><small>Leave request submitted</small></span><em className="pending">Pending</em></div>
              <div className="activity"><i>👩‍🎨</i><span><b>Ananya Singh</b><small>Checked in · 9:15 AM</small></span><em>Present</em></div>
            </div>
          </section>
          <section className="features">
            <div className="section-heading"><span className="eyebrow">EVERYTHING IN ONE PLACE</span><h2>Work smarter, together.</h2></div>
            <div className="feature-grid">
              <article><span>👥</span><h3>Employee Management</h3><p>Keep employee details and team information organized.</p></article>
              <article><span>📅</span><h3>Attendance & Leave</h3><p>Track daily attendance and manage leave requests easily.</p></article>
              <article><span>📣</span><h3>Team Announcements</h3><p>Share company updates and keep everyone informed.</p></article>
            </div>
          </section>
        </main>
      )}

      {(page === 'login' || page === 'register') && (
        <main className="auth-wrap">
          <form className="auth-card" onSubmit={login}>
            <div className="auth-symbol">S</div>
            <span className="eyebrow">WELCOME TO STAFFSYNC</span>
            <h1>{page === 'login' ? 'Welcome back' : 'Create your account'}</h1>
            <p className="muted">Manage your work life in one place.</p>
            {page === 'register' && (
              <label>Full name<input required value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" /></label>
            )}
            <label>Email address<input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" /></label>
            <label>Password<input type="password" minLength="4" required placeholder="Enter password" /></label>
            <label>Continue as
              <select value={role} onChange={e => setRole(e.target.value)}>
                <option>Employee</option><option>HR Manager</option>
              </select>
            </label>
            <button className="primary full" type="submit">{page === 'login' ? 'Sign In →' : 'Create Account →'}</button>
            <p className="auth-switch">
              {page === 'login' ? 'New to StaffSync?' : 'Already have an account?'}
              <button type="button" onClick={() => setPage(page === 'login' ? 'register' : 'login')}>
                {page === 'login' ? ' Register' : ' Sign in'}
              </button>
            </p>
            <p className="demo-note">Demo interface · Authentication is not connected to a server.</p>
          </form>
        </main>
      )}

      {page === 'dashboard' && (
        <Dashboard title="Employee Dashboard" name={name || 'Employee'} setPage={setPage} />
      )}
      {page === 'hr' && (
        <Dashboard title="HR Manager Dashboard" name={name || 'HR Manager'} setPage={setPage} manager />
      )}

      <footer>©️ 2026 StaffSync · People first, always.</footer>
    </div>
  );
}

function Dashboard({ title, name, setPage, manager = false }) {
  const [tab, setTab] = useState('Overview');
  const [checkedIn, setCheckedIn] = useState(false);
  const [leave, setLeave] = useState(false);
  const tabs = manager
    ? ['Overview', 'Employees', 'Leave Requests', 'Announcements']
    : ['Overview', 'Attendance', 'My Leaves', 'Profile'];

  return (
    <main className="dashboard">
      <aside className="dash-side">
        <div className="brand"><span className="brand-icon">S</span> StaffSync</div>
        <p className="muted">WORKSPACE</p>
        {tabs.map(t => <button key={t} className={tab === t ? 'side-active' : ''} onClick={() => setTab(t)}>{t}</button>)}
        <button className="logout" onClick={() => setPage('home')}>← Log out</button>
      </aside>
      <section className="dash-content">
        <div className="dash-heading"><div><span className="eyebrow">YOUR WORKSPACE</span><h1>{title}</h1><p>Welcome back, {name}!</p></div><span className="avatar">{name.charAt(0).toUpperCase()}</span></div>
        {tab === 'Overview' && <>
          <div className="dash-stats">
            <article><span>Total Employees</span><strong>{manager ? '128' : '1'}</strong><small>Team members</small></article>
            <article><span>Attendance</span><strong>{checkedIn ? 'Present' : 'Not checked in'}</strong><small>Today's status</small></article>
            <article><span>Leave Requests</span><strong>{leave ? '1' : '0'}</strong><small>Demo requests</small></article>
          </div>
          <div className="panel"><h2>Quick actions</h2><p>Manage your workday with these shortcuts.</p><div className="actions"><button className="primary" onClick={() => setCheckedIn(!checkedIn)}>{checkedIn ? '✓ Checked In' : 'Check In'}</button><button className="secondary" onClick={() => {setTab(manager ? 'Leave Requests' : 'My Leaves'); setLeave(true);}}>Request Leave</button><button className="secondary" onClick={() => setTab(manager ? 'Employees' : 'Profile')}>{manager ? 'View Employees' : 'View Profile'}</button></div></div>
        </>}
        {tab === 'Attendance' && <div className="panel"><h2>Attendance</h2><p>Today's attendance status: <b>{checkedIn ? 'Present' : 'Not checked in'}</b></p><button className="primary" onClick={() => setCheckedIn(!checkedIn)}>{checkedIn ? 'Check Out' : 'Check In Now'}</button></div>}
        {tab === 'My Leaves' && <div className="panel"><h2>My Leave Requests</h2><p>{leave ? 'Your demo leave request is pending.' : 'No leave requests yet.'}</p><button className="primary" onClick={() => setLeave(true)}>Request Leave</button></div>}
        {tab === 'Profile' && <div className="panel"><h2>My Profile</h2><p>Name: {name}</p><p>Role: Employee</p><p>Profile details for this demo session.</p></div>}
        {tab === 'Employees' && <div className="panel"><h2>Employee Management</h2><div className="table-row"><b>Name</b><b>Department</b><b>Status</b></div>{[['Priya Sharma','Engineering','Present'],['Rahul Verma','Design','On Leave'],['Ananya Singh','Marketing','Present']].map(r => <div className="table-row" key={r[0]}>{r.map(v => <span key={v}>{v}</span>)}</div>)}</div>}
        {tab === 'Leave Requests' && <div className="panel"><h2>Leave Requests</h2><p>{leave ? '1 demo request awaiting review.' : 'No pending requests.'}</p><button className="primary" onClick={() => setLeave(false)}>Mark Reviewed</button></div>}
        {tab === 'Announcements' && <div className="panel"><h2>Announcements</h2><p>📣 Welcome to StaffSync! Check this page for team updates.</p></div>}
      </section>
    </main>
  );
}

export default App;