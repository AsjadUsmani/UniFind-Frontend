import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ResourceCard } from "@/components/resource-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { mockResources } from "@/lib/mock-data"
import { Search, ExternalLink } from "lucide-react"

const quickLinks = [
  { title: "Academic Calendar", url: "#" },
  { title: "Student Portal", url: "#" },
  { title: "Course Registration", url: "#" },
  { title: "Fee Payment", url: "#" },
  { title: "Exam Schedule", url: "#" },
  { title: "Library Catalog", url: "#" },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={true} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Campus Resources</h1>
            <p className="text-muted-foreground">
              Quick access to essential campus information, services, and important links
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search resources..." className="pl-9" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Resources */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">All Resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {quickLinks.map((link) => (
                      <li key={link.title}>
                        <a
                          href={link.url}
                          className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted transition-colors text-sm"
                        >
                          <span>{link.title}</span>
                          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Emergency Contacts */}
              <Card className="border-destructive/30 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-lg text-destructive">Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Campus Security</span>
                    <span className="font-medium">(555) 123-4567</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Health Center</span>
                    <span className="font-medium">(555) 123-4568</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Emergency</span>
                    <span className="font-medium text-destructive">911</span>
                  </div>
                </CardContent>
              </Card>

              {/* Announcements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Latest Announcements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-2 border-primary pl-3">
                    <p className="text-sm font-medium">Library Hours Extended</p>
                    <p className="text-xs text-muted-foreground">Dec 10, 2024</p>
                  </div>
                  <div className="border-l-2 border-muted pl-3">
                    <p className="text-sm font-medium">Winter Break Schedule</p>
                    <p className="text-xs text-muted-foreground">Dec 8, 2024</p>
                  </div>
                  <div className="border-l-2 border-muted pl-3">
                    <p className="text-sm font-medium">New Parking Regulations</p>
                    <p className="text-xs text-muted-foreground">Dec 5, 2024</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
