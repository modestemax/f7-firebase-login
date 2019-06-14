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
                isNewUser: false,
                user: null
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
                this.user = user
            });

        },
        mounted() {
            if (!this.loggedIn)
                this.authProvider.start('#firebaseui-auth-container').then(authResult => {
                    this.loggedIn = true
                    this.user = authResult.user
                    this.isNewUser = authResult.additionalUserInfo.isNewUser;
                    this.$emit('loggedIn', { user: this.user, isNewUser: this.isNewUser })
                });
            else
                this.$nextTick(() => this.$emit('loggedIn', { user: this.user, isNewUser: this.isNewUser }))
        }
    }
</script>

<style>
    button.firebaseui-button {
        width: auto;
    }
</style>