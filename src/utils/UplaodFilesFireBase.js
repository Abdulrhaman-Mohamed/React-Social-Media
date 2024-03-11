
import { ref, getDownloadURL, uploadBytesResumable ,uploadBytes } from "firebase/storage";
import {storage} from '../config/firebase'

export async function UplaodFile(file){
    try {
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = await uploadBytes(storageRef, file);
        const downloadURLImage = await getDownloadURL(uploadTask.ref);
        return downloadURLImage;
    
    } catch (error) {
        console.log(error);
    }
    // const storageRef = ref(storage, `files/${file.name}`);
    // const uploadTask = uploadBytes(storageRef, file);

    // uploadTask.then((value)=>{
    //   // console.log(value);
    //   getDownloadURL(value.ref).then((downloadURLImage)=>{
    //     // console.log(downloadURLImage);
    //   })

    // }).catch((errors)=>{
    //   console.log(errors);
    // })


}