import React from 'react';

function HeroSection({ onStart }) {
    return (
        <div style={{ textAlign: 'center', margin: '4rem 0' }} className="fade-in">
            <h1 style={{ marginBottom: '1rem' }}>
                Curate Your Next Read
            </h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--text-secondary)' }}>
                Scan your bookshelf to discover hidden gems tailored to your mood.
                Minimal profile, maximum relevance.
            </p>
            <button
                onClick={onStart}
                className="btn-primary"
                style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}
            >
                Scan Your Shelf
            </button>
        </div>
    );
}

export default HeroSection;
