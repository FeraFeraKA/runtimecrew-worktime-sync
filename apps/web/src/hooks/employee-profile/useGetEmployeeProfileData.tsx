import {
  getEmployeeProfileData,
  type GetEmployeeProfileDataParams,
} from "@/api/employee-profile";
import { useQuery } from "@tanstack/react-query";

const useGetEmployeeProfileData = (data: GetEmployeeProfileDataParams) => {
  return useQuery({
    queryKey: [
      "teams",
      data.teamId,
      "employees",
      data.employeeId,
      "profile",
      data.from,
      data.to,
    ],
    queryFn: ({ signal }) => getEmployeeProfileData({ ...data, signal }),
  });
};

export default useGetEmployeeProfileData;
