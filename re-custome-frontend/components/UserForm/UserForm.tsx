'use client'

import { UsersService } from '@/services/userService';
import { User } from '@/utils/types';
import React, { useState } from 'react';

interface UserFormProps {
  user?: User;
  handleCloseModal: () => void;
  fetchUsers?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, handleCloseModal, fetchUsers }) => {
  const [name, setName] = useState<string>(user?.name || '');
  const [email, setEmail] = useState<string>(user?.email || '');
  const [role, setRole] = useState<string>(user?.role || 'User');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { name, email, role };

    if (user) {
      await UsersService.update(user.id, userData);
      if (fetchUsers) {
        fetchUsers();
      }
      handleCloseModal();
    } else {
      await UsersService.create(userData);
      handleCloseModal();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full p-2 border"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border"
      />
      <select
        value={role}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)}
        className="w-full p-2 border"
      >
        <option value="Admin">Admin</option>
        <option value="User">User</option>
      </select>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        {user ? 'Update' : 'Add'} User
      </button>
    </form>
  );
};

export default UserForm;
