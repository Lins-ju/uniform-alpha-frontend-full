import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const baseUrl = "https://sf-system-prod-1.bluecoast-5ba21cd6.uksouth.azurecontainerapps.io/api/filemanager/";

let tokenValue = "";
let userId = "";

const getToken = async () => await SecureStore.getItemAsync("token").then(value => { tokenValue = value });
const getUserId = async () => await SecureStore.getItemAsync("userId").then(value => { userId = value });


export async function createFolder(folderName) {
    await getToken();
    await getUserId();

    const bearerToken = "Bearer " + tokenValue;
    axios.defaults.headers.common.Authorization = bearerToken;

    const createFolderUrl = baseUrl + "createfolder";
    let responseData = null;

    const payload = {
        UserId: userId,
        FolderName: folderName
    };

    await axios.post(createFolderUrl, payload)
        .then(response => {
            responseData = response.data;
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });

    return responseData;
}

export async function saveFile(folderId, fileContent, fileName) {
    await getToken();
    await getUserId();

    const saveFileUrl = baseUrl + "savefile";
    let responseData = null;

    const payload = {
        UserId: userId,
        FolderId: folderId,
        FileContent: fileContent,
        FileName: fileName
    };

    await axios.post(saveFileUrl, payload)
        .then(response => {
            responseData = response.data;
        }).catch(error => {
            console.log(error);
        });

    return responseData;
}

export async function getAllFolderAndFiles() {
    await getToken();
    await getUserId();

    const bearerToken = "Bearer " + tokenValue;
    axios.defaults.headers.common.Authorization = bearerToken;

    const getFolderAndFilesUrl = baseUrl + "getfolderandfiles";
    let responseData = null;

    const payload = {
        UserId: userId
    };

    await axios.post(getFolderAndFilesUrl, payload)
        .then(response => {
            responseData = response.data;
        }).catch(error => {
            console.log(error);
        });

    return responseData;
}

export async function deleteFolder(folderId) {
    await getToken();
    await getUserId();
    const delteFolderUrl = baseUrl + "deletefolder";
    let responseData = null;

    const payload = {
        UserId: userId,
        FolderId: folderId
    };

    await axios.post(delteFolderUrl, payload)
        .then(response => {
            responseData = response.data;
        }).catch(error => {
            console.log(error);
        });

    return responseData;
}

export async function deleteFile(folderId, fileId) {
    await getToken();
    await getUserId();
    const saveFileUrl = baseUrl + "deletefile";
    let responseData = null;

    const payload = {
        UserId: userId,
        FolderId: folderId,
        FileId: fileId
    };

    await axios.post(saveFileUrl, payload)
        .then(response => {
            responseData = response.data;
        }).catch(error => {
            console.log(error);
        });

    return responseData;
}