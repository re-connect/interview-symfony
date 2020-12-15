import React, {useState} from 'react'
import axios from "axios"

const Add = ({email}) => {

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

        axios.post("http://127.0.0.1:8000/api/beneficiaries", {name, createdBy: email}, config)
        .then(res => {
            console.log(res)
    })
        .catch(err => {console.log(err.message)})
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        submitNewBeneficiary();
    }

    return (
        <div className="container w-50">
                        <h1>Ajouter un Bénéficiaire</h1>

            <form onSubmit={handleFormSubmit}>
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
