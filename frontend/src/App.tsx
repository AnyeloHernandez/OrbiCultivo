import React from 'react';
import { Layout } from './components/Layout';
import { useAgroData } from './hooks/useAgroData';

export const App: React.FC = () => {
  // Hook que sincroniza la petición con los cambios del store
  useAgroData();

  return <Layout />;
};

export default App;
