
interface BtnProps{
    text:string;
    size:string;
    url:string;
    download:boolean;
}
export const Btn = ({text,size,url,download}:BtnProps) => {
    
    if(download){
        return <a className={`btn ${size}`} href={url} download>{text}</a>
    }else{
        return <a  className={`btn ${size}`} href={url}>{text}</a>
    }
} 


