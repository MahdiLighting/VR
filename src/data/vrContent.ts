// Centralized content for the VR OS — apps, store experiences, environments, social.
// Keeping this as pure data so panels stay presentational.

export type EnvironmentId = "mountains" | "beach" | "space" | "apartment";

export interface Environment {
  id: EnvironmentId;
  name: string;
  description: string;
  sky: string;
  floor: string;
  accent: string;
}

export const environments: Environment[] = [
  {
    id: "mountains",
    name: "Summit Lounge",
    description: "A futuristic lounge overlooking a vast mountain range at golden hour.",
    sky: "https://images.pexels.com/photos/28901394/pexels-photo-28901394.jpeg?auto=compress&cs=tinysrgb&h=1200&w=2400",
    floor: "#1a2332",
    accent: "#f59e0b",
  },
  {
    id: "beach",
    name: "Horizon Beach",
    description: "A peaceful tropical shore with warm sunset reflections on calm water.",
    sky: "https://images.pexels.com/photos/12446345/pexels-photo-12446345.jpeg?auto=compress&cs=tinysrgb&h=1200&w=2400",
    floor: "#1f2d2a",
    accent: "#fb923c",
  },
  {
    id: "space",
    name: "Orbital Station",
    description: "A quiet observation deck drifting through a colorful cosmic nebula.",
    sky: "https://images.pexels.com/photos/20881655/pexels-photo-20881655.jpeg?auto=compress&cs=tinysrgb&h=1200&w=2400",
    floor: "#0a0a1a",
    accent: "#38bdf8",
  },
  {
    id: "apartment",
    name: "Skyline Loft",
    description: "A modern high-rise apartment with panoramic city views at night.",
    sky: "https://images.pexels.com/photos/7045915/pexels-photo-7045915.jpeg?auto=compress&cs=tinysrgb&h=1200&w=2400",
    floor: "#23262e",
    accent: "#a78bfa",
  },
];

export interface AppItem {
  id: string;
  name: string;
  category: string;
  color: string;
  rating: number;
  lastOpened?: string;
  favorite?: boolean;
  image: string;
}

export const apps: AppItem[] = [
  {
    id: "neon-racer",
    name: "Neon Velocity",
    category: "Racing",
    color: "#22d3ee",
    rating: 4.6,
    lastOpened: "2 hours ago",
    favorite: true,
    image: "https://images.pexels.com/photos/6498299/pexels-photo-6498299.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
  },
  {
    id: "cosmic-explorer",
    name: "Cosmic Explorer",
    category: "Exploration",
    color: "#38bdf8",
    rating: 4.9,
    lastOpened: "Yesterday",
    favorite: true,
    image: "https://images.pexels.com/photos/20881655/pexels-photo-20881655.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
  },
  {
    id: "fit-ring",
    name: "FitRing Arena",
    category: "Fitness",
    color: "#f97316",
    rating: 4.3,
    lastOpened: "3 days ago",
    image: "https://images.pexels.com/photos/7561964/pexels-photo-7561964.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
  },
  {
    id: "paint-studio",
    name: "Paint Studio XR",
    category: "Creativity",
    color: "#f472b6",
    rating: 4.7,
    lastOpened: "5 days ago",
    favorite: true,
    image: "https://images.pexels.com/photos/6853468/pexels-photo-6853468.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
  },
  {
    id: "echo-social",
    name: "Echo Social",
    category: "Social",
    color: "#a78bfa",
    rating: 4.1,
    lastOpened: "Last week",
    image: "https://images.pexels.com/photos/7562365/pexels-photo-7562365.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
  },
  {
    id: "deep-dive",
    name: "Deep Dive",
    category: "Exploration",
    color: "#2dd4bf",
    rating: 4.8,
    image: "https://images.pexels.com/photos/3155656/pexels-photo-3155656.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
  },
  {
    id: "rhythm-pulse",
    name: "Rhythm Pulse",
    category: "Music",
    color: "#fb7185",
    rating: 4.5,
    lastOpened: "Today",
    image: "https://images.pexels.com/photos/10988021/pexels-photo-10988021.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
  },
  {
    id: "summit-quest",
    name: "Summit Quest",
    category: "Adventure",
    color: "#34d399",
    rating: 4.4,
    image: "https://images.pexels.com/photos/753693/pexels-photo-753693.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
  },
];

export interface StoreItem {
  id: string;
  name: string;
  developer: string;
  category: string;
  price: string;
  free: boolean;
  rating: number;
  description: string;
  color: string;
  image: string;
  screenshots: string[];
  compatible: string[];
}

