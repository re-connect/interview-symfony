import React from "react";

export default function BeneficiariesList({ beneficiaries, getAvatar }) {
  if (beneficiaries.length === 0) {
    return <p>Aucun résultat ici... Essayez une autre recherche!</p>;
  }

  return (
    <div className="Beneficiaries-list">
      {beneficiaries.map((beneficiary, index) => (
        <div className="Beneficiary-card" key={index}>
          <img src={getAvatar(beneficiary.name)} alt={beneficiary.name} />
          <span>{beneficiary.name}</span>
        </div>
      ))}
    </div>
  );
}
