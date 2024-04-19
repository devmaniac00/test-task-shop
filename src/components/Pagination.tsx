"use client";

import React from "react";
import { Container } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";
import { clsx } from "clsx";

const Pagination = ({ count }: { count: number }) => {
  const params = useSearchParams();
  const router = useRouter();

  const current = new URLSearchParams(params.toString());
  const selectedPage = current.get("page") || 1;
  const changePage = (page: number) => {
    current.set("page", page.toString());
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${query}`);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center mt-5">
      <nav aria-label="...">
        <ul className="pagination">
          <li className="page-item disabled">
            <a className="page-link">Previous</a>
          </li>
          {Array.from(Array(Math.ceil(count / 10)).keys()).map((page) => {
            return (
              <li
                className={clsx("page-item", {
                  active: page + 1 === Number(selectedPage),
                })}
                key={page}
              >
                <button
                  className="page-link"
                  onClick={() => changePage(page + 1)}
                >
                  {page + 1}
                </button>
              </li>
            );
          })}

          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </Container>
  );
};

export default Pagination;
