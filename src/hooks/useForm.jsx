import { useState } from "react"


const useForm = (valoresIniciales = {} ) => {
    
    const [valores, setValores] = useState(valoresIniciales)

    const setOnchangeValores = ({target}) => {
        setValores({
            ...valores,
            [target.name]: target.value
        })
    }

    const resetarFormulario = () => {
        setValores(valoresIniciales)
    }


    return {
        valores,
        setOnchangeValores,
        resetarFormulario
    }
}

export {
    useForm
}