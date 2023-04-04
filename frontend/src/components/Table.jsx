import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Table = ({
  setCurrentPage,
  setPerPage,
  data,
  setSearchKey,
  currentPage,
  perPage,
  thead,
}) => {
  const perPageOnchange = (e) => {
    setCurrentPage(1);
    setPerPage(parseInt(e.target.value));
  };
  console.log(data);
  const allProducts = data?.total;
  const total = data?.row;

  const searchOnClick = () => {};
  const searchOnchange = (e) => {
    setSearchKey(e.target.value);
    if (e.target.value.length === 0) {
      setSearchKey("0");
    }
  };
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };
  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <div className="flex m-3 space-x-3">
            {" "}
            <div className="flex border-2 border-emerald-300 h-8 rounded-md bg-emerald-300 text-gray-600">
              <select
                onChange={(e) => perPageOnchange(e)}
                id="cars"
                className=""
              >
                <option value="5">5 Per Page</option>
                <option value="10">10 Per Page</option>
                <option value="20">20 Per Page</option>
                <option value="30">30 Per Page</option>
                <option value="50">50 Per Page</option>
                <option value="100">100 Per Page</option>
                <option value="200">200 Per Page</option>
              </select>
            </div>
            <div className="form-control">
              <div className="input-group">
                <input
                  onChange={(e) => searchOnchange(e)}
                  type="text"
                  placeholder="Search…"
                  className="border-2 h-8 border-emerald-300 p-2 focus:border-emerald-500"
                />
                <button
                  onClick={() => searchOnClick()}
                  className="border border-emerald-600 px-2 hover:bg-emerald-300"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                {thead.map((header, index) => (
                    <th className="px-4 py-3">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {total?.map((product, index) => (
                <tr className="text-gray-700">
                  <td className="px-4 py-3 border">
                    <div className="flex items-center text-sm">
                      <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src={product.image}
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">{product.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ms text-xs border">
                    {product.stock}
                  </td>
                  <td className="px-4 py-3 text-xs border">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      {" "}
                      {product.price}{" "}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs border">
                    {product.category}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex bg-white rounded-lg font-[Poppins]">
            <nav className="">
              <ReactPaginate
                previousLabel="Prev"
                nextLabel="Next"
                pageClassName="flex item-center justify-center p-2 px-4 rounded-md"
                pageLinkClassName="page-link"
                previousClassName="pt-3 text-red-500"
                previousLinkClassName="page-link"
                nextClassName="pt-3 text-red-500"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={allProducts / perPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName="flex gap-3 m-10"
                activeClassName="active bg-emerald-500"
                forcePage={currentPage - 1}
              />
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Table;
