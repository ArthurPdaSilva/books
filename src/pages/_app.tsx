import type { AppProps } from "next/app";
import "@/styles/global.scss";
import AuthProvider from "@/contexts/auth";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import Protected from "@/utils/Protected";
import Public from "@/utils/Public";
import ThemeProvider from "@/contexts/Theme";
import "react-toastify/dist/ReactToastify.css";

const authRequired = ["/dashboard", "/profile", "/publications", "/new"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AuthProvider>
      <>
        {authRequired.includes(router.pathname) ? (
          <ThemeProvider>
            <Protected>
              <Component {...pageProps} />
            </Protected>
          </ThemeProvider>
        ) : (
          <Public>
            <Component {...pageProps} />
          </Public>
        )}
        <ToastContainer autoClose={3000} theme="colored" />
      </>
    </AuthProvider>
  );
}
