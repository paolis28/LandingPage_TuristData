import { BrowserRouter } from 'react-router-dom';
import Rutas from './routes/pagina.routes';

function App() {
  return (
    <BrowserRouter>
      <Rutas/>
    </BrowserRouter>
  );
}

export default App;