import React from "react"
import Header from "../../components/header"
import Main from "../../components/main"

const Home = () => {
    return (
        <div className="vh-100 vw-100">
            <div className="container-fluid">
                <Header></Header>
                <Main></Main>
            </div>
        </div>
    )
}

export default Home;