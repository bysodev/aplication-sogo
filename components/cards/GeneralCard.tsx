import Image from "next/image";
import A from '../../public/letra_A.jpg'

export const GeneralCard = ({url}: {url:string}) => {
    url = '../public/letra_a.jpg';
    return (
        <div className="rounded border-gray-300 border-2 flex shadow-md m-2" >
            <Image 
                src={A}
                alt="Letra A"
                width={100}
                height={100}
                className="m-2 shadow"
            />
             <Image 
                src={A}
                alt="Letra A"
                width={100}
                height={100}
                className="m-2 shadow"
            />
        </div>
    )
}