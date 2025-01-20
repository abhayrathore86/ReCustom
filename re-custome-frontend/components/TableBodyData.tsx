'use client';

import { UsersService } from "@/services/userService";
import { User } from "@/utils/types";
import { useEffect, useState } from "react";
import ActionButton from "./ActionButton";

const TableBodyData = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const userData = await UsersService.findAll();
    setUsers(userData);
  };

  return (
    <>
      {users.map((user: User) => (
        <tr key={user.id} className="transition duration-300 ease-in-out hover:bg-gray-50">
          <td className="border-t border-b border-gray-300 px-6 py-3 text-sm font-medium text-gray-800">{user.name}</td>
          <td className="border-t border-b border-gray-300 px-6 py-3 text-sm font-medium text-gray-800">{user.email}</td>
          <td className="border-t border-b border-gray-300 px-6 py-3 text-sm font-medium text-gray-800">{user.role}</td>
          <td className="border-t border-b border-gray-300 px-6 py-3 text-sm font-medium text-gray-800">{user.activityCounts.loginCount}</td>
          <td className="border-t border-b border-gray-300 px-6 py-3 text-sm font-medium text-gray-800">{user.activityCounts.downloadCount}</td>
          <td className="border-t border-b border-gray-300 px-6 py-3 text-sm text-gray-800 flex space-x-2">
            <ActionButton fetchUsers={fetchUsers} user={user} />
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableBodyData;
