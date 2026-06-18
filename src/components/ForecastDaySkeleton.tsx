import { Card } from "./ui/card"

export function ForecastDaySkeleton() {
  return (
    <Card className="relative min-h-50">
      <div className="absolute inset-0 animate-pulse bg-linear-to-br from-muted via-muted/50 to-muted/20" />
    </Card>
  )
}
