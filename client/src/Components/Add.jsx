import React, { useState } from 'react'
import axios from "axios"
import { useHistory } from "react-router-dom";

const backendUrl = 'http://127.0.0.1:8000';

const Add = ({ email }) => {
    const history = useHistory();
    const [name, setName] = useState("");

    const handleInputChange = (e) => {
        setName(e.target.value);
    }

    const submitNewBeneficiary = () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        }
        axios.post(`${backendUrl}/api/beneficiaries`, { name, createdBy: email }, config)
            .then(res => {
                history.push("/");
            })
            .catch(err => { console.log(err.message) })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        submitNewBeneficiary();
    }

    return (
        <div className="background-dark">
            <h1>Ajouter un Bénéficiaire</h1>
            <form className="container-fluid col-xs-9 col-sm-6" onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label">Nom du bénéficiaire</label>
                    <input type="text" name="nameInput" className="form-control" id="nameInput" onChange={handleInputChange} />
                </div>
                <button type="submit" className="btn btn-success">Ajouter un Bénéficiaire</button>
            </form>
        </div>
    )
}

export default Add
