import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { useRouter } from "next/router";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Header from "./components/common/Header";
import { Analytics } from "@vercel/analytics/react";

const publicPages = [
  "/sign-in/[[...index]]",
  "/sign-up/[[...index]]",
  "/",
  "/gallery",
];

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const isPublicPage = publicPages.includes(pathname);

  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <ClerkProvider {...pageProps}>
      <Header />
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
            <SessionContextProvider
              supabaseClient={supabase}
              initialSession={pageProps.initialSession}
            >
              <Component {...pageProps} />
            </SessionContextProvider>
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
      <Analytics />
    </ClerkProvider>
  );
}
