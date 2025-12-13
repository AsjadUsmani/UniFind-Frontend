import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Calendar, Clock } from "lucide-react"
import type { Item } from "@/lib/mock-data"

interface ItemCardProps {
  item: Item
}

const statusColors: Record<string, string> = {
  lost: "bg-destructive text-destructive-foreground",
  found: "bg-success text-success-foreground",
  claimed: "bg-warning text-warning-foreground",
  resolved: "bg-muted text-muted-foreground",
}

const categoryColors: Record<string, string> = {
  electronics: "bg-primary/10 text-primary",
  documents: "bg-chart-2/10 text-chart-2",
  accessories: "bg-chart-3/10 text-chart-3",
  clothing: "bg-chart-4/10 text-chart-4",
  keys: "bg-chart-5/10 text-chart-5",
  bags: "bg-accent/10 text-accent",
  other: "bg-muted text-muted-foreground",
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Link href={`/items/${item.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={item.imageUrl || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className={statusColors[item.status]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className={categoryColors[item.category]}>
              {item.category}
            </Badge>
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{item.description}</p>
          <div className="space-y-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span className="line-clamp-1">{item.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date(item.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{item.time}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-4 py-3 border-t border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={item.reportedBy.avatar || "/placeholder.svg"} alt={item.reportedBy.name} />
              <AvatarFallback className="text-[10px]">
                {item.reportedBy.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              Reported by <span className="font-medium text-foreground">{item.reportedBy.name}</span>
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
