import Availability from "@/components/layout/Availability";
import { QueryErrorState, QueryLoadingState } from "@/components/layout/QueryState";
import useGetAvailabilityData from "@/hooks/availability/useGetAvailabilityData";
import { useTeamPeriodParams } from "@/hooks/useTeamPeriodParams";

const AvailabilityPage = () => {
  const params = useTeamPeriodParams();
  const { data, error, isError, isPending, refetch } = useGetAvailabilityData(params);

  if (isPending) {
    return <QueryLoadingState />;
  }

  if (isError || !data) {
    return <QueryErrorState error={error} onRetry={() => void refetch()} />;
  }

  return <Availability data={data} />;
};

export default AvailabilityPage;
