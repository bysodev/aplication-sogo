'use client'
import { Enunciados } from "@/components/cards/Enunciados";
import { GeneralCard } from "@/components/cards/GeneralCard"
import Camara from '@/components/camara/Camara'
import Image from "next/image";
import A from '@/public/letra_A.jpg'
import { FooterLesson } from '@/components/progress/FooterLesson';
import { ModalLesson } from '@/components/progress/ModalLesson';
import { useRef, useState } from "react";
import { Progressbar } from '@/components/progress/Progressbar';
import Cookies from 'js-cookie'


const vocales = ['A', 'E', 'I', 'O', 'U'];
async function verification(img: string) {
    // Busca la posición del caracter ","
    let comma_index = img?.indexOf(",");

    // Extrae el contenido base64 después de la ","
    let base64_content = img?.slice(comma_index + 1);

    console.log(img)
    const jwt = Cookies.get('token')

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${jwt}`);

    var raw = JSON.stringify({
        "learn": "numeros",
        "imagen": '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',
        "extension": "png",
        "tipo": "byte64"
    });

    const res = await fetch(`http://127.0.0.1:8000/user/lesson`, {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        credentials: 'include',
        redirect: 'follow'
    });

    return res;        


    console.log(res);
}

export default function LessonVocales(){
    const webcamRef = useRef(null);
    const [imagen, setImagen] = useState('');
    let [isOpen, setIsOpen] = useState(true)
    const [progres, setprogress] = useState({preguntas: 5, porcentaje: 0, asiertos: 0, tipo: 'vocales', continue: false });

    console.log(typeof imagen)

    const cambio = async () => {
        console.log(progres.porcentaje)
        if( progres.porcentaje != 100) {
            if(typeof imagen === 'string'){
                const respuesta = await verification(imagen)
                if(respuesta.ok){
                    setprogress( pro => ({
                        ...pro,
                        asiertos: pro.asiertos + 1,
                        porcentaje: ( (pro.asiertos + 1) / pro.preguntas ) * 100,
                        continue: true
                    }))
                }
                console.log(respuesta);                            
            }
        }
    }
    const changeContinue = () => {

        setprogress( pro => ({
            ...pro,
            continue: false
        }))
    }
    console.log(progres)
    return <>

        { progres.porcentaje === 100 ?
            <ModalLesson isOpen={isOpen} setIsOpen={setIsOpen} /> : ''
        }

        <div className='flex flex-row flex-wrap justify-center w-full'>
            <Progressbar porcentaje={progres.porcentaje} />
            <button onClick={ () => {
                  setprogress( pro => ({
                    ...pro,
                    asiertos: pro.asiertos + 1,
                    porcentaje: ( (pro.asiertos + 1) / pro.preguntas ) * 100,
                    continue: true
                }))
            } } >CLICK</button>
            <div className='flex w-4/5 justify-between'>
                <div className='w-2/5 m-2'>
                    <div className="flex flex-col justify-center rounded-xl shadow-md">
                        <Image 
                            src={A}
                            alt="Letra A"
                        />
                    </div>
                </div>
                <div className='w-2/5'>
                    {/* <Camara webcamRef={webcamRef} imagen={imagen} setImagen={setImagen}  /> */}
                </div>
            </div>
            <FooterLesson imagen={imagen} comprobation={cambio} continuar={progres.continue} changeContinue={changeContinue} />
        </div>
    </>
}