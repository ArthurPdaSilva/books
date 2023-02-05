import type { AppProps } from "next/app";
import "@/styles/global.scss";
import AuthProvider from "@/contexts/auth";
import { useRouter } from "next/router";
import Protected from "@/utils/Protected";
import Public from "@/utils/Public";

const authRequired = ["/dashboard", "/profile", "/publications", "/new"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AuthProvider>
      {authRequired.includes(router.pathname) ? (
        <Protected>
          <Component {...pageProps} />
        </Protected>
      ) : (
        <Public>
          <Component {...pageProps} />
        </Public>
      )}
    </AuthProvider>
  );
}
