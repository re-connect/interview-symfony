import React, { useState } from 'react';
import axios from "axios";
import { Redirect, useHistory } from 'react-router-dom';

const LoginPage = (props) => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const handleChange = event => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({ ...credentials, [name]: value });
    }

    const history = useHistory();

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const token = await axios
                .post("http://localhost:8000/authentication_token", credentials)
                .then(response => response.data.token);

            window.localStorage.setItem("authToken", token);
            axios.defaults.headers["authorization"] = "Bearer " + token;
            history.push("/");

        } catch (error) {
            console.log(error.response);
        }
        return <Redirect to="/" />;
    }

    return (
        <>
            <div className="App">

                <header className="App-header">
                    <h2>Connexion à l'espace sécurisé</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Entrez votre identifiant</label>
                            <input
                                value={credentials.email}
                                onChange={handleChange}
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div >
                            <label htmlFor="password">Entrez votre mot de passe</label>
                            <input
                                value={credentials.password}
                                onChange={handleChange}
                                type="password"
                                name="password"
                                id="password"
                            />
                        </div>
                        <div>
                            <button className="button" type="submit">Connexion</button>
                        </div>
                    </form>
                </header>

            </div>
        </>
    );
};

export default LoginPage;