
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Dumbbell, LineChart, Settings, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const ProfileTab = () => {
  const [user] = useState({
    name: "Jordan Smith",
    username: "jordanfit",
    avatar: "https://i.pravatar.cc/150?img=12",
    stats: {
      workouts: 24,
      followers: 152,
      following: 87
    },
    fitnessType: "bodybuilding", // From user survey
    joined: "March 2023",
  });

  const statCards = [
    {
      icon: <Dumbbell className="h-5 w-5 text-primary" />,
      value: user.stats.workouts,
      label: "Workouts"
    },
    {
      icon: <UserPlus className="h-5 w-5 text-primary" />,
      value: user.stats.followers,
      label: "Followers"
    },
    {
      icon: <Calendar className="h-5 w-5 text-primary" />,
      value: user.stats.following,
      label: "Following"
    }
  ];

  return (
    <div className="pb-20">
      <header className="sticky top-0 z-10 glass py-4 px-4 flex justify-between items-center border-b">
        <h1 className="text-xl font-semibold">Profile</h1>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4 border-2 border-primary">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">@{user.username}</p>
              
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                  {user.fitnessType.charAt(0).toUpperCase() + user.fitnessType.slice(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  Joined {user.joined}
                </span>
              </div>
              
              <Button className="mt-4 rounded-full">Edit Profile</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-2 rounded-full mb-2">
                    {stat.icon}
                  </div>
                  <span className="text-xl font-bold">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="mt-4 space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="bg-secondary/60 h-16 w-16 rounded-md flex items-center justify-center">
                    <Dumbbell className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Upper Body</h3>
                    <p className="text-sm text-muted-foreground">Yesterday · 45 minutes</p>
                    <div className="mt-1 flex items-center gap-1">
                      <div className="bg-primary/20 h-1.5 rounded-full w-24">
                        <div className="bg-primary h-1.5 rounded-full w-4/5"></div>
                      </div>
                      <span className="text-xs">4/5 exercises</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="bg-secondary/60 h-16 w-16 rounded-md flex items-center justify-center">
                    <Dumbbell className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Leg Day</h3>
                    <p className="text-sm text-muted-foreground">3 days ago · 55 minutes</p>
                    <div className="mt-1 flex items-center gap-1">
                      <div className="bg-primary/20 h-1.5 rounded-full w-24">
                        <div className="bg-primary h-1.5 rounded-full w-full"></div>
                      </div>
                      <span className="text-xs">6/6 exercises</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="progress" className="mt-4">
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Performance Trend</h3>
                  <Button variant="ghost" size="sm" className="h-8">
                    <LineChart className="h-4 w-4 mr-1" />
                    View All
                  </Button>
                </div>
                
                <div className="h-48 bg-secondary/40 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Progress charts will appear as you log more workouts</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ProfileTab;
