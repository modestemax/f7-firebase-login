<template>
    <f7-login-screen :opened="!loggedIn">
        <f7-block-title>{{welcome}}</f7-block-title>
        <div id="firebaseui-auth-container"></div>
    </f7-login-screen>
</template>

<script>
    import AuthProvider from './AuthProvider'
    import 'firebaseui/dist/firebaseui.css'

    export default {
        props: { firebase: { type: Object, required: true }, welcome: String },
        data() {
            return {

                loggedIn: false, //load from cache
            }
        },
        computed: {
            authProvider() {
                return new AuthProvider(this.firebase)
            }
        },
        created() {
            this.authProvider.onAuthStateChanged().then(user => {
                this.loggedIn = !!user;
            });

        },
        mounted() {
            this.authProvider.start('#firebaseui-auth-container');
        }
    }
</script>

<style>
    button.firebaseui-button {
        width: auto;
    }
</style>