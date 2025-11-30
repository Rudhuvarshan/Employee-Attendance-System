import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function ManagerDashboard() {
  const user = useSelector(s => s.auth?.user);
  const [hoveredCard, setHoveredCard] = useState(null);

  const menuItems = [
    {
      id: 'attendance',
      icon: '📊',
      bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      title: 'All Attendance Records',
      description: 'View comprehensive attendance data for all team members',
      link: '/manager/all',
      stats: 'Real-time tracking'
    },
    {
      id: 'calendar',
      icon: '📅',
      bgGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      title: 'Calendar View',
      description: 'Track attendance patterns in a calendar format',
      link: '/manager/calendar',
      stats: 'Month overview'
    },
    {
      id: 'reports',
      icon: '📈',
      bgGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      title: 'Reports & Analytics',
      description: 'Generate and analyze attendance reports',
      link: '/manager/reports',
      stats: 'Detailed insights'
    }
  ];

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.headerSection}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.mainHeading}>Manager Dashboard</h1>
            <p style={styles.subHeading}>Welcome back, <span style={styles.userName}>{user?.name || 'Manager'}</span></p>
          </div>
          <div style={styles.headerStats}>
            <div style={styles.statBox}>
              <div style={styles.statNumber}>4</div>
              <div style={styles.statLabel}>Team Members</div>
            </div>
            <div style={styles.statBox}>
              <div style={styles.statNumber}>98%</div>
              <div style={styles.statLabel}>Attendance Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Cards */}
      <div style={styles.mainGrid}>
        {menuItems.map((item) => (
          <Link key={item.id} to={item.link} style={styles.cardLinkWrapper}>
            <div
              style={{
                ...styles.mainCard,
                ...(hoveredCard === item.id ? styles.mainCardHover : {})
              }}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{...styles.cardGradientBg, backgroundImage: item.bgGradient}}>
                <div style={styles.cardIconContainer}>{item.icon}</div>
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.mainCardTitle}>{item.title}</h3>
                <p style={styles.mainCardDescription}>{item.description}</p>
                <div style={styles.cardStats}>
                  <span style={styles.cardStatsText}>{item.stats}</span>
                  <span style={styles.cardArrow}>→</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Stats Section */}
      <div style={styles.statsSection}>
        <h2 style={styles.sectionTitle}>📊 Today's Snapshot</h2>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{...styles.statCardIcon, backgroundColor: '#e8f5e9'}}>✓</div>
            <div style={styles.statCardContent}>
              <div style={styles.statCardValue}>12</div>
              <div style={styles.statCardLabel}>Checked In</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statCardIcon, backgroundColor: '#fff3e0'}}>⊙</div>
            <div style={styles.statCardContent}>
              <div style={styles.statCardValue}>2</div>
              <div style={styles.statCardLabel}>Late Check-in</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statCardIcon, backgroundColor: '#ffebee'}}>✕</div>
            <div style={styles.statCardContent}>
              <div style={styles.statCardValue}>1</div>
              <div style={styles.statCardLabel}>Absent</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statCardIcon, backgroundColor: '#e3f2fd'}}>⏱</div>
            <div style={styles.statCardContent}>
              <div style={styles.statCardValue}>11</div>
              <div style={styles.statCardLabel}>Checked Out</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div style={styles.tipsSection}>
        <h2 style={styles.sectionTitle}>💡 Pro Tips</h2>
        <div style={styles.tipsGrid}>
          <div style={styles.tipCard}>
            <div style={{...styles.tipNumber, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>1</div>
            <h4 style={styles.tipTitle}>Real-time Monitoring</h4>
            <p style={styles.tipDescription}>Monitor team attendance in real-time using the All Records view for instant updates</p>
          </div>
          <div style={styles.tipCard}>
            <div style={{...styles.tipNumber, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>2</div>
            <h4 style={styles.tipTitle}>Pattern Analysis</h4>
            <p style={styles.tipDescription}>Use the Calendar View to identify attendance patterns and trends over time</p>
          </div>
          <div style={styles.tipCard}>
            <div style={{...styles.tipNumber, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>3</div>
            <h4 style={styles.tipTitle}>Data-Driven Decisions</h4>
            <p style={styles.tipDescription}>Generate comprehensive reports for performance analysis and decision making</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f8f9fc',
    minHeight: '100vh',
    padding: '0',
    fontFamily: "'Segoe UI', 'Roboto', sans-serif"
  },
  headerSection: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '48px 24px',
    color: '#fff',
    borderRadius: '0 0 24px 24px',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mainHeading: {
    fontSize: '36px',
    fontWeight: '700',
    margin: '0 0 8px 0',
    letterSpacing: '-0.5px'
  },
  subHeading: {
    fontSize: '16px',
    margin: '0',
    opacity: '0.95',
    lineHeight: '1.5'
  },
  userName: {
    fontWeight: '700',
    opacity: '1'
  },
  headerStats: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  },
  statBox: {
    background: 'rgba(255, 255, 255, 0.15)',
    padding: '16px 24px',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
    textAlign: 'center',
    minWidth: '120px',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '12px',
    opacity: '0.9',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '28px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 24px'
  },
  cardLinkWrapper: {
    textDecoration: 'none',
    color: 'inherit'
  },
  mainCard: {
    background: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    border: '1px solid #e8edf5',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  mainCardHover: {
    boxShadow: '0 12px 32px rgba(102, 126, 234, 0.2)',
    transform: 'translateY(-8px)'
  },
  cardGradientBg: {
    height: '120px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  cardIconContainer: {
    fontSize: '48px',
    lineHeight: '1',
    zIndex: '2'
  },
  cardContent: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    flex: '1'
  },
  mainCardTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a237e',
    margin: '0 0 10px 0',
    letterSpacing: '-0.3px'
  },
  mainCardDescription: {
    fontSize: '13px',
    color: '#666',
    margin: '0 0 16px 0',
    lineHeight: '1.6',
    flex: '1'
  },
  cardStats: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '12px',
    borderTop: '1px solid #e8edf5',
    marginTop: 'auto'
  },
  cardStatsText: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#667eea',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  cardArrow: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#667eea',
    transition: 'transform 0.3s ease'
  },
  statsSection: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 24px'
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1a237e',
    margin: '0 0 24px 0',
    letterSpacing: '-0.3px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px'
  },
  statCard: {
    background: '#fff',
    padding: '24px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    border: '1px solid #e8edf5',
    transition: 'all 0.3s ease'
  },
  statCardIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    lineHeight: '1',
    fontWeight: '700'
  },
  statCardContent: {
    flex: '1'
  },
  statCardValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a237e',
    lineHeight: '1'
  },
  statCardLabel: {
    fontSize: '12px',
    color: '#999',
    marginTop: '4px',
    fontWeight: '500'
  },
  tipsSection: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 24px'
  },
  tipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px'
  },
  tipCard: {
    background: '#fff',
    padding: '28px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    border: '1px solid #e8edf5',
    transition: 'all 0.3s ease',
    position: 'relative',
    paddingLeft: '72px'
  },
  tipNumber: {
    position: 'absolute',
    left: '20px',
    top: '20px',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '700',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
  },
  tipTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#1a237e',
    margin: '0 0 8px 0',
    letterSpacing: '-0.2px'
  },
  tipDescription: {
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.6',
    margin: '0'
  }
};