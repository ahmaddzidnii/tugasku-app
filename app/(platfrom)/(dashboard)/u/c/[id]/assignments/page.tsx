"use client";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import taskCompletedSvg from "@/public/svg/task_completed.svg";

export default function ClassTaskPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-6xl mx-auto">
      <div>
        <section>
          <h2 className="text-muted-foreground font-semibold text-xl">Due today</h2>
          <Separator className="mt-5 mb-4" />
          <div className="mb-4">
            {Array.from({ length: 2 }).map((_, idx) => (
              <Link
                key={idx}
                href={`/u/c/${params.id}/assignments/1`}
              >
                <div className="px-2  py-3 flex gap-x-4 rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                  <div>
                    <div className="bg-primary p-3 rounded-full">
                      <svg
                        focusable="false"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="w-7 h-7 fill-primary-foreground"
                      >
                        <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7z"></path>
                        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"></path>
                      </svg>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-foreground md:text-lg text-base">Nama tugas</h3>
                    <p className="text-muted-foreground text-sm">Kelas</p>
                    <p className="text-muted-foreground text-sm">Deadline</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-muted-foreground font-semibold text-xl">Due this week</h2>
          <Separator className="mt-5 mb-4" />
          <div className="mb-4">
            <div className="flex items-center justify-center">
              <img
                className="w-16 h-16"
                src={taskCompletedSvg.src}
                alt="svg_task"
              />
              <h1>No task yet</h1>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-muted-foreground font-semibold text-xl">All task</h2>
          <Separator className="mt-5 mb-4" />
          <div className="mb-4">
            <div className="flex items-center justify-center">
              <img
                className="w-16 h-16"
                src={taskCompletedSvg.src}
                alt="svg_task"
              />
              <h1>No task yet</h1>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
