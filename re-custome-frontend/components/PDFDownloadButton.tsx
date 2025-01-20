'use client';

import { UsersService } from '@/services/userService';
import React from 'react';

interface PDFDownloadButtonProps {
  userId: number;
  fetchUsers: () => void;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ userId, fetchUsers }) => {
  const handleDownload = async () => {
    await UsersService.getPDF(userId);
    fetchUsers();
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Download PDF
    </button>
  );
};

export default PDFDownloadButton;
