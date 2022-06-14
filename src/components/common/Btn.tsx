
interface BtnProps{
    text:string;
}
export const Btn = ({text}:BtnProps) => {
    return (
        <a className='btn' href=' '>{text}</a>
    )
}


