
import { NavBar } from './layout/NavBar'
import { Hero } from './views/Hero'

export const Portfolio = () => {
    return (
        <>
            <NavBar/>
            <Hero/>
            <div id="sobreMi" className='box'><h1>Sobre mi</h1></div>
            <div id="proyectos" className='box'><h1>Proyectos</h1></div>
            <div id="contacto" className='box'><h1>Contacto</h1></div>
        </>
    )
}
