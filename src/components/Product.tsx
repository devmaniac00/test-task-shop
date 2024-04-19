import React from "react";
import { Button, Card } from "react-bootstrap";
import Image from "next/image";

export type ProductType = {
  category: string;
  description: string;
  images: string[];
  title: string;
  thumbnail: string;
  id: number;
};

const Product = ({ product }: { product: ProductType }) => {
  return (
    <Card style={{ width: "100%", height: "100%" }}>
      <Image
        style={{ height: 300,width:'100%', objectFit:"cover" }}
        src={product.thumbnail}
        width={300}
        alt={'product'}
        height={300}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Button variant="primary" className="mt-auto">
          Purchase
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
