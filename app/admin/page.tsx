import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StatsCard } from "@/components/stats-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockItems } from "@/lib/mock-data"
import { Package, CheckCircle, Clock, AlertTriangle, Eye, Check, X, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const statusColors: Record<string, string> = {
  lost: "bg-destructive text-destructive-foreground",
  found: "bg-success text-success-foreground",
  claimed: "bg-warning text-warning-foreground",
  resolved: "bg-muted text-muted-foreground",
}

const pendingClaims = [
  {
    id: "1",
    itemTitle: 'MacBook Pro 14"',
    claimant: { name: "David Kim", email: "david.k@university.edu", avatar: "/student-male-studying.png" },
    submittedAt: "2024-12-12T10:30:00Z",
    verificationNote: "Can describe the stickers on back",
  },
  {
    id: "2",
    itemTitle: "Student ID Card",
    claimant: { name: "Maria Garcia", email: "maria.g@university.edu", avatar: "/diverse-female-student.png" },
    submittedAt: "2024-12-12T09:15:00Z",
    verificationNote: "Name matches ID",
  },
  {
    id: "3",
    itemTitle: "Blue Backpack with Books",
    claimant: { name: "Emily Wang", email: "emily.w@university.edu", avatar: "/student-female-asian.jpg" },
    submittedAt: "2024-12-11T16:45:00Z",
    verificationNote: "Can describe contents and name tag location",
  },
]

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={true} isAdmin={true} />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage item reports, verify claims, and oversee platform activity</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard title="Pending Claims" value="12" description="Awaiting verification" icon={Clock} />
            <StatsCard title="New Reports Today" value="8" description="Lost & found items" icon={Package} />
            <StatsCard title="Resolved This Week" value="34" description="Successfully matched" icon={CheckCircle} />
            <StatsCard title="Flagged Items" value="3" description="Needs attention" icon={AlertTriangle} />
          </div>

          {/* Main Content */}
          <Tabs defaultValue="claims" className="space-y-6">
            <TabsList>
              <TabsTrigger value="claims">Pending Claims</TabsTrigger>
              <TabsTrigger value="reports">All Reports</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>

            <TabsContent value="claims" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Claims Awaiting Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingClaims.map((claim) => (
                      <div
                        key={claim.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-border bg-card"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={claim.claimant.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {claim.claimant.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{claim.claimant.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Claiming: <span className="text-foreground">{claim.itemTitle}</span>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">Note: {claim.verificationNote}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="default" size="icon" className="bg-success hover:bg-success/90">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Item Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Item</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Location</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Reported By</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockItems.map((item) => (
                          <tr key={item.id} className="border-b border-border last:border-0">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-md bg-muted overflow-hidden">
                                  <img
                                    src={item.imageUrl || "/placeholder.svg"}
                                    alt={item.title}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium text-sm">{item.title}</p>
                                  <p className="text-xs text-muted-foreground">{item.category}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={statusColors[item.status]} variant="secondary">
                                {item.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">{item.building}</td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">
                              {new Date(item.date).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={item.reportedBy.avatar || "/placeholder.svg"} />
                                  <AvatarFallback className="text-[10px]">
                                    {item.reportedBy.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{item.reportedBy.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Report</DropdownMenuItem>
                                  <DropdownMenuItem>Change Status</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">User management features coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
