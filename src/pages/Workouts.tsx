
import TabBar from "@/components/layout/TabBar";
import WorkoutTab from "@/components/workouts/WorkoutTab";

const Workouts = () => {
  return (
    <div className="min-h-screen bg-background">
      <WorkoutTab />
      <TabBar />
    </div>
  );
};

export default Workouts;
