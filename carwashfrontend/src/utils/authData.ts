export const CreateToken = (token: string) =>{
    localStorage.setItem('token', token);
}

export const DeleteToken = () => {
    localStorage.removeItem('token');
}

export const GetToken = () => {
    return localStorage.getItem('token');
}

export const IsAuth = () => { 
    return GetToken()? true : false;
}