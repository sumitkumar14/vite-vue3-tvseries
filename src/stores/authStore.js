import { defineStore
} from "pinia";
import { ref
} from 'vue';

export const useLoginStatusStore = defineStore('loginStatus',
{
    const isLoggedIn = ref(false)

    function logIn() {
        this.isLoggedIn = true
            console.log("Login", this.isLoggedIn)
    }
    function logOut() {
        this.isLoggedIn = false
        console.log("Logout", this.isLoggedIn)
    }
    return {
       isLoggedIn, logOut, logIn
    }
})