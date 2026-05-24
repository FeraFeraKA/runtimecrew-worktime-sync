import {
  getEmployeesData,
  type GetEmployeesDataParams,
} from "@/api/employees";
import { useQuery } from "@tanstack/react-query";

const useGetEmployeesData = (data: GetEmployeesDataParams) => {
  return useQuery({
    queryKey: ["teams", data.teamId, "employees", data.from, data.to],
    queryFn: ({ signal }) => getEmployeesData({ ...data, signal }),
  });
};

export default useGetEmployeesData;
