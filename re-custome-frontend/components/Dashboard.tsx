import ActivityChart from "@/components/ActivityChart";
import AddUser from "@/components/AddUser";
import UserTable from "@/components/UserTable";

export const DashBoard = () => {
    
    return (
        <div className="p-6 space-y-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-center text-gray-800">User Metrics Dashboard</h1>
            </div>
            <div className="col-span-1">
                <div className="bg-white shadow-lg rounded-lg p-6 justify-end gap-4 flex">
                    <AddUser />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">User List</h2>
                        <UserTable />
                    </div>
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">User Activity Chart</h2>
                        <ActivityChart />
                    </div>
                </div>
            </div>
        </div>
    );
};
