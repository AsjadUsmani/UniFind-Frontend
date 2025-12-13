export type ItemStatus = "lost" | "found" | "claimed" | "resolved"
export type ItemCategory = "electronics" | "documents" | "accessories" | "clothing" | "keys" | "bags" | "other"

export interface Item {
  id: string
  title: string
  description: string
  category: ItemCategory
  status: ItemStatus
  location: string
  building: string
  date: string
  time: string
  imageUrl: string
  reportedBy: {
    name: string
    email: string
    avatar: string
  }
  contactInfo?: string
  createdAt: string
}

export interface Resource {
  id: string
  title: string
  description: string
  category: string
  link: string
  icon: string
}

export const mockItems: Item[] = [
  {
    id: "1",
    title: 'MacBook Pro 14"',
    description:
      "Silver MacBook Pro with stickers on the back. Has a small dent on the corner. Last seen in the library study room.",
    category: "electronics",
    status: "lost",
    location: "Central Library - Study Room 3B",
    building: "Central Library",
    date: "2024-12-10",
    time: "14:30",
    imageUrl: "/macbook-laptop-silver.jpg",
    reportedBy: {
      name: "Alex Johnson",
      email: "alex.j@university.edu",
      avatar: "/male-student-avatar.png",
    },
    createdAt: "2024-12-10T14:35:00Z",
  },
  {
    id: "2",
    title: "Student ID Card",
    description: "Found a student ID card near the cafeteria entrance. Name visible on card.",
    category: "documents",
    status: "found",
    location: "Main Cafeteria Entrance",
    building: "Student Center",
    date: "2024-12-11",
    time: "09:15",
    imageUrl: "/student-id-card-university.jpg",
    reportedBy: {
      name: "Sarah Chen",
      email: "sarah.c@university.edu",
      avatar: "/female-student-avatar.png",
    },
    createdAt: "2024-12-11T09:20:00Z",
  },
  {
    id: "3",
    title: "Black Wireless Earbuds",
    description: "Found a pair of black wireless earbuds in charging case near the gym lockers.",
    category: "electronics",
    status: "found",
    location: "Sports Complex - Locker Room A",
    building: "Sports Complex",
    date: "2024-12-11",
    time: "16:45",
    imageUrl: "/wireless-earbuds-black-case.jpg",
    reportedBy: {
      name: "Mike Davis",
      email: "mike.d@university.edu",
      avatar: "/student-avatar-male-athletic.jpg",
    },
    createdAt: "2024-12-11T16:50:00Z",
  },
  {
    id: "4",
    title: "Blue Backpack with Books",
    description: "Lost my blue North Face backpack with textbooks inside. Has my name tag on the inside pocket.",
    category: "bags",
    status: "lost",
    location: "Engineering Building - Room 201",
    building: "Engineering Building",
    date: "2024-12-09",
    time: "11:00",
    imageUrl: "/blue-backpack-north-face.jpg",
    reportedBy: {
      name: "Emily Wang",
      email: "emily.w@university.edu",
      avatar: "/student-avatar-female-asian.jpg",
    },
    createdAt: "2024-12-09T11:15:00Z",
  },
  {
    id: "5",
    title: "Car Keys with Keychain",
    description: "Found a set of car keys with a university keychain attached. Toyota key fob.",
    category: "keys",
    status: "found",
    location: "Parking Lot B - Near Entrance",
    building: "Parking Structure",
    date: "2024-12-12",
    time: "08:30",
    imageUrl: "/car-keys-toyota-keychain.jpg",
    reportedBy: {
      name: "James Wilson",
      email: "james.w@university.edu",
      avatar: "/male-student-avatar.png",
    },
    createdAt: "2024-12-12T08:35:00Z",
  },
  {
    id: "6",
    title: "Reading Glasses",
    description: "Black frame reading glasses found in the chemistry lab.",
    category: "accessories",
    status: "claimed",
    location: "Science Building - Chem Lab 101",
    building: "Science Building",
    date: "2024-12-08",
    time: "15:20",
    imageUrl: "/black-reading-glasses.jpg",
    reportedBy: {
      name: "Lisa Park",
      email: "lisa.p@university.edu",
      avatar: "/female-student-avatar.png",
    },
    createdAt: "2024-12-08T15:25:00Z",
  },
]

export const mockResources: Resource[] = [
  {
    id: "1",
    title: "Campus Map",
    description: "Interactive map of all campus buildings and facilities",
    category: "Navigation",
    link: "/resources/campus-map",
    icon: "map",
  },
  {
    id: "2",
    title: "Lab Timings",
    description: "Schedule for all computer and science labs",
    category: "Academic",
    link: "/resources/lab-timings",
    icon: "clock",
  },
  {
    id: "3",
    title: "Important Notices",
    description: "Latest announcements and updates from administration",
    category: "Information",
    link: "/resources/notices",
    icon: "bell",
  },
  {
    id: "4",
    title: "Student Help Desk",
    description: "Contact information for student support services",
    category: "Support",
    link: "/resources/help-desk",
    icon: "help",
  },
  {
    id: "5",
    title: "Library Resources",
    description: "Access digital library and book reservations",
    category: "Academic",
    link: "/resources/library",
    icon: "book",
  },
  {
    id: "6",
    title: "Emergency Contacts",
    description: "Security, medical, and emergency numbers",
    category: "Safety",
    link: "/resources/emergency",
    icon: "phone",
  },
]

export const categories: { value: ItemCategory; label: string }[] = [
  { value: "electronics", label: "Electronics" },
  { value: "documents", label: "Documents & IDs" },
  { value: "accessories", label: "Accessories" },
  { value: "clothing", label: "Clothing" },
  { value: "keys", label: "Keys" },
  { value: "bags", label: "Bags & Wallets" },
  { value: "other", label: "Other" },
]

export const buildings = [
  "Central Library",
  "Student Center",
  "Sports Complex",
  "Engineering Building",
  "Science Building",
  "Arts Building",
  "Business School",
  "Parking Structure",
  "Dormitory A",
  "Dormitory B",
  "Administration Building",
]
