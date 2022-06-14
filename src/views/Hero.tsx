import { Btn } from "../components/common/Btn"

export const Hero = () => {
    return (
        <div id="inicio" className="hero-cont">
            <div className="hero">
                <p className="title">Hola, soy</p>
                <h1 className="glowing-txt titan">NICOLAS MONTERO</h1>
                <p className="title last-txt">Desarrollador Front-end</p>
                <Btn size="btn-l" text="Contactame!" url="#contacto"/>
            </div>
        </div>
    )
}
