import React from 'react';

function ResultsPreview({ results, onReset }) {
    if (!results) return null;

    // Calculate fake metrics for the "Report"
    const averageMatch = Math.round(results.reduce((acc, curr) => acc + curr.matchScore, 0) / results.length);
    const topGenre = results[0].genre;

    return (
        <div className="fade-in">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ marginBottom: '0.5rem' }}>Analysis Report</h2>
                    <p style={{ margin: 0 }}>Generated on {new Date().toLocaleDateString()}</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-secondary" onClick={() => alert("Export feature coming soon!")}>Export CSV</button>
                    <button className="btn-secondary" onClick={onReset}>Start New Scan</button>
                </div>
            </header>

            {/* Metrics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-color)', lineHeight: 1 }}>{results.length}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Books Identified</div>
                </div>
                <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800', color: averageMatch > 90 ? 'var(--success-color)' : 'var(--accent-color)', lineHeight: 1 }}>{averageMatch}%</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Mood Alignment</div>
                </div>
                <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{topGenre}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Dominant Genre</div>
                </div>
            </div>

            <h3 style={{ marginBottom: '1.5rem' }}>Detailed Recommendations</h3>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {results.sort((a, b) => b.matchScore - a.matchScore).map((book, i) => (
                    <div
                        key={i}
                        className="card"
                        style={{
                            padding: '0',
                            display: 'grid',
                            gridTemplateColumns: 'min-content 1fr auto',
                            overflow: 'hidden',
                            alignItems: 'stretch'
                        }}
                    >
                        {/* Rank / Score Indicator Sidebar */}
                        <div style={{
                            background: i === 0 ? 'var(--accent-color)' : 'var(--bg-color)',
                            width: '6px',
                        }}></div>

                        <div style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <h4 style={{ margin: 0, fontSize: '1.25rem' }}>{book.title}</h4>
                                {i === 0 && <span className="info-badge badge-green">Top Pick</span>}
                            </div>
                            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '1rem' }}>
                                by {book.author} • {book.genre}
                            </p>

                            <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '8px' }}>
                                <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                                    <strong>Why this matches:</strong> {book.matchReason}
                                </p>
                            </div>
                        </div>

                        {/* Score Box */}
                        <div style={{
                            padding: '1.5rem',
                            borderLeft: '1px solid var(--border-color)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minWidth: '120px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-color)' }}>
                                {book.matchScore}
                            </div>
                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: '600', marginTop: '0.25rem' }}>
                                Match Score
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Disclaimer */}
            <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <p>AI analysis may vary. Always double-check book details before reading.</p>
            </div>
        </div>
    );
}

export default ResultsPreview;
