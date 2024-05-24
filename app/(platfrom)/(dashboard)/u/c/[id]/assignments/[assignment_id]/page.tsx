import { Edit2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAssignment } from "@/service/get-assignment";
import { NotFoundUI } from "@/components/error-components/not-found-ui";
import { formatDate } from "@/common/format-date";
import Link from "next/link";
import { ButtonMarkCompleted } from "./_components/button-mark-completed";

interface AssignmentDetailPageProps {
  params: {
    assignment_id: string;
  };
}

async function AssignmentDetailPage({ params }: AssignmentDetailPageProps) {
  const { data, code, error } = await getAssignment({ assignmentId: params.assignment_id });
  if (code == 404) {
    return <NotFoundUI />;
  }
  if (code == 500) {
    throw new Error(error);
  }
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-x-4">
        <div className="hidden lg:block">
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

        <div
          role="main"
          className="flex-1"
        >
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-primary">{data?.assignmentTitle}</h1>
            <h2 className="text-muted-foreground  text-base">
              {data?.class.teacherName} | created at &nbsp;
              {formatDate({ date: data?.createdAt, showTime: false })}
            </h2>
            <div className="flex justify-between font-bold text-sm">
              <h3>100 Points</h3>
              <p>
                {data?.dueDate
                  ? `Due  ${formatDate({ date: data?.dueDate, showYear: false })}`
                  : "No Due Date"}
              </p>
            </div>
            <Separator className="my-3 bg-primary" />
            <div className="mb-8">
              {data?.assignmentDescription ? (
                <div
                  className="shadow-[0_3px_10px_rgb(0,0,0,0.1)] rounded-lg p-4"
                  dangerouslySetInnerHTML={{ __html: data.assignmentDescription }}
                ></div>
              ) : (
                <p>No detail description</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="w-full lg:w-[300px] p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg">
            <div className="flex flex-col space-y-5">
              <div className="flex justify-between">
                <h2 className="text-muted-foreground font-semibold text-base">Your Assignment</h2>
                <span className="text-muted-foreground font-semibold text-base text-[#2ecc71]">
                  {data?.isCompleted ? "Completed" : "Not Completed"}
                </span>
              </div>
              <Button
                title="Edit Tugas"
                variant="outline"
                asChild
              >
                <Link href={`/u/c/${data?.class.classId}/assignments/${data?.assignmentId}/edit`}>
                  <Edit2Icon className="w-5 h-5 mr-2" /> Edit assignments
                </Link>
              </Button>
              <ButtonMarkCompleted
                assignmentId={data?.assignmentId}
                isCompleted={data?.isCompleted}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignmentDetailPage;
