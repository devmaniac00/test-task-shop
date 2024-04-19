"use client";
import React, { useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash.debounce";

const Filter = ({ categories = [] }: { categories?: [] }) => {
  const params = useSearchParams();
  const router = useRouter();
  const current = new URLSearchParams(params.toString());

  const [searchInput, setSearchInput] = useState(current.get("query") || "");

  const selectedFilter = current.get("filter");
  const changeFilter = (filter: string) => {
    if (filter === "all") {
      router.push(`http://localhost:3000/`);
      return;
    } else {
      current.set("filter", filter);
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${query}`);
  };

  const handleSearch = debounce((term) => {
    if (term === "") {
      router.push(`http://localhost:3000/`);
      return;
    }
    router.push(`?query=${term}`);
  }, 1500);

  const handleChange = (value: string) => {
    handleSearch.cancel();
    handleSearch(value);
    setSearchInput(value);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-secondary">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Dropdown>
              <Dropdown.Toggle
                className=" text-capitalize"
                variant="success"
                id="dropdown-basic"
              >
                {selectedFilter || "Select Filter"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  className="text-decoration-none text-capitalize text-dark"
                  onClick={() => changeFilter("all")}
                >
                  All
                </Dropdown.Item>
                {categories.map((category) => (
                  <Dropdown.Item
                    key={category}
                    className="text-decoration-none text-capitalize text-dark"
                    onClick={() => changeFilter(category)}
                  >
                    {category}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        <Form className="d-flex gap-3" onSubmit={(e) => e.preventDefault()}>
          <Form.Control
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon1"
            value={searchInput}
            onChange={(e) => handleChange(e.target.value)}
          />
        </Form>
      </div>
    </nav>
  );
};

export default Filter;
