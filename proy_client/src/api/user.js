import { basepath, apiVersion } from "./config";

export function signUpApi(data){
    const  url = `${basepath}/${apiVersion}/signup`;
    /* http://localhost:3977/api/vi/signup */
    console.log(url)
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
        },
    };

    return fetch(url, params).then((response)=> {
        return response.json();
    });
}