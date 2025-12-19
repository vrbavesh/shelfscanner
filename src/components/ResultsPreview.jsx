import React from 'react';

function ResultsPreview({ results, onReset }) {
    if (!results) return null;

    return (
        <div className="fade-in" style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0 }}>Top Recommendations</h3>
                <button className="btn-secondary" onClick={onReset} style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                    Scan Again
                </button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {results.sort((a, b) => b.matchScore - a.matchScore).map((book, i) => (
                    <div
                        key={i}
                        className="card"
                        style={{
                            padding: '1.5rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderLeft: i === 0 ? '4px solid var(--accent-color)' : '1px solid var(--border-color)'
                        }}
                    >
                        <div>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{book.title}</h4>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>by {book.author}</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                                {book.matchReason}
                            </p>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <span style={{
                                display: 'inline-block',
                                background: i === 0 ? 'var(--accent-color)' : 'var(--surface-color)',
                                color: i === 0 ? 'white' : 'var(--text-secondary)',
                                border: i === 0 ? 'none' : '1px solid var(--border-color)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '20px',
                                fontSize: '0.85rem',
                                fontWeight: '600'
                            }}>
                                {book.matchScore}% Match
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ResultsPreview;
