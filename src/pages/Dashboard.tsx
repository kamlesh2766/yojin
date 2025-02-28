
import { useLocation } from "react-router-dom";
import TabBar from "@/components/layout/TabBar";
import HomeTab from "@/components/dashboard/HomeTab";
import FuelTab from "@/components/dashboard/FuelTab";

const Dashboard = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine which tab to show based on the current path
  const renderTab = () => {
    if (path === "/fuel") {
      return <FuelTab />;
    }
    return <HomeTab />;
  };

  return (
    <div className="min-h-screen bg-background">
      {renderTab()}
      <TabBar />
    </div>
  );
};

export default Dashboard;
