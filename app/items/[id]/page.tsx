import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { mockItems } from "@/lib/mock-data"
import { ArrowLeft, MapPin, Calendar, Mail, MessageCircle, Flag, Share2 } from "lucide-react"

const statusColors: Record<string, string> = {
  lost: "bg-destructive text-destructive-foreground",
  found: "bg-success text-success-foreground",
  claimed: "bg-warning text-warning-foreground",
  resolved: "bg-muted text-muted-foreground",
}

export default async function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = mockItems.find((i) => i.id === id) || mockItems[0]

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={true} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/items">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Items
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image */}
              <Card className="overflow-hidden">
                <div className="relative aspect-[16/10] bg-muted">
                  <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <Badge className={statusColors[item.status]} size="default">
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Details Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {item.category}
                      </Badge>
                      <CardTitle className="text-2xl">{item.title}</CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{item.location}</p>
                        <p className="text-sm text-muted-foreground">{item.building}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date & Time</p>
                        <p className="font-medium">
                          {new Date(item.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">at {item.time}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3">Reported By</h3>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={item.reportedBy.avatar || "/placeholder.svg"} alt={item.reportedBy.name} />
                        <AvatarFallback>
                          {item.reportedBy.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{item.reportedBy.name}</p>
                        <p className="text-sm text-muted-foreground">{item.reportedBy.email}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Action Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is this your item?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    If you believe this is your item, you can submit a claim. You&apos;ll need to verify ownership with
                    details about the item.
                  </p>
                  <Button className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Submit a Claim
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Reporter
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Report ID</span>
                    <span className="font-mono">#{item.id.padStart(6, "0")}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="outline">{item.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Category</span>
                    <span>{item.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Reported</span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Safety Tips Card */}
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg">Safety Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Meet in public campus areas only</li>
                    <li>• Verify item ownership before handover</li>
                    <li>• Report suspicious behavior to admin</li>
                    <li>• Don&apos;t share personal contact info publicly</li>
                  </ul>
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
