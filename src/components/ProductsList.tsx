"use client";
import React, { useEffect } from "react";

import Product, { ProductType } from "@/components/Product";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const ProductsList = ({ products }: { products: ProductType[] }) => {
  useEffect(() => {
    if (products.length === 0) {
      toast.warn("No items founded", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [products]);

  return (
    <Container style={{ marginTop: 30 }}>
      <Row style={{ rowGap: 24 }}>
        {products.map((item: ProductType) => (
          <Col xs={12} md={6} lg={4} key={item.id}>
            <Product product={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductsList;
