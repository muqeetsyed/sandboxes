import {useEffect, useState} from "react";

export const ListUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoader] = useState(null);

    const fetchUsers = async () => {
        try {
            const data = await fetch("http://localhost:5001/api/users/");
            const users = await data.json();

            setUsers(users);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return <div className="table-container">
        <table className="custom-table">
            <thead>
            <tr>
                <th>FirstName</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Region</th>
                <th>Zipcode</th>
            </tr>
            </thead>
            <tbody>
            {
                users.map((user) => {
                    return <tr key={user._id}>
                        <td>{user.firstName}</td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                        <td>{user.address}</td>
                        <td>{user.region}</td>
                        <td>{user.zipCode}</td>
                    </tr>
                })
            }
            </tbody>
        </table>
    </div>;
}
