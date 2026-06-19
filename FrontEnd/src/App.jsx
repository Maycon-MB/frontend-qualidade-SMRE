import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import AppRoutes from './AppRoutes';
import ChatButton from './Pages/Components/ChatButton';

function App() {
  return (
    <div className="App">

      <AppRoutes />
      <ChatButton />

    </div>
  );
}

export default App;
