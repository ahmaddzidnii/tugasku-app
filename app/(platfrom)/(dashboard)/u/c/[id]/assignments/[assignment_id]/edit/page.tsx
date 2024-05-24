import { Metadata } from "next";
import EditAssignmentPage from "./edit-assignment-page";
import { getAssignment } from "@/service/get-assignment";

export const metadata: Metadata = {
  title: "Edit Assignment",
};

interface EditAssignmentPageProps {
  params: {
    id: string;
    assignment_id: string;
  };
}
const EditAssignment = async ({ params }: EditAssignmentPageProps) => {
  const { data } = await getAssignment({ assignmentId: params.assignment_id });
  return (
    <div>
      <EditAssignmentPage data={data} />
    </div>
  );
};

export default EditAssignment;
