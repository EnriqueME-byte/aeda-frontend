import axios from "axios";
import { useEffect, useState } from "react"


export const useFetch = (url, encabezados, metodo, body = {}) => {

    const [estado, setEstado] = useState({ datos: null });

    useEffect(() => {
        if (url != '') {
            switch (metodo) {
                case '1': //post
                    axios.post(url, body)
                        .then(res => {
                            setEstado({
                                datos: res.data
                            })
                        })
                    break;

                case '2': //delete
                    axios.delete(url,{
                        headers : { 'Authorization' : 'Bearer ' + encabezados.token}
                    }).then(res => {
                        
                    })
                    break;

                case '3': //get
                    console.log("holaaaaa: " + url)
                    axios.get(url,{
                        headers: {
                            'Authorization': 'Bearer ' + encabezados.token
                        }
                    })
                        .then(res => {
                            setEstado({
                                datos: res.data
                            });
                        });
                    break;

                case '4': //put
                    axios.put(url, body,{
                        headers: {
                            'Authorization': 'Bearer ' + encabezados.token
                        }
                    }).then(res => {
                        setEstado({
                            datos : res.data
                        })
                    });
                    break;
            }
        }
    }, [url, metodo]);

    return estado;

}