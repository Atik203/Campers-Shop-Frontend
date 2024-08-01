import { Skeleton } from "../../skeleton";

interface SkeletonCardProps {
  className?: string;
  count: number;
}

export function CardSkeleton({ className = "", count }: SkeletonCardProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col space-y-3 p-4 border rounded-lg shadow-md"
        >
          <Skeleton className="h-[160px] w-full rounded-xl bg-gray-300" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-gray-300" />
            <Skeleton className="h-4 w-3/4 bg-gray-300" />
            <Skeleton className="h-4 w-1/2 bg-gray-300" />
            <Skeleton className="h-10 w-1/3 rounded-md bg-gray-300" />
          </div>
        </div>
      ))}
    </div>
  );
}
