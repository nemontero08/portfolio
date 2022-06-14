
interface BtnProps{
    text:string;
    size:string;
    url:string;
}
export const Btn = ({text,size,url}:BtnProps) => {
    return (
        <a className={`btn ${size}`} href={url}>{text}</a>
    )
}


