import { useState } from "react";
import axios from "axios";
import Parse from "../components/htmlParser/parser.component";

const Home = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [containerVisible, setContainerVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [inputText, setInputText] = useState("");

  //config for axios request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //fetch company using external api
  const fetchCompanies = async (company) => {
    try {
      const res = await axios.post(
        "/custom-search",
        { search: company, filter: "company" },
        config
      );
      console.log(res.data);
      setResponse(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  //add company to our mongodb db
  const addCompany = async (name, cin) => {
    setLoading(true);
    const uniqueCin = cin.split("/")[2];
    try {
      const res = await axios.post(
        "http://localhost:5000/api/companies",
        {
          name,
          cin: uniqueCin,
        },
        config
      );
      if (res) {
        history.push("/companies");
      }
      setLoading(false);
      setInputText("");
      setSelectedCompany(null);
    } catch (error) {
      window.alert("Something went wrong");
      setLoading(false);
      setInputText("");
      setSelectedCompany(null);
    }
  };

  //input change handler
  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (e.target.value === "") {
      setResponse("");
    } else {
      fetchCompanies(e.target.value);
    }
  };

  //adding company to db
  const handleSubmit = () => {
    if (!selectedCompany) return;
    else {
      const { name, cin } = selectedCompany;
      addCompany(name, cin);
    }
  };

  return (
    <>
      <div className="input-container">
        <p>{selectedCompany?.name}</p>
        <img
          onClick={() => setContainerVisible(!containerVisible)}
          alt="expand"
          src="https://cdn.iconscout.com/icon/free/png-256/down-arrow-16-460295.png"
        />
      </div>
      {containerVisible && (
        <div className="inside-container">
          <input
            type="text"
            name="company"
            value={inputText}
            onChange={handleInputChange}
          ></input>
          <Parse
            setContainerVisible={setContainerVisible}
            setSelectedCompany={setSelectedCompany}
            data={response}
          />
        </div>
      )}
      <button className="primary-button floating" onClick={handleSubmit}>
        {loading ? "LOADING.." : "SUBMIT"}
      </button>
    </>
  );
};

export default Home;
