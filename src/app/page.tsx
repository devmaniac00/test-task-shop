import Header from "@/components/Header";
import ProductsList from "@/components/ProductsList";
import {
  getAllProducts,
  getProductsCategories,
  searchProducts,
} from "@/modules/api/products";
import Pagination from "@/components/Pagination";
import Filter from "@/components/Filter";
import { useSession } from "next-auth/react";

const Home = async ({
  searchParams,
}: {
  searchParams: { page?: string; filter?: string; query?: string };
}) => {
  let initialData = [];
  if (searchParams.query) {
    initialData = await searchProducts(searchParams.query);
  } else {
    initialData = await getAllProducts(
      Number(searchParams.page),
      searchParams.filter,
    );
  }

  const categories = await getProductsCategories();

  return (
    <>
      <Header />
      <Filter categories={categories} />
      <ProductsList products={initialData.products} />
      <Pagination count={initialData.total} />
    </>
  );
};
export default Home;
