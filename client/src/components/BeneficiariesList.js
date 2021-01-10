import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/UserContext";

export default function BeneficiariesList({
  beneficiaries,
  getAvatar,
  isRegistered,
  addBeneficiary,
  removeBeneficiary,
}) {
  const { currentUser } = useContext(UserContext);

  const handleClick = (beneficiary) => {
    console.log(beneficiary.name, beneficiary.id, isRegistered);
    if (!currentUser) {
      console.error("You need to be connected to interact with database!");
      return;
    }
    isRegistered
      ? removeBeneficiary(beneficiary.id)
      : addBeneficiary(beneficiary.name);
  };

  if (beneficiaries.length === 0) {
    return <p>Aucun résultat ici... Essayez une autre recherche!</p>;
  }

  return (
    <div className="Beneficiaries-list">
      {beneficiaries.map((beneficiary, id) => (
        <div className="Beneficiary-card" key={id}>
          <img src={getAvatar(beneficiary.name)} alt={beneficiary.name} />
          <span className="beneficiary-name">{beneficiary.name}</span>
          {isRegistered ? (
            <FontAwesomeIcon
              icon={faMinusCircle}
              onClick={handleClick.bind(this, beneficiary)}
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
