import React from 'react'

const Single = ({ match }) => {
    return (
        <div className=" background-dark container-fluid ">
            Vous consultez la page du Bénéficiaire {match.params.name}
        </div>
    )
}

export default Single
