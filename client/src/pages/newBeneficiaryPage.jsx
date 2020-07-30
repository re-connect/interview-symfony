import React, { useState } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';

const backendUrl = "http://localhost:8000";
const beneficiariesEndpoint = `${backendUrl}/api/beneficiaries?format=json`;

const NewBeneficiaryPage = (props) => {
    
    const token = localStorage.getItem('authToken');
    const [beneficiary, setBeneficiary] =  useState({
        name: ""
    });

    const handleChange = event => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setBeneficiary({ ...beneficiary, [name]: value });
    }

    /*const [error, setError] = useState({
        name: "Le nom est oblicatoire"
    })*/
    const history = useHistory();

    const handleSubmit = async event => {
        event.preventDefault();

        try{
            const response = await axios.post(beneficiariesEndpoint, beneficiary, { headers: {"Authorization" : `Bearer ${token}`}})
            history.push("/");

        }catch(error){
            console.log(error.response);
        }
        return <Redirect to="/" />;
    }
        
    return (
        <>
            <div className="App">
                <header className="App-header">
                    <h2>Enregistrement d'un nouveau bénéficiaire</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">Entrez le nom du bénéficiaire</label>
                            <input
                                value={beneficiary.name}
                                onChange={handleChange}
                                type="name"
                                name="name"
                                id="name"
                            />
                        </div>
                        <div>
                            <button className="button" type="submit">Enregistrement</button>
                        </div>
                    </form>
                </header>
            </div>
        </>
    );
};

export default NewBeneficiaryPage;