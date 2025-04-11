import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'

const Profile = () => {
const [user, setUser] = useState({})
const [Loading, setLoading] = useState(true)
const [Error, setError] = useState('')
 const fetchUser = async()=>{
    try{
        const res = await axios.get('http://localhost:5000/api/users/profile' ,{ headers:{ Authorization  : `Bearer ${localStorage.getItem('token')}`}  })
         setUser(res.data)
         setLoading(false)
    } catch(err){
        console.error(err)
        setError('Failed to fetch user data')
        setLoading(false)
    }
 }

  useEffect(() => { fetchUser()},[])


  if (Loading) return <div className="p-4">Loading profile...</div>;
  if (Error) return <div className="p-4 text-red-600">{Error}</div>;
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
    <h1 className="text-2xl font-bold mb-4">Profile</h1>

    <div className="mb-6">
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        <p><strong>Reputation:</strong> {user.reputation}</p>
    </div>
  </div>

  )
}

export default Profile