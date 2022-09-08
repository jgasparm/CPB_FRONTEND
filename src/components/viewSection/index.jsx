import React from 'react'
import {useNavigate, Outlet} from "react-router-dom";

const ViewSection = () => {
    const navigate = useNavigate()
    return(
        <section className='content-view-section'>
            <Outlet></Outlet>
        </section>
    )
}

export default ViewSection;