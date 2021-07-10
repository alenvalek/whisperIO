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

    // TODO : Forgot password

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email,password)
    }

    const updateProfile = (username) => {
        const currentUser = auth.currentUser;
        return auth.updateCurrentUser(currentUser).then(user => {
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

    const updateProfilePicture = (imageURL) => {
        console.log(imageURL)
        return auth.currentUser.updateProfile({
            photoURL: imageURL
        })
    }

    const value = {
        currentUser,
        signup,
        logout,
        updateProfile,
        login,
        updateProfilePicture,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}


