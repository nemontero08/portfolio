import React, { useState } from 'react';
import { Btn } from '../components/common/Btn';


export const NavBar = () => {

    const [isOpen, setisOpen] = useState(false);
    
    const handleMenu = ()=>{
        setisOpen(!isOpen);
    }   

    return (
    
            <nav>
                
                <a className="logo glowing-txt" href=' '>Nicolas Montero</a>

                <ul className={`navList ${isOpen ? `isOpen` : ` `}`}>
                    <li className='navItem txt-deco' >Inicio</li>
                    <li className='navItem txt-deco' >Sobre mi</li>
                    <li className='navItem txt-deco' >Proyectos</li>
                    <li className='navItem txt-deco' >Contacto</li>
                    <Btn text='Descargar CV'/>
                </ul>
                        <div className={`burgerBtn ${isOpen ? `burgerOpen` : ``}`} onClick={handleMenu}>
                            <div className='burger'></div>
                        </div>
            </nav>
    )            
    
}
