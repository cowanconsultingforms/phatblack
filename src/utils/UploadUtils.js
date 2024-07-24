
import Compressor from 'compressorjs';
import { ref, getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

const chooseFile = (event, setNewFile) => {
    if (event.target.files[0].size < 100000000){
        setNewFile(event.target.files[0]);
    } else {
        alert("file too large!");
        window.location.reload();
    } 
    
}

const uploadToFirebase = (newFile, bucket, card) => {
    return new Promise((resolve, reject) => {
        try {
            new Compressor(newFile, {
                quality: 0.1, 
                success: async (compressedResult) => {
                    
                    const storage = getStorage();
                    const storageRef = ref(storage, `${bucket}/${compressedResult.name}`);
                    
                    
                    const uploadTask = uploadBytesResumable(storageRef, compressedResult);
                    const snapshot = await new Promise((resolve, reject) => {
                        uploadTask.on('state_changed',
                            null,
                            (error) => reject(error),
                            () => resolve(uploadTask.snapshot)
                        );
                    });
    
                    
                    console.log('download reached');
                    const url = await getDownloadURL(snapshot.ref);
                    console.log(`doc ref ${bucket}/${card}`);
                    const docRef = doc(db, bucket, card);
                        try {
                            await updateDoc(docRef, {
                                url: url
                            });
                            console.log('Document successfully updated!');
                            resolve();
                        } catch (error) {
                            console.error('Error updating document: ', error);
                            reject(error);
                        }
                },
                error(err) {
                    console.error('Error compressing the image', err);
                    reject(err);
                },
            });
        } catch (error) {
            console.error('Error uploading the file', error);
            reject(error);
        }
    })
}

export { uploadToFirebase, chooseFile };
