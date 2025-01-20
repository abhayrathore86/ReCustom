import React from 'react';
import TableBodyData from './TableBodyData';

const UserTable: React.FC = () => {

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border border-gray-300 text-left font-semibold">Name</th>
            <th className="px-4 py-2 border border-gray-300 text-left font-semibold">Email</th>
            <th className="px-4 py-2 border border-gray-300 text-left font-semibold">Role</th>
            <th className="px-4 py-2 border border-gray-300 text-left font-semibold">Logins</th>
            <th className="px-4 py-2 border border-gray-300 text-left font-semibold">Downloads</th>
            <th className="px-4 py-2 border border-gray-300 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <TableBodyData />
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
