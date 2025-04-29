// import React from 'react';
import { useGetAllUsersQuery } from '../../redux/api/graphqlBaseApi';

const UsersList = () => {
    const { data, error, isLoading } = useGetAllUsersQuery(undefined);

    if (isLoading) return <div>Loading users...</div>;
    if (error) return <div>Error fetching users</div>;

    return (
        <div>
            <h2>Users</h2>
            {data?.getAllUsers?.map((user: any) => (
                <div key={user.email}>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default UsersList;
