import React, { useEffect, useState } from 'react';
import names from "../names";
import Navbar from '../components/navbar';
import axios from "axios";


const apiEndpoint = "https://avatars.dicebear.com/v2/avataaars/";
const apiOptions = "options[mood][]=happy";
const backendUrl = "http://localhost:8000";
const beneficiariesEndpoint = `${backendUrl}/api/beneficiaries?format=json`;

const getAvatar = name => `${apiEndpoint}${name}.svg?${apiOptions}`;

const HomePage = (props) => {

    const token = localStorage.getItem('authToken');
    const [registeredBeneficiaries, setRegisteredBeneficiaries] = useState(
        []
    );

    useEffect(() => {
        axios.get(beneficiariesEndpoint, { headers: {"Authorization" : `Bearer ${token}`}})
             .then(response => response.data['hydra:member'])
             .then(data => setRegisteredBeneficiaries(data));
    }, [])
   
    const beneficiaryNames = [...Array(12).keys()].map(number => ({
        name: names[Math.floor(Math.random() * names.length)]
    }));

    return (
        <div className="App">

            <header className="App-header">
                <Navbar />
                <h1>Bienvenue dans le gestionnaire de bénéficaires Reconnect</h1>
                <hr />
                <h3>Personnes stockées en base</h3>
                <div className="Beneficiaries-list">
                    {registeredBeneficiaries.map((beneficiary) => (
                        <div className="Beneficiary-card" key={beneficiary.id}>
                            <img src={getAvatar(beneficiary.name)} alt={beneficiary.name} />
                            <span>{beneficiary.name}</span>
                        </div>
                    ))}
                </div>
                <hr />
                <h3>Personnes non stockées</h3>
                <div className="Beneficiaries-list">
                    {beneficiaryNames.map((beneficiary, index) => (
                        <div className="Beneficiary-card" key={beneficiary.name + index}>
                            <img src={getAvatar(beneficiary.name)} alt={beneficiary.name} />
                            <span>{beneficiary.name}</span>
                        </div>
                    ))}
                </div>
            </header>
        </div>
    );
};

export default HomePage;