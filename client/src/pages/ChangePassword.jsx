import { useState } from 'react'
import './Profile.css'
import axios from 'axios'


const ChangePassword = () => {

    const [oldCode, setoldCode] = useState('')
    const [newCode, setnewCode] = useState('')


    const ChangePassword = () => {
    
        axios.put('http://localhost:3003/auth/changePassword', { oldPassword: oldCode, newPassword: newCode }, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then((res) => {
            if (res.data.error) {
                alert(res.data.error)
            } else {
                alert('Password changed successfully')
            }
        })

}


    return (
        <div>
            <h1>Change your Password</h1>
            <input type="text" placeholder="Old Password" onChange={(e) => { setoldCode(e.target.value) }} />


            <input type="text" placeholder="New Password" onChange={(e) => { setnewCode(e.target.value) }} />


            <button onClick={ChangePassword} className='password'>Save Changes</button>
        </div>
    )
}

export default ChangePassword
