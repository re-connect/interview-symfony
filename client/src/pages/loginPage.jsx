import React, { useState } from 'react';

const LoginPage = (props) => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const handleChange = event => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({...credentials, [name]: value});
    }

    const handleSubmit = event => {
        event.preventDefault();

        try{

        } catch(error) {
            console.log(error.response);
        }

        console.log(credentials);
    }

    return (
        <>
            <h1>Connexion à l'espace sécurisé</h1>

            <form onSubmit={handleSubmit}>
                <div className="form group">
                    <label htmlFor="email">Entrez votre identifiant</label>
                    <input 
                        value={credentials.email} 
                        onChange={handleChange}
                        type="email" 
                        className="form-control" 
                        name="email" 
                        id="email" 
                    />
                </div>
                <div className="form group">
                    <label htmlFor="password">Entrez votre mot de passe</label>
                    <input 
                        value={credentials.password} 
                        onChange={handleChange}
                        type="password" 
                        className="form-control" 
                        name="password" 
                        id="password" 
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Connexion</button>
                </div>
            </form>
        </>
    );
};

export default LoginPage;