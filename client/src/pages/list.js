import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
const ListItem = ({ history }) => {
  const [companies, setCompanies] = useState();
  const [currentPage, setCurrentPage] = useState(0);

  //pagination
  const PER_PAGE = 3;
  const offset = currentPage * PER_PAGE;
  const currentPageData = companies?.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(companies?.length / PER_PAGE);
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  //get list of all companies on backend
  const fetchAllCompanies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/companies");
      setCompanies(res?.data);
    } catch (error) {
      window.alert("Something went wrong");
      history.push("/");
    }
  };

  useEffect(() => {
    fetchAllCompanies();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="list-container">
      <button onClick={() => history.push("/")} className="primary-button">
        Company+
      </button>
      <div className="list-top">
        <p className="list-top-left">Show enteries</p>
        <div className="list-top-right">
          <label htmlFor="something">Search</label>
          <input type="text" />
        </div>
      </div>
      <div className="company-list-container">
        <div className="company-list-item border-bottom">
          <p className="company-list-heading">CIN</p>
          <p className="company-list-heading">Name</p>
        </div>
        {currentPageData?.map((company) => (
          <div className="company-list-item">
            <p className="company-list-heading">{company?.cin}</p>
            <p className="company-list-heading">{company?.name}</p>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link prev"}
        nextLinkClassName={"pagination__link next"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  );
};

export default ListItem;
