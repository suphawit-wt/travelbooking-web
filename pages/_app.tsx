import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.scss'
import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { StoreProvider } from '@/context/StoreContext'
import { AuthContextProvider } from '@/context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
      <>
        <StoreProvider>
          <AuthContextProvider>
            <Component {...pageProps} />
          </AuthContextProvider>
        </StoreProvider>
      </>
    )
  }

}

export default MyApp;