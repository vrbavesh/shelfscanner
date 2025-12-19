import UploadSection from './components/UploadSection'
import PreferencesForm from './components/PreferencesForm'
import ResultsPreview from './components/ResultsPreview'
import './index.css'

function App() {
  return (
    <div className="app-container">
      <header className="main-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', margin: 0 }}>
          <span className="gradient-text">Bookshelf</span> Match
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '0.5rem' }}>
          Upload your shelf. Find your next read.
        </p>
      </header>

      <main className="main-content">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <UploadSection />
          <PreferencesForm />
          <ResultsPreview />
        </div>
      </main>
    </div>
  )
}

export default App
