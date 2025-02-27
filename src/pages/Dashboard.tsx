
import TabBar from "@/components/layout/TabBar";
import HomeTab from "@/components/dashboard/HomeTab";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <HomeTab />
      <TabBar />
    </div>
  );
};

export default Dashboard;
