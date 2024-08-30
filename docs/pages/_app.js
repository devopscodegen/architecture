import { GoogleAnalytics } from '@next/third-parties/google';
import './styles.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="GTM-NF267TL6" />
    </>
  );
}
