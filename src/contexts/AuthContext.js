import React, { useState, useEffect, useContext } from 'react'

import {auth} from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const signup = (email, password, username) => {
        return auth.createUserWithEmailAndPassword(email, password)
        .then(authenticate => {
            return authenticate.user.updateProfile({
                displayName: username
            })
        })
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email,password)
    }

    const updateProfile = (username) => {
        return auth.updateCurrentUser(auth.currentUser).then(user => {
            user.displayName = username;
        }).catch(err => console.log(err))
    }


    const logout = (email,password) => {
        auth.signOut()
    }


    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            if(user){
                setCurrentUser(user)
            }
            setLoading(false)
            setCurrentUser(user)
        })
        return unsub
    }, [])

    

    const value = {
        currentUser,
        signup,
        logout,
        updateProfile,
        login
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}


