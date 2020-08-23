import React, {useState, useEffect} from 'react'
import {Auth} from 'aws-amplify'
import checkUser from './checkUser'

function Admin(props) {
    const [user, updateUser] = useState({})

    useEffect(() => {
        Auth.currentAuthenticatedUser()
          .catch(() => {
            props.history.push('/profile')
          })
          checkUser(updateUser) 
        }, [])


    return (     
        <>       
            <h1>Admin</h1>
            <h2>{user.username}</h2>
        </>
    )
}

export default Admin