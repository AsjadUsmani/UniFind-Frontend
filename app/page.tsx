"use client";

import { useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Search,
  Filter,
  RotateCcw,
  Tag,
  MapPin,
  List,
  Clock,
  FolderOpen,
  CornerUpLeft,
} from "lucide-react";

// Shadcn UI Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component

// --- 1. Types and Configuration ---

// Define the structure of an item report (matching your Mongoose schema)
interface Report {
  _id: string;
  type: "lost" | "found";
  title: string;
  description: string;
  category: string;
  campus: string;
  building: string;
  locationText: string;
  status: "open" | "claimed" | "resolved";
  createdAt: string;
  reporter: {
    name: string;
    email: string;
  };
}

// Define the shape of the query parameters
interface QueryParams {
  type?: string;
  category?: string;
  campus?: string;
  status?: string;
  q?: string;
}

const BACKEND_URL = "http://localhost:5000/api/reports";

// Dummy data for filter dropdowns (Replace with actual data fetched from backend if needed)
const CATEGORIES = [
  "Wallet",
  "Keys",
  "Electronics",
  "Documents",
  "Clothing",
  "Other",
];
const STATUSES = [
  { label: "Open", value: "open" },
  { label: "Resolved", value: "resolved" },
];

// --- 2. Data Fetching Function ---

const fetchReports = async (params: QueryParams): Promise<Report[]> => {
  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  const response = await axios.get<Report[]>(`${BACKEND_URL}?${query}`);
  return response.data;
};

// --- 3. The Main Component ---

export default function ReportsFeed() {
  const [params, setParams] = useState<QueryParams>({ status: "open" });

  const [searchQuery, setSearchQuery] = useState("");

  // Use React Query to manage fetching, caching, and loading state
  const {
    data: reports,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["reports", params],
    queryFn: () => fetchReports(params),
    staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
  });

  // Handler for text input search
  const handleSearch = () => {
    // Only update the 'q' parameter when the user presses Enter or clicks search
    setParams((prev) => ({ ...prev, q: searchQuery.trim() || undefined }));
  };

  // Handler for dropdown filter changes
  const handleFilterChange = (key: keyof QueryParams, value: string) => {
    setParams((prev) => ({
      ...prev,
      [key]: value === "all" ? undefined : value, // 'all' resets the filter
      q: prev.q, // Keep the search query intact
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setParams({ status: "Unresolved" });
    setSearchQuery("");
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary flex items-center">
            <FolderOpen className="mr-3 h-7 w-7" />
            Lost & Found Feed
          </CardTitle>
          <CardDescription>
            Browse items. Use the filters to narrow your search.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* --- Filtering and Search Bar --- */}
          <div className="mb-6 space-y-4">
            {/* Search Input */}
            <div className="flex space-x-2">
              <div className="relative grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by keyword (e.g., 'Red backpack', 'iPhone')"
                  className="pl-10 h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isLoading || isRefetching}
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
              <Button
                variant="outline"
                onClick={resetFilters}
                disabled={isLoading || isRefetching}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Type Filter */}
              <Select
                onValueChange={(v) => handleFilterChange("type", v)}
                value={params.type || "all"}
              >
                <SelectTrigger>
                  <CornerUpLeft className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type (Lost/Found)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                  <SelectItem value="found">Found</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select
                onValueChange={(v) => handleFilterChange("status", v)}
                value={params.status || "all"}
              >
                <SelectTrigger>
                  <List className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {STATUSES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select
                onValueChange={(v) => handleFilterChange("category", v)}
                value={params.category || "all"}
              >
                <SelectTrigger>
                  <Tag className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Campus Filter (assuming only Main Campus for simplicity) */}
              <Select
                onValueChange={(v) => handleFilterChange("campus", v)}
                value={params.campus || "all"}
              >
                <SelectTrigger>
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Campus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campuses</SelectItem>
                  {/* Fetch real campus list from DB in a real app */}
                  <SelectItem value="Main Campus">Main Campus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="mb-6" />

          {/* --- Reports Feed --- */}

          {(isLoading || isRefetching) && (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          )}

          {reports?.length === 0 && !isLoading && (
            <div className="text-center p-10 text-muted-foreground">
              <Filter className="h-8 w-8 mx-auto mb-2" />
              <p>No reports found matching your criteria.</p>
            </div>
          )}

          <div className="space-y-4">
            {reports?.map((report) => (
              <ReportItemCard key={report._id} report={report} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- 4. Report Item Card Component ---
const ReportItemCard = ({ report }: { report: Report }) => {
  const isLost = report.type === "lost";
  const statusColor =
    report.status === "resolved"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4 flex justify-between items-start">
        <div className="grow space-y-1">
          <div className="flex items-center space-x-3">
            <Badge
              variant={isLost ? "destructive" : "default"}
              className="font-semibold"
            >
              {isLost ? "LOST" : "FOUND"}
            </Badge>
            <h3 className="text-xl font-semibold text-gray-900">
              {report.title}
            </h3>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {report.description}
          </p>

          <div className="text-sm space-y-1 pt-2">
            <p className="flex items-center text-gray-700">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              <b>Location:</b> {report.building} ({report.locationText})
            </p>
            <p className="flex items-center text-gray-700">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              <b>Date:</b> {new Date(report.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <Badge className={statusColor}>{report.status.toUpperCase()}</Badge>
          <Button variant="secondary" size="sm">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
