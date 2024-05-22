import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface useAssignmentsProps {
  classId: string;
}
export const useAssignments = ({ classId }: useAssignmentsProps) => {
  return useQuery({
    queryKey: ["assignments", classId],
    queryFn: async () => {
      const data = await axios.get("/api/v2/assignments", {
        params: {
          classId,
        },
      });

      return data.data;
    },
    refetchOnWindowFocus: true,
  });
};
