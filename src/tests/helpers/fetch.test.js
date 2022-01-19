import { fetchConToken, fetchSinToken } from "../../helpers/fetch";

describe('Pruebas en helper fetch',()=>{

    let token='';
    test('fetch sin token debe funcionar',async()=>{

        const resp=await fetchSinToken('auth',{email:'pbsiguenza@hotmail.com',password:'123456'},'POST');
        expect(resp instanceof Response).toBe(true); 

        const body=await resp.json();
        expect(body.ok).toBe(true);
        token=body.token;

    })

    test('fetch con token debe funcionar',async()=>{

        localStorage.setItem('token',token);
        const resp=await fetchConToken('events/61da04f47f0ffcfc62b6c3b0',{},'DELETE');
        const body=await resp.json();

        expect(body.msg).toBe('no tiene permiso de eliminar este evento')

        //console.log(body);
     

    })

})