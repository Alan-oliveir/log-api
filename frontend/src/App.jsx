import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { AlertContainer } from './components/layout/AlertContainer';
import { ClientesPage } from './pages/ClientesPage';
import { EntregasPage } from './pages/EntregasPage';
import { DashboardPage } from './pages/DashboardPage';
import { useAlert } from './hooks/useAlert';

function App() {
  const [activeTab, setActiveTab] = useState("clientes");
  const { error, success, showError, showSuccess } = useAlert();

  const renderPage = () => {
    const pageProps = { showError, showSuccess };

    switch (activeTab) {
      case "clientes":
        return <ClientesPage {...pageProps} />;
      case "entregas":
        return <EntregasPage {...pageProps} />;
      case "dashboard":
        return <DashboardPage {...pageProps} />;
      default:
        return <ClientesPage {...pageProps} />;
    }
  };

  return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <AlertContainer error={error} success={success} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderPage()}
        </main>
      </div>
  );
}

export default App;
