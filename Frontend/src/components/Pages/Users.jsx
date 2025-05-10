import useAuthStore from '@/store/useAuth';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Users = () => {
  const { getAllUsers } = useAuthStore();
  const [users, setUsers] = useState([]);

  // Fetch users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        toast.success(data || "no data");
      } catch (err) {
        toast.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);
  console.log(users);

  return (
    <div className="p-4">
      <div className="bg-base-100 rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-lg font-semibold text-primary tracking-wide uppercase opacity-70">
       Users
        </h2>

        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-all"
            >
              <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-lg object-cover" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold">{user.name}</h3>
                <p className="text-sm mt-2 text-gray-500">{user.description}</p>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button className="btn btn-sm btn-outline btn-primary tooltip" data-tip="Play">▶️</button>
                <button className="btn btn-sm btn-outline btn-secondary tooltip" data-tip="Like">❤️</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">Loading or no users found...</p>
        )}
      </div>
    </div>
  );
};

export default Users;
