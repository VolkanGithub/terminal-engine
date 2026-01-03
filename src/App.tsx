// 1. Import yolunun doğruluğundan emin ol
import BackgroundEffect from './components/BackgroundEffect';

function App() {
  return (
    <div>
      <BackgroundEffect />
      <h1>Portfolio Pro</h1>
    </div>
  );
}

// 2. MUTLAKA export etmelisin. 
// Bu hem ESLint hatasını hem de 'unused' hatasını çözer.
export default App;