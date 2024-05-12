import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [user, setUser ] = useState(null);
    //everytime you go to a page check if there is a user
    useEffect(() => {
        if(!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data)
            })
            .catch((error) => {
                console.error('Failed to retrieve user profile', error);
            });
        }
    }, []);
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}