// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



const appFirebase = async () => {

    try {
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: "AIzaSyDrt_Iy9tQWpHiWKlgd0-msHuxktJo5ri4",
            authDomain: "ypw-account.firebaseapp.com",
            projectId: "ypw-account",
            storageBucket: "ypw-account.appspot.com",
            messagingSenderId: "569850281847",
            appId: "1:569850281847:web:b290ef1a021d42afd7ab72",
            measurementId: "G-MNZ0GSJPQF"
        };

        const app = await initializeApp(firebaseConfig);


        //Analitys
        await getAnalytics(app);

        return app
    } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
    }

}



export { appFirebase }