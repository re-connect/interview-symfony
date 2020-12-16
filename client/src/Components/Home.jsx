import React, { useState, useEffect } from 'react'
import axios from "axios";
import names from '../names';



const Home = ({ email, password, backendUrl }) => {

  const beneficiariesEndpoint = `${backendUrl}/api/beneficiaries?format=json`;
  const loginEndpoint = `${backendUrl}/authentication_token`;

  const apiEndpoint = 'https://avatars.dicebear.com/v2/avataaars/';
  const apiOptions = 'options[mood][]=happy';
  const getAvatar = (name) => `${apiEndpoint}${name}.svg?${apiOptions}`;

  const [registeredBeneficiaries, setRegisteredBeneficiaries] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([...Array(12).keys()].map((number) => ({
    name: names[Math.floor(Math.random() * names.length)],
  })));

  const fetchBeneficiaries = async () => {
    const loginResponse = await axios.post(loginEndpoint, {
      email,
      password,
    })

    const config = {
      headers: {
        'Authorization': `Bearer ${loginResponse.data.token}`
      }
    }
    const response = await axios.get(beneficiariesEndpoint, config);
    setRegisteredBeneficiaries(response.data['hydra:member']);
  };

  const deleteBeneficiaries = async (id) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`
      }
    }
    const deleteRequest = await axios.delete(`${backendUrl}/api/beneficiaries/${id}`, config);
  }

  const handleDelete = (id) => {
    deleteBeneficiaries(id);
    fetchBeneficiaries();
  }

  useEffect(() => {
    fetchBeneficiaries();
  }, []);


  return (
    <header className='App-header'>
      <h1>Bienvenue dans le gestionnaire de bénéficaires Reconnect</h1>
      <hr />
      <h3>Personnes stockées en base</h3>
      <div className='Beneficiaries-list'>
        {registeredBeneficiaries.map((beneficiary) => (
          <div className='Beneficiary-card' key={beneficiary.id}>
            <img src={getAvatar(beneficiary.name)} alt={beneficiary.name} />
            <span>{beneficiary.name}</span>
            <button className="btn btn-sm btn-danger d-block my-0 mx-auto" onClick={() => handleDelete(beneficiary.id)}>Supprimer</button>
          </div>
        ))}
      </div>
      <hr />
      <h3>Personnes non stockées</h3>
      <div className='Beneficiaries-list'>
        {beneficiaries.map((beneficiary, index) => (
          <div className='Beneficiary-card' key={beneficiary.name + index}>
            <img src={getAvatar(beneficiary.name)} alt={beneficiary.name} />
            <span>{beneficiary.name}</span>
          </div>
        ))}
      </div>
    </header>
  )
}

export default Home
