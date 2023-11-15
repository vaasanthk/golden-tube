import { formatDistanceToNow } from "date-fns"

export function formatTimeAgo(postedAt: Date): string {
  return formatDistanceToNow(postedAt, {
    addSuffix: true,
  })
}
