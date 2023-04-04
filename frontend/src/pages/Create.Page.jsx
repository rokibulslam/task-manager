import Table from "../components/Table";
import React, { useState } from "react";
import { useGetProductListQuery } from "../redux/features/Product/productSlice";

const CreatePage = () => {
  const [searchKey, setSearchKey] = useState("0");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetProductListQuery({
    currentPage,
    perPage,
    searchKey,
  });
  const thead = [
    "Image", "Title", "Price", "Category" 
  ]
  
  return (
    <Table
      setCurrentPage={setCurrentPage}
      setPerPage={setPerPage}
      data={data}
      setSearchKey={setSearchKey}
      currentPage={currentPage}
      perPage
      thead={thead}
    ></Table>
  );
};

export default CreatePage;
