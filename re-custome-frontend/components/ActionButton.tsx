'use client';

import React, { useState } from "react";
import PDFDownloadButton from "./PDFDownloadButton";
import ConfirmDialog from "./ConfirmDialog";
import { UsersService } from "@/services/userService";
import Modal from "./Modal";
import UserForm from "./UserForm/UserForm";
import { User } from "@/utils/types";

interface IActionButtonProps {
    fetchUsers: () => void;
    user: User;
}

const ActionButton: React.FC<IActionButtonProps> = ({ fetchUsers, user }) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const handleDelete = async () => {
        if (selectedUserId !== null) {
            await UsersService.delete(selectedUserId);
            fetchUsers();
            setIsDialogOpen(false);
            setSelectedUserId(null);
        }
    };

    const openConfirmDialog = (userId: number) => {
        setSelectedUserId(userId);
        setIsDialogOpen(true);
    };

    const closeConfirmDialog = () => {
        setIsDialogOpen(false);
        setSelectedUserId(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <PDFDownloadButton userId={user.id} fetchUsers={fetchUsers} />
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                onClick={handleCloseModal}
            >
                Edit
            </button>
            <button
                onClick={()=>openConfirmDialog(user.id)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
            >
                Delete
            </button>
            {isDialogOpen && (
                <ConfirmDialog
                    isOpen={isDialogOpen}
                    onConfirm={handleDelete}
                    onCancel={closeConfirmDialog}
                />
            )}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <UserForm fetchUsers={fetchUsers} user={user} handleCloseModal={handleCloseModal} />
            </Modal>
        </>
    );
}
export default ActionButton