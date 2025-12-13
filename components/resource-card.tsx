import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Map, Clock, Bell, HelpCircle, Book, Phone } from "lucide-react"
import type { Resource } from "@/lib/mock-data"

interface ResourceCardProps {
  resource: Resource
}

const iconMap: Record<string, typeof Map> = {
  map: Map,
  clock: Clock,
  bell: Bell,
  help: HelpCircle,
  book: Book,
  phone: Phone,
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const Icon = iconMap[resource.icon] || HelpCircle

  return (
    <Link href={resource.link}>
      <Card className="hover:shadow-md hover:border-primary/30 transition-all duration-300 h-full">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold">{resource.title}</h3>
              <p className="text-sm text-muted-foreground">{resource.description}</p>
              <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground mt-2">
                {resource.category}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
