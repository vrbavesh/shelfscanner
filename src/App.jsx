import { useState } from 'react';
import HeroSection from './components/HeroSection';
import UploadSection from './components/UploadSection';
import PreferencesForm from './components/PreferencesForm';
import ResultsPreview from './components/ResultsPreview';
import { analyzeShelf } from './services/api';
import './index.css';

const STEPS = {
  LANDING: 'LANDING',
  UPLOAD: 'UPLOAD',
  PREFERENCES: 'PREFERENCES',
  ANALYZING: 'ANALYZING',
  RESULTS: 'RESULTS'
};

function App() {
  const [step, setStep] = useState(STEPS.LANDING);
  const [shelfImage, setShelfImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleStart = () => setStep(STEPS.UPLOAD);

  const handleImageSelected = (file, previewUrl) => {
    setShelfImage(file);
    setImagePreview(previewUrl);
    setStep(STEPS.PREFERENCES);
  };

  const handlePreferencesSubmit = async (prefs) => {
    setPreferences(prefs);
    setStep(STEPS.ANALYZING);
    setError(null);

    try {
      // Call Mock Service
      const matches = await analyzeShelf(shelfImage, prefs);
      setResults(matches);
      setStep(STEPS.RESULTS);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
      setStep(STEPS.PREFERENCES); // Go back to prefs on error so they can retry
    }
  };

  const handleReset = () => {
    setStep(STEPS.LANDING);
    setShelfImage(null);
    setImagePreview(null);
    setPreferences(null);
    setResults(null);
    setError(null);
  };

  return (
    <div className="app-container">
      {/* Dynamic Header */}
      <header className="main-header" style={{ marginBottom: '2rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)' }}>
          Bookshelf Match
        </h1>
      </header>

      <main className="main-content">
        {step === STEPS.LANDING && (
          <HeroSection onStart={handleStart} />
        )}

        {step === STEPS.UPLOAD && (
          <UploadSection onImageSelected={handleImageSelected} />
        )}

        {step === STEPS.PREFERENCES && (
          <>
            {/* Show tiny preview of the image they uploaded */}
            {imagePreview && (
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <img src={imagePreview} alt="Selected" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', opacity: 0.8 }} />
              </div>
            )}

            {error && (
              <div style={{ background: '#fef2f2', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #fecaca' }}>
                Error: {error}
              </div>
            )}

            <PreferencesForm onSubmit={handlePreferencesSubmit} />
          </>
        )}

        {step === STEPS.ANALYZING && (
          <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }} className="fade-in">🧠</div>
            <h3>Analyzing Your Bookshelf...</h3>
            <p>Identifying titles and matching with your mood.</p>
            <div style={{ marginTop: '1rem', height: '4px', width: '100%', background: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '50%', background: 'var(--accent-color)', animation: 'indeterminate 1.5s infinite linear' }}></div>
            </div>
            <style>{`
                @keyframes indeterminate {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
             `}</style>
          </div>
        )}

        {step === STEPS.RESULTS && (
          <ResultsPreview results={results} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}

export default App;
