import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const baseUrl = "https://auth-sf-prod-1.bluecoast-5ba21cd6.uksouth.azurecontainerapps.io/api/authentication/";

export async function checkToken() {
    let tokenValue = "";
    let responseData = null;

    await SecureStore.getItemAsync("token")
    .then(value => {
        tokenValue = value;
    });
    
    if (tokenValue === null) {
        return false;
    };
    if (tokenValue === undefined) {
        return false;
    };

    const payload = {
        Token: tokenValue
    };
    const checkTokenUrl = baseUrl + "checktoken";

    await axios.post(checkTokenUrl, payload)
    .then(response => {
        responseData = response.data;
    }).catch(error => {
        console.log(error);
    });
    
    return responseData.isTokenValid;
}


export async function registerUser(userName, password) {
    const payload = {
        UserName: userName,
        Password: password
    };

    let responseDataObject = null;

    const registerUrl = baseUrl + "register";

    await axios.post(registerUrl, payload)
        .then(response => {
            responseDataObject = response.data
        }).catch(error => {
            console.log(error);
        })

    if(responseDataObject != null)
    {
        await SecureStore.setItemAsync("token", responseDataObject.token);
        await SecureStore.setItemAsync("userId", responseDataObject.userId);

        return responseDataObject;
    }
}

export async function login(userName, password) {
    const payload = {
        UserName: userName,
        Password: password
    };

    let responseDataObject = null;

    const registerUrl = baseUrl + "login";

    await axios.post(registerUrl, payload)
        .then(response => {
            responseDataObject = response.data

        }).catch(error => {
            console.log(error);
        })

    if(responseDataObject != null)
    {
        await SecureStore.setItemAsync("token", responseDataObject.token);
        await SecureStore.setItemAsync("userId", responseDataObject.userId);

        return responseDataObject;
    }


}

export async function signOut()
{
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("userId");
}