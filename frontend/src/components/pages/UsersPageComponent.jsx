import { useEffect, useState } from "react"
import { getUsers } from "../../services/users"

const UsersPageComponent = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        getUsers()
            .then((response) => setUsers(response.data))
            .catch((e) => console.log(e))
    }, [])
    // const users = [
    //     {
    //         "id": 2,
    //         "first_name": "Danil",
    //         "last_name": "Li",
    //         "email": "danil.li24x@gmail.com",
    //         "password": "$2b$10$F.YcUdymTmbptucGHk3mqOY.0yZllXDHcXZyHANbL6F/Qea7zzCH.",
    //         "chat_id": "819151572",
    //         "role": "ADMIN",
    //         "username": "lIlllIIIlIIIlIIIl",
    //         "created_at": "2024-07-04T22:11:57.009Z",
    //         "updated_at": "2024-07-04T22:11:57.009Z"
    //     },
    //     {
    //         "id": 2,
    //         "first_name": "Danil",
    //         "last_name": "Li",
    //         "email": "danil.li24x@gmail.com",
    //         "password": "$2b$10$F.YcUdymTmbptucGHk3mqOY.0yZllXDHcXZyHANbL6F/Qea7zzCH.",
    //         "chat_id": "819151572",
    //         "role": "ADMIN",
    //         "username": "lIlllIIIlIIIlIIIl",
    //         "created_at": "2024-07-04T22:11:57.009Z",
    //         "updated_at": "2024-07-04T22:11:57.009Z"
    //     },
    //     {
    //         "id": 2,
    //         "first_name": "Danil",
    //         "last_name": "Li",
    //         "email": "danil.li24x@gmail.com",
    //         "password": "$2b$10$F.YcUdymTmbptucGHk3mqOY.0yZllXDHcXZyHANbL6F/Qea7zzCH.",
    //         "chat_id": "819151572",
    //         "role": "ADMIN",
    //         "username": "lIlllIIIlIIIlIIIl",
    //         "created_at": "2024-07-04T22:11:57.009Z",
    //         "updated_at": "2024-07-04T22:11:57.009Z"
    //     },
    //     {
    //         "id": 2,
    //         "first_name": "Danil",
    //         "last_name": "Li",
    //         "email": "danil.li24x@gmail.com",
    //         "password": "$2b$10$F.YcUdymTmbptucGHk3mqOY.0yZllXDHcXZyHANbL6F/Qea7zzCH.",
    //         "chat_id": "819151572",
    //         "role": "ADMIN",
    //         "username": "lIlllIIIlIIIlIIIl",
    //         "created_at": "2024-07-04T22:11:57.009Z",
    //         "updated_at": "2024-07-04T22:11:57.009Z"
    //     },
    // ]
    return (
        // <h1>Hello, World!</h1>
        <div className="overflow-x-auto container mx-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">First Name</th>
                        <th className="px-4 py-2">Last Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Chat ID</th>
                        <th className="px-4 py-2">Role</th>
                        <th className="px-4 py-2">Username</th>
                        <th className="px-4 py-2">Created At</th>
                        <th className="px-4 py-2">Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="bg-gray-50 border-b border-gray-200">
                            <td className="px-4 py-2">{user.id}</td>
                            <td className="px-4 py-2">{user.first_name}</td>
                            <td className="px-4 py-2">{user.last_name}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">{user.chat_id}</td>
                            <td className="px-4 py-2">{user.role}</td>
                            <td className="px-4 py-2">{user.username}</td>
                            <td className="px-4 py-2">{new Date(user.created_at).toLocaleString()}</td>
                            <td className="px-4 py-2">{new Date(user.updated_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UsersPageComponent