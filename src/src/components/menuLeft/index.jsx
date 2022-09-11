import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {

    return (
        <aside className='menu-left'>
            <div className='menu-left-content'>
                <ul className='menu-left-list px-1'>
                    <li className='menu-left-link'>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li className='menu-left-link accordion' id='accordionMante'>
                        <Link to="/variables">Mantenimiento</Link>
                    </li>
                    <li className='menu-left-link'>
                        <Link to="/registro">Registro de Incidencias</Link>
                    </li>

                    {/* <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Accordion Item #1
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="accordion" id="accordionSubMenu">
                       <div className="">
                         <li role="button" className='menu-left-link accordion-header' id='headerOne'>
                             <span className="" role="button" data-bs-toggle="collapse" data-bs-target="#consultaOne" aria-expanded="true" aria-controls="collapseOne">
                                 Consultas
                             </span>
                         </li>
                         <div id='consultaOne' className='accordion-collapse collapse' aria-labelledby="headerOne" data-bs-parent="#accordionSubMenu">
                             <div className="accordion-link">
                                 <Link to="/consultas-bitacora">Bitacora</Link>
                             </div>
                             <div className="accordion-link">
                                 <Link to="/consultas">Incidencias</Link>
                             </div>
                         </div>
                       </div>
                    </div>
                    <div><hr /></div>
                </ul>
            </div>
        </aside>
    )
}

export default Menu;