
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Heart, MessageSquare, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";

// Mock data for social feed
const mockPosts = [
  {
    id: 1,
    user: {
      name: "Alex Morgan",
      avatar: "https://i.pravatar.cc/150?img=23",
      username: "alex_fit",
    },
    content: "Just completed my 5x5 bench press progression! Up 10lbs from last week.",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    workout: {
      name: "Chest Day",
      exercises: [
        { name: "Bench Press", sets: 5, reps: 5, weight: "185lb" },
        { name: "Incline DB Press", sets: 3, reps: 10, weight: "65lb" },
      ],
    },
    likes: 24,
    comments: 3,
    time: "2h ago",
  },
  {
    id: 2,
    user: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?img=5",
      username: "sarahstrong",
    },
    content: "New PR on deadlifts today! Feeling stronger every week with this program.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    workout: {
      name: "Pull Day",
      exercises: [
        { name: "Deadlift", sets: 3, reps: 5, weight: "225lb" },
        { name: "Pull-ups", sets: 3, reps: 8, weight: "BW" },
      ],
    },
    likes: 42,
    comments: 7,
    time: "5h ago",
  },
];

const HomeTab = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading posts
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pb-20">
      <header className="sticky top-0 z-10 glass py-4 px-4 flex justify-between items-center border-b">
        <h1 className="text-xl font-semibold">Feed</h1>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </header>

      <main className="p-4 space-y-6">
        {loading ? (
          // Loading skeletons
          Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="w-full overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              </CardHeader>
              <div className="w-full h-48 bg-muted animate-pulse" />
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="p-4">
                  <div className="flex justify-between">
                    <div className="flex gap-3 items-center">
                      <Avatar>
                        <AvatarImage src={post.user.avatar} />
                        <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{post.user.name}</h3>
                        <p className="text-sm text-muted-foreground">@{post.user.username}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                </CardHeader>
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt="Workout" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white">
                    <div className="flex gap-1 items-center">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/90">
                        {post.workout.name}
                      </span>
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="mb-3">{post.content}</p>
                  
                  <div className="p-3 bg-secondary/50 rounded-lg text-sm">
                    <div className="font-medium mb-2">Workout Summary:</div>
                    {post.workout.exercises.map((exercise, i) => (
                      <div key={i} className="grid grid-cols-4 gap-1 mb-1">
                        <span className="col-span-2">{exercise.name}</span>
                        <span>{exercise.sets}×{exercise.reps}</span>
                        <span className="text-right">{exercise.weight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </main>
    </div>
  );
};

export default HomeTab;
