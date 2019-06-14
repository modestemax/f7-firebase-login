import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';


export default class AuthProvider {

    constructor(firebase) {

        console.log('Hello FirebaseuiProvider Provider');
        this.auth = firebase.auth()
        // Initialize the FirebaseUI Widget using Firebase.
        this.ui = new firebaseui.auth.AuthUI(this.auth);
    }

//
    onAuthStateChanged() {
        return new Promise((resolve, reject) => {
            this.auth.onAuthStateChanged(user => {
                if (user) {
                    user.getIdToken().then(accessToken => resolve({ ...user, accessToken }))
                } else
                    resolve(user)
            }, reject)
        })
//
    }

//
    start() {
        return this.ui.start('#firebaseui-auth-container', getUiConfig());
    }
}


function getUiConfig() {
    // FirebaseUI config.

    return {
        callbacks: {
            uiShown() {
                // alert('shown')
            },
            signInFailure(error) {
                alert(error.code)
            },
            signInSuccessWithAuthResult: (authResult) => {
                debugger

                const user = authResult.user;
                const isNewUser = authResult.additionalUserInfo.isNewUser;

                alert(JSON.stringify(user))

                // initialize new user
                if (isNewUser) {
                    // do initialization stuff here (ex. create profile)
                    return false;
                }

                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return false;
            }
        },
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            // {
            //     provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            //     customParameters: {
            //         // Forces account selection even when one account
            //         // is available.
            //         prompt: 'select_account'
            //     }
            // },
            // {
            //     provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            //     scopes: [
            //         'public_profile',
            //         'email'
            //     ]
            // },
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            // firebase.auth.GithubAuthProvider.PROVIDER_ID,
            // firebase.auth.EmailAuthProvider.PROVIDER_ID,
            {
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,// not available for Ionic apps
                // Invisible reCAPTCHA with image challenge and bottom left badge.
                recaptchaParameters: {
                    type: 'image',
                    size: 'invisible',
                    badge: 'bottomleft'
                },
                defaultCountry: 'CM',
                defaultNationalNumber: '6'
            }
        ],
        // Terms of service url.
        // tosUrl: '<your-tos-url>',
        // privacyPolicyUrl: '<your-pp-url>'
        tosUrl: (...args) => {
            debugger;
            console.log(args)
            alert(args[0])
        },
        privacyPolicyUrl: (...args) => {
            debugger;
            console.log(args)
            alert(args[0])

        }
    };
}