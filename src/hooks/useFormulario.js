import { useState } from "react"


export const useFormulario = (estadoInicial = {}) => {
    const [form, setForm] = useState(estadoInicial);

    const cambiarInput = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    return [form,cambiarInput];
}