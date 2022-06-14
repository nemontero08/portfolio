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
                    <li className='navItem txt-deco' ><a href='#inicio'>Inicio</a></li>
                    <li className='navItem txt-deco' ><a href='#sobreMi'>Sobre mi</a></li>
                    <li className='navItem txt-deco' ><a href='#proyectos'>Proyectos</a></li>
                    <li className='navItem txt-deco' ><a href='#contacto'>Contacto</a></li>
                    <Btn size ='btn-s'text='Descargar CV' url= ' '/>
                </ul>
                        <div className={`burgerBtn ${isOpen ? `burgerOpen` : ``}`} onClick={handleMenu}>
                            <div className='burger'></div>
                        </div>
            </nav>
    )            
    
}
