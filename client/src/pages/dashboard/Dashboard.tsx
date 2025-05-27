import CustomInventoryTablePage from "@/inventory/page";
import CustomSidebar from "./CustomSidebar";

const Dashboard = () => {
    return (
        <>
            <CustomSidebar>
                <CustomInventoryTablePage />
            </CustomSidebar>
        </>

    )
}

export default Dashboard;