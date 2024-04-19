"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Container, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider>
      <AuthGuard>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </AuthGuard>
      <ToastContainer />
    </SessionProvider>
  );
}

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const router = useRouter();
  if (session.status === "loading") {
    return (
      <Container className="d-flex align-items-center justify-content-center pt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  if (session.status === "unauthenticated") {
    router.push("/api/auth/signin");
    return <div></div>;
  }

  return children;
};
