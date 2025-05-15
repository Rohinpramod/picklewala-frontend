import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './redux/features/store.js';
import { Provider} from 'react-redux'
import { Toaster } from 'react-hot-toast'

const MaintenanceMessage = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
    textAlign: 'center',
    background:'black',
    color:'white'
  }}>
    <h1>🚧 Server Under Maintenance 🚧</h1>
    <p>We'll be back shortly. Thank you for your patience!</p>
  </div>
);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <MaintenanceMessage />
    {/* <App /> */}
    <Toaster />
    </Provider >
)
