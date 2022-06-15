import React, { useState } from 'react';
import { Btn } from '../components/common/Btn';
export const NavBar = () => {

    const [isOpen, setisOpen] = useState(false);
    
    const handleMenu = ()=>{
        setisOpen(!isOpen);
    }   

    return (
    
            <nav>
                <a className="logo glowing-txt" href='#inicio'>Nicolas Montero</a>
                <ul className={`navList ${isOpen ? `isOpen` : ` `}`}>
                    <li className='navItem txt-deco' onClick={handleMenu}><a href='#inicio' download>Inicio</a></li>
                    <li className='navItem txt-deco' onClick={handleMenu}><a href='#sobreMi'>Sobre mi</a></li>
                    <li className='navItem txt-deco' onClick={handleMenu}><a href='#proyectos'>Proyectos</a></li>
                    <li className='navItem txt-deco' onClick={handleMenu}><a href='#contacto'>Contacto</a></li>
                    <Btn size ='btn-s'text='Descargar CV' url= '/CV_NicolasMontero_2021.pdf' download={true}/>
                </ul>
                        <div className={`burgerBtn ${isOpen ? `burgerOpen` : ``}`} onClick={handleMenu}>
                            <div className='burger'></div>
                        </div>
            </nav>
    )            
    
}
