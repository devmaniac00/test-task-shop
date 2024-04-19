"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button, Navbar } from "react-bootstrap";
const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Navbar className="bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Test-Shop
        </a>
        <Navbar.Brand>
          {session?.user ? `Welcome ${session.user.name}!` : null}
        </Navbar.Brand>
        {!session ? (
          <Button onClick={() => router.push("/api/auth/signin")}>Login</Button>
        ) : (
          <Button onClick={() => signOut()}>Sing out</Button>
        )}
      </div>
    </Navbar>
  );
};

export default Header;
