import React from 'react';

function HeroSection({ onStart }) {
    return (
        <div className="fade-in">

            {/* 1. Hero Area */}
            <section style={{ textAlign: 'center', padding: '6rem 0 4rem' }}>
                <span style={{
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: 'var(--accent-color)',
                    background: '#e2e8f0',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    marginBottom: '1.5rem',
                    display: 'inline-block'
                }}>
                    AI-Powered Personal Librarian
                </span>
                <h1 style={{ marginBottom: '1.5rem', maxWidth: '800px', margin: '1.5rem auto' }}>
                    Stop Searching. <br />
                    <span style={{ color: 'var(--text-secondary)' }}>Start Reading what Matters.</span>
                </h1>
                <p style={{ fontSize: '1.25rem', maxWidth: '650px', margin: '0 auto 2.5rem', color: 'var(--text-secondary)' }}>
                    Transform your physical bookshelf into a curated reading list.
                    Upload a photo, tell us your mood, and let our advanced AI
                    rediscover the hidden gems gathering dust on your shelf.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                        onClick={onStart}
                        className="btn-primary"
                        style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}
                    >
                        Scan Your Shelf
                    </button>
                    <button
                        className="btn-secondary"
                        style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}
                    >
                        View Demo
                    </button>
                </div>

                <div style={{ marginTop: '4rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <p>Trusted by 10,000+ readers to rediscover their libraries.</p>
                </div>
            </section>

            {/* 2. Feature Grid */}
            <section className="section-container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2>Why Use Bookshelf Match?</h2>
                    <p>We believe the best book recommendations come from the books you already own.</p>
                </div>

                <div className="grid-3">
                    <div className="card">
                        <div className="feature-icon">👁️</div>
                        <h3>Visual Intelligence</h3>
                        <p>
                            Our proprietary computer vision algorithms instantly identify book spines,
                            even in low light or at odd angles. No manual entry required.
                        </p>
                    </div>
                    <div className="card">
                        <div className="feature-icon">🧠</div>
                        <h3>Contextual Understanding</h3>
                        <p>
                            We don't just match keywords. We understand the <em>sentiment</em> and
                            <em>themes</em> of your library to match your exact current mood.
                        </p>
                    </div>
                    <div className="card">
                        <div className="feature-icon">🔒</div>
                        <h3>Private by Default</h3>
                        <p>
                            Your photos are processed ephemerally. We don't store your library
                            data or sell your reading habits to advertisers.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. How It Works */}
            <section className="section-container" style={{ background: 'var(--bg-color)' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2>How It Works</h2>
                    <p>From shelf to sofa in less than 30 seconds.</p>
                </div>

                <div className="grid-3">
                    <div style={{ textAlign: 'center' }}>
                        <div className="step-number">01</div>
                        <h3>Snap a Photo</h3>
                        <p>Take a clear picture of your bookshelf. Our system handles multiple rows and stacked books.</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div className="step-number">02</div>
                        <h3>Set Your Profile</h3>
                        <p>Tell us what you're into right now. Sci-fi? History? Feeling adventurous or intellectual?</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div className="step-number">03</div>
                        <h3>Get Matched</h3>
                        <p>Receive a ranked list of the best books <em>from your own collection</em> that fit your vibe.</p>
                    </div>
                </div>
            </section>

            {/* 4. Footer */}
            <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)', marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                    <h4 style={{ margin: 0 }}>Bookshelf Match</h4>
                    <p style={{ fontSize: '0.9rem', margin: '0.5rem 0 0' }}>© 2025 Bavesh VR.</p>
                </div>
                <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                    <span>Contact Support</span>
                </div>
            </footer>
        </div>
    );
}

export default HeroSection;
