
import TabBar from "@/components/layout/TabBar";
import ProfileTab from "@/components/profile/ProfileTab";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <ProfileTab />
      <TabBar />
    </div>
  );
};

export default Profile;
