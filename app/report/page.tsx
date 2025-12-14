"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios" // Assuming you use axios for API calls
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Send, CornerUpLeft, BookOpen, MapPin, Calendar, Tag, Shield } from "lucide-react"

// Shadcn UI Components
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Header } from "@/components/header"
// For user feedback via site's `useToast`

// --- 1. Define Form Schema using Zod ---
const reportSchema = z.object({
  type: z.enum(["lost", "found"], {
    required_error: "You must specify if the item was lost or found.",
  }),
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters and detail the item.",
  }),
  category: z.string().min(2, {
    message: "Please select an item category.",
  }),
  campus: z.string().min(2, {
    message: "Please select the campus location.",
  }),
  building: z.string().min(2, {
    message: "Please specify the building.",
  }),
  locationText: z.string().min(5, {
    message: "Provide specific details (e.g., 'Near library entrance').",
  }),
  date: z.string().min(1, {
    message: "Please specify the date.",
  }),
  // NOTE: Image upload logic (Multer/Cloudinary) would be added here
})

type ReportFormValues = z.infer<typeof reportSchema>

// --- Configuration ---
const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/reports"

// Dummy data for dropdowns (Replace with actual data fetched from backend if necessary)
const CATEGORIES = ["Wallet", "Keys", "Electronics", "Documents", "Clothing", "Other"]
const CAMPUSES = ["Main Campus", "Satellite Campus A", "Medical School"]
const BUILDINGS = ["Library", "Admin Block", "Cafeteria", "Lecture Hall C"]


export default function ReportPage() {
  const [isLoading, setIsLoading] = useState(false)
  
  const router = useRouter()
  const { toast } = useToast()

  // NOTE: Fetch the JWT token from localStorage (client-side)
  const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null)

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      type: "lost", // Default to 'lost'
      title: "",
      description: "",
      category: "",
      campus: "",
      building: "",
      locationText: "",
      date: new Date().toISOString().split('T')[0], // Default to today's date
    },
  })

  // Handle form submission
  async function onSubmit(values: ReportFormValues) {
    setIsLoading(true)

    try {
      const token = getToken()
      if (!token) {
        toast({ title: 'Not signed in', description: 'Please log in to file a report', variant: 'destructive' })
        router.push('/login')
        return
      }

      // API Call to your backend with Authorization header
      const response = await axios.post(API_URL, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 201 || response.status === 200) {
        toast({ title: 'Report filed', description: 'Report successfully filed! An email notification may be sent if a match is found.' })
        form.reset({
          type: values.type,
          date: new Date().toISOString().split('T')[0],
        })
        router.push('/')
      }
    } catch (error) {
      console.error("Report submission failed:", error);
      // More robust error handling for specific API messages
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to submit report. Please try again."
        : "An unknown error occurred.";

      toast({ title: 'Failed to submit', description: errorMessage, variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="overflow-y-hidden">
      <Header/>
    <div className="flex justify-center py-10 px-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-3xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            File a Report
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {form.watch("type") === "lost" 
                ? "Help us find your lost item." 
                : "Help return a found item to its owner."}
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Row 1: Type (Lost/Found) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Report Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <CornerUpLeft className="mr-2 h-5 w-5 text-gray-400" />
                            <SelectValue placeholder="Select Report Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="lost">Lost Item</SelectItem>
                          <SelectItem value="found">Found Item</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              {/* Date Field */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Date {form.watch("type") === "lost" ? "Lost" : "Found"}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          type="date" 
                          className="pl-10 h-12" 
                          max={new Date().toISOString().split('T')[0]} // Max date is today
                          disabled={isLoading}
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>

              {/* Row 2: Title & Category */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Item Title</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <BookOpen className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input placeholder="e.g., Black leather wallet" className="pl-10 h-12" disabled={isLoading} {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <Tag className="mr-2 h-4 w-4 text-gray-400" />
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {CATEGORIES.map(cat => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 3: Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed description of the item, including color, brand, and any unique markings."
                        rows={4}
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Row 4: Location Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="campus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campus</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <Shield className="mr-2 h-4 w-4 text-gray-400" />
                            <SelectValue placeholder="Select Campus" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {CAMPUSES.map(camp => (
                                <SelectItem key={camp} value={camp}>{camp}</SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="building"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Building</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                            <SelectValue placeholder="Select Building" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {BUILDINGS.map(bldg => (
                                <SelectItem key={bldg} value={bldg}>{bldg}</SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="locationText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specific Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Near entrance, 3rd floor" className="h-12" disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* NOTE: Add image upload component here (e.g., using a separate component for Cloudinary/S3 integration) */}

              <Button type="submit" className="w-full h-12 mt-6 text-lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting Report...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Submit Report
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}