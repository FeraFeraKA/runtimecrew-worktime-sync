import {
  getConflictsData,
  type GetConflictsDataParams,
} from "@/api/conflicts";
import { useQuery } from "@tanstack/react-query";

const useGetConflictsData = (data: GetConflictsDataParams) => {
  return useQuery({
    queryKey: ["teams", data.teamId, "conflicts", data.from, data.to],
    queryFn: ({ signal }) => getConflictsData({ ...data, signal }),
  });
};

export default useGetConflictsData;
