import Amplify, { Auth } from 'aws-amplify';

let flag=false;

const cogAuth=(IDENTITYPOOLID,REGION,IDENTITYPOOLREGION,USERPOOLID,USERPOOLWEBCLIENT)=>{
    Amplify.configure({
    Auth:{
        identityPoolId: IDENTITYPOOLID,
        region: REGION,
        identityPoolRegion: IDENTITYPOOLREGION,
        userPoolId: USERPOOLID,
        userPoolWebClientId: USERPOOLWEBCLIENT,
        }
    } 
    ).then(cred => {
        // If success, you will get the AWS credentials
        flag=true;
        return Auth.currentAuthenticatedUser();
    }).then(user => {
        // If success, the user object you passed in Auth.federatedSignIn
        console.log(user);
    }).catch(e => {
        console.log(e)
    });
    }
    
export default cogAuth
export const cogAuthres=flag;