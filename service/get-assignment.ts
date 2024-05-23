import { axiosInstance } from "@/lib/axios";

interface GetAssignmentProps {
  assignmentId: string;
}
export const getAssignment = async ({ assignmentId }: GetAssignmentProps) => {
  try {
    const { data } = await axiosInstance.get(`/api/v2/assignments/${assignmentId}`);
    return {
      data,
    };
  } catch (error: any) {
    return {
      code: error.response.status,
      error: error.response.data.error,
    };
  }
};
