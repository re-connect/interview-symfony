import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import axios from "axios";
import names from "../names";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import BeneficiariesList from "./BeneficiariesList";
import { UserContext } from "../context/UserContext";

const apiEndpoint = "https://avatars.dicebear.com/v2/avataaars/";
const apiOptions = "options[mood][]=happy";
const backendUrl = "https://localhost:8000";
const beneficiariesEndpoint = `${backendUrl}/api/beneficiaries?format=json`;
const loginEndpoint = `${backendUrl}/authentication_token`;

const getAvatar = (name) => `${apiEndpoint}${name}.svg?${apiOptions}`;

function Home() {
  const [registeredBeneficiaries, setRegisteredBeneficiaries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { userToken } = useContext(UserContext);
  const axiosConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };

  const fetchBeneficiaries = async () => {
    const loginResponse = await axios.post(loginEndpoint, {
      email: "tester@gmail.com",
      password: "I@mTheT€ster",
    });
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${loginResponse.data.token}`;
    const response = await axios.get(beneficiariesEndpoint);
    setRegisteredBeneficiaries(response.data["hydra:member"]);
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const beneficiaryNames = [...Array(12).keys()].map((number) => ({
    name: names[Math.floor(Math.random() * names.length)],
    id: Math.floor(Math.random() * Date.now()),
  }));

  // HANDLING SEARCH BAR -----
  const updateSearchQuery = async (e) => {
    let newSearch = e.target.value;
    setSearchQuery((prevSearch) => newSearch);
  };
  const filterSearch = (persons) => {
    return persons.filter((p) => p.name.toLowerCase().includes(searchQuery));
  };
  const filterHandler = (beneficiaries) => {
    if (searchQuery === "") return beneficiaries;
    return filterSearch(beneficiaries);
  };
  // -------------------------

  // HANDLING DB CALLS -----
  const addBeneficiary = async (name) => {
    axios
      .post(`${backendUrl}/api/beneficiaries`, { name }, axiosConfig)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    fetchBeneficiaries();
  };

  const removeBeneficiary = async (id) => {
    axios
      .delete(`${backendUrl}/api/beneficiaries/${id}`, axiosConfig)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    fetchBeneficiaries();
  };
  // -------------------------

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>Bienvenue dans le gestionnaire de bénéficaires Reconnect</h1>
        <Searchbar updateSearch={updateSearchQuery} />
        <hr />
        <h3>Personnes stockées en base</h3>
        <BeneficiariesList
          beneficiaries={filterHandler(registeredBeneficiaries)}
          getAvatar={getAvatar}
          isRegistered={true}
          addBeneficiary={addBeneficiary}
          removeBeneficiary={removeBeneficiary}
        />
        <hr />
        <h3>Personnes non stockées</h3>
        <BeneficiariesList
          beneficiaries={filterHandler(beneficiaryNames)}
          getAvatar={getAvatar}
          isRegistered={false}
          addBeneficiary={addBeneficiary}
          removeBeneficiary={removeBeneficiary}
        />
      </header>
    </div>
  );
}

export default Home;
