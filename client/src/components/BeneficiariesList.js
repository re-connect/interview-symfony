import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const apiUrl = "https://localhost:8000/beneficiary";

export default function BeneficiariesList({
  beneficiaries,
  getAvatar,
  isRegistered,
}) {
  const { userToken, currentUser } = useContext(UserContext);

  const addBeneficiary = (name) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    axios
      .post(`${apiUrl}/add`, { name })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const removeBeneficiary = (id) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    axios
      .get(`${apiUrl}/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleClick = (beneficiary, index) => {
    console.table(beneficiary.name, isRegistered, currentUser, userToken);
    if (!currentUser) {
      console.log("You need to be connected to interact with database!");
      return;
    }
    isRegistered ? removeBeneficiary(index) : addBeneficiary(beneficiary.name);
  };

  if (beneficiaries.length === 0) {
    return <p>Aucun résultat ici... Essayez une autre recherche!</p>;
  }

  return (
    <div className="Beneficiaries-list">
      {beneficiaries.map((beneficiary, index) => (
        <div className="Beneficiary-card" key={index}>
          <img src={getAvatar(beneficiary.name)} alt={beneficiary.name} />
          <span className="beneficiary-name">{beneficiary.name}</span>
          {isRegistered ? (
            <FontAwesomeIcon
              icon={faMinusCircle}
              onClick={handleClick.bind(this, beneficiary, index)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faPlusCircle}
              onClick={handleClick.bind(this, beneficiary)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
