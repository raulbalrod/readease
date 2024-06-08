import { Skeleton } from "@/components/Skeleton"

export default function LoaderBookPage() {
  return (
    <>
      <Skeleton className="h-[460px] w-[300px] rounded-xl bg-neutral/10" />
      <div className="w-3/4 flex flex-col space-y-3">
        <div className=" w-full flex justify-between items-center">
          <Skeleton className="h-[20px] w-[300px] rounded-xl bg-neutral/10" />
          <Skeleton className="h-[14px] w-[100px] rounded-xl bg-neutral/10" />
        </div>
        <Skeleton className="h-[18px] w-[200px] rounded-xl bg-neutral/10" />

        <section className="flex space-x-2">
          <Skeleton className="h-[25px] w-[100px] rounded-xl bg-neutral/10" />
          <Skeleton className="h-[25px] w-[100px] rounded-xl bg-neutral/10" />
          <Skeleton className="h-[25px] w-[100px] rounded-xl bg-neutral/10" />
        </section>

        <section className="flex space-x-4 items-center mb-4">
          <Skeleton className="h-[30px] w-[150px] rounded-xl bg-neutral/10" />
          <Skeleton className="h-[30px] w-[150px] rounded-xl bg-neutral/10" />
          <Skeleton className="h-[30px] w-[30px] rounded-lg bg-neutral/10" />
        </section>

        <div className="space-y-4">
          <Skeleton className="h-[14px] w-full rounded-xl bg-neutral/10" />
          <Skeleton className="h-[14px] w-full rounded-xl bg-neutral/10" />
          <Skeleton className="h-[14px] w-full rounded-xl bg-neutral/10" />
          <Skeleton className="h-[14px] w-full rounded-xl bg-neutral/10" />
          <Skeleton className="h-[14px] w-1/5 rounded-xl bg-neutral/10" />
        </div>

        <section className="space-y-2">
          <Skeleton className="h-[14px] w-1/3 rounded-xl bg-neutral/10" />
          <div className="flex space-x-2 items-center">
            <Skeleton className="h-[45px] w-[45px] rounded-full bg-neutral/10" />
            <Skeleton className="h-[14px] w-1/5 rounded-xl bg-neutral/10" />
          </div>
        </section>
      </div>
    </>
  )
}