export const storeItems: StoreItem[] = [
  {
    id: "aurora-realms",
    name: "Aurora Realms",
    developer: "Lumen Studios",
    category: "Games",
    price: "$29.99",
    free: false,
    rating: 4.8,
    description:
      "Embark on a sweeping adventure across floating islands bathed in endless aurora light. Solve ancient puzzles and soar through living skies.",
    color: "#34d399",
    image: "https://images.pexels.com/photos/14761489/pexels-photo-14761489.jpeg?auto=compress&cs=tinysrgb&h=500&w=800",
    screenshots: [
      "https://images.pexels.com/photos/14761489/pexels-photo-14761489.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
      "https://images.pexels.com/photos/155065/pexels-photo-155065.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
    ],
    compatible: ["Standalone", "PC VR", "Hand tracking"],
  },
  {
    id: "zero-g-fitness",
    name: "Zero-G Fitness",
    developer: "Pulse Interactive",
    category: "Fitness",
    price: "Free",
    free: true,
    rating: 4.4,
    description:
      "A full-body workout in orbital zero gravity. Train with resistance fields, track your stats, and push your limits among the stars.",
    color: "#f97316",
    image: "https://images.pexels.com/photos/6498715/pexels-photo-6498715.jpeg?auto=compress&cs=tinysrgb&h=500&w=800",
    screenshots: [
      "https://images.pexels.com/photos/6498715/pexels-photo-6498715.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
      "https://images.pexels.com/photos/6498299/pexels-photo-6498299.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
    ],
    compatible: ["Standalone", "Hand tracking"],
  },
  {
    id: "atelier-spatial",
    name: "Atelier Spatial",
    developer: "Nova Canvas",
    category: "Creativity",
    price: "$19.99",
    free: false,
    rating: 4.7,
    description:
      "A limitless 3D art studio. Sculpt, paint, and build worlds with intuitive hand gestures and a vast material library.",
    color: "#f472b6",
    image: "https://images.pexels.com/photos/6853468/pexels-photo-6853468.jpeg?auto=compress&cs=tinysrgb&h=500&w=800",
    screenshots: [
      "https://images.pexels.com/photos/6853468/pexels-photo-6853468.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
      "https://images.pexels.com/photos/10988028/pexels-photo-10988028.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
    ],
    compatible: ["Standalone", "PC VR", "Hand tracking"],
  },
  {
    id: "drift-shores",
    name: "Drift Shores",
    developer: "Tidal VR",
    category: "Exploration",
    price: "$14.99",
    free: false,
    rating: 4.6,
    description:
      "Glide over crystalline waters and hidden coves. A serene exploration experience with living marine life and dynamic weather.",
    color: "#2dd4bf",
    image: "https://images.pexels.com/photos/3155656/pexels-photo-3155656.jpeg?auto=compress&cs=tinysrgb&h=500&w=800",
    screenshots: [
      "https://images.pexels.com/photos/3155656/pexels-photo-3155656.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
      "https://images.pexels.com/photos/9548239/pexels-photo-9548239.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
    ],
    compatible: ["Standalone", "PC VR"],
  },
  {
    id: "pulse-arena",
    name: "Pulse Arena",
    developer: "Rhythm Labs",
    category: "Games",
    price: "Free",
    free: true,
    rating: 4.5,
    description:
      "Dance, slash, and flow through neon-soaked rhythm maps. Compete globally and create your own beat tracks.",
    color: "#fb7185",
    image: "https://images.pexels.com/photos/10988021/pexels-photo-10988021.jpeg?auto=compress&cs=tinysrgb&h=500&w=800",
    screenshots: [
      "https://images.pexels.com/photos/10988021/pexels-photo-10988021.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
      "https://images.pexels.com/photos/7561816/pexels-photo-7561816.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
    ],
    compatible: ["Standalone", "Hand tracking"],
  },
  {
    id: "gather-hall",
    name: "Gather Hall",
    developer: "Echo Collective",
    category: "Social",
    price: "Free",
    free: true,
    rating: 4.2,
    description:
      "A vibrant social hub. Meet friends in themed lounges, attend live events, and host your own spatial gatherings.",
    color: "#a78bfa",
    image: "https://images.pexels.com/photos/7562365/pexels-photo-7562365.jpeg?auto=compress&cs=tinysrgb&h=500&w=800",
    screenshots: [
      "https://images.pexels.com/photos/7562365/pexels-photo-7562365.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
      "https://images.pexels.com/photos/7562001/pexels-photo-7562001.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
    ],
    compatible: ["Standalone", "PC VR", "Hand tracking"],
  },
];

export interface FriendItem {
  id: string;
  name: string;
  status: "online" | "in-app" | "away" | "offline";
  activity?: string;
  color: string;
}

export const friends: FriendItem[] = [
  { id: "f1", name: "Maya Chen", status: "in-app", activity: "Playing Aurora Realms", color: "#22d3ee" },
  { id: "f2", name: "Devon Park", status: "online", color: "#34d399" },
  { id: "f3", name: "Priya Shah", status: "in-app", activity: "In Gather Hall", color: "#f472b6" },
  { id: "f4", name: "Luca Romano", status: "away", color: "#f97316" },
  { id: "f5", name: "Sora Tanaka", status: "online", color: "#a78bfa" },
  { id: "f6", name: "Aria Kovacs", status: "offline", color: "#64748b" },
];

export const storeCategories = ["Featured", "Games", "Exploration", "Fitness", "Creativity", "Social"];
export const appCategories = ["All", "Recently Opened", "Favorites", "Games", "Creativity", "Fitness"];
