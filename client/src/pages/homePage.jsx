import React, { useEffect, useState } from 'react';
import names from "../names";
import axios from "axios";
import authentication from '../services/authentication';
import jwtDecode from 'jwt-decode';


const apiEndpoint = "https://avatars.dicebear.com/v2/avataaars/";
const apiOptions = "options[mood][]=happy";
const backendUrl = "http://localhost:8000";
const beneficiariesEndpoint = `${backendUrl}/api/beneficiaries?format=json`;

const getAvatar = name => `${apiEndpoint}${name}.svg?${apiOptions}`;
authentication.decode();

const HomePage = ({ isAuthenticated }) => {

    const token = localStorage.getItem('authToken');

    //const jwtData = jwtDecode(token);
    //const username = jwtData.username;
    
    const [registeredBeneficiaries, setRegisteredBeneficiaries] = useState(
        []
    );
    const [result, setResult] = useState(
        []
    );

    useEffect(() => {
        axios.get(beneficiariesEndpoint, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => response.data['hydra:member'])
            .then(data => setRegisteredBeneficiaries(data));
    }, [])

    const beneficiaryNames = [...Array(12).keys()].map(number => ({
        name: names[Math.floor(Math.random() * names.length)]
    }));

    const handleResult = event => {
        const value = event.currentTarget.value;
        setResult(value);
    }

    const filteredBeneficiaries = registeredBeneficiaries.filter(b => b.name.toLowerCase().includes(result));

    return (
        <div className="App">
            <header className="App-header">
                {(!isAuthenticated && (<>
                    <h1>Bienvenue dans le gestionnaire de bénéficaires Reconnect</h1>
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
                    <hr />
                </>)) || (<>
                <h1>Bienvenue </h1>
                    <div>
                        <input type="text" onChange={handleResult} value={result} placeholder="Rechercher" />
                    </div>
                    <h3>Personnes stockées en base</h3>
                    <div className="Beneficiaries-list">
                        {filteredBeneficiaries.map((beneficiary) => (
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
                </>)}


            </header>
        </div>
    );
};

export default HomePage;