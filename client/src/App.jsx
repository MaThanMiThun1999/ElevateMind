import React, { useMemo } from 'react';
import Router from './Router';
import { Toaster } from 'react-hot-toast';
import { AnalyticsProvider } from './contexts/analyticsContext';

const App = () => {
  const memoizedToaster = useMemo(() => <Toaster />, []);

  return (
    <>
      <AnalyticsProvider>
        <Router />
        {memoizedToaster}
      </AnalyticsProvider>
    </>
  );
};

export default App;
