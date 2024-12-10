import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div
      className="h-fit max-h-2/3 w-64 rounded-lg overflow-y-auto flex-shrink-0 p-2 bg-gray-800/20"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-4 w-20 " /> {/* Title Placeholder */}
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-8" /> {/* Ellipsis Placeholder */}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-y-2 my-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-full rounded-lg" /> // Task Card Placeholder
        ))}
      </div>

      {/* Footer */}
      <div>
        <Skeleton className="h-8 w-full rounded-md" /> {/* Create Card Button Placeholder */}
      </div>
    </div>
  );
}
