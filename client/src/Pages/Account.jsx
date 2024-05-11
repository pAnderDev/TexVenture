import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function Account() {
    const{user} = useContext(UserContext) //access the user from any page
    return (
        <div>
            <h1>Account</h1>
            {!!user && (<h2>Welcome {user.username}!</h2>)}
        </div>
    )
}