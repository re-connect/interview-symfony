import React, { useState } from 'react'
import axios from "axios"
import { useHistory } from "react-router-dom";


const Add = ({ email, backendUrl }) => {
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
                console.log(res)
                history.push("/");

            })
            .catch(err => { console.log(err.message) })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        submitNewBeneficiary();
    }

    return (
        <div className="App-header">
            <h1>Ajouter un Bénéficiaire</h1>
            <form classname="container" onSubmit={handleFormSubmit}>
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
