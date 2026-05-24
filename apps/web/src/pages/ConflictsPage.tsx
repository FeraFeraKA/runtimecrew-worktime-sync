import Conflicts from "@/components/layout/Conflicts";
import { QueryErrorState, QueryLoadingState } from "@/components/layout/QueryState";
import useGetConflictsData from "@/hooks/conflicts/useGetConflictsData";
import { useTeamPeriodParams } from "@/hooks/useTeamPeriodParams";

const ConflictsPage = () => {
  const params = useTeamPeriodParams();
  const { data, error, isError, isPending, refetch } = useGetConflictsData(params);

  if (isPending) {
    return <QueryLoadingState />;
  }

  if (isError || !data) {
    return <QueryErrorState error={error} onRetry={() => void refetch()} />;
  }

  return <Conflicts data={data} />;
};

export default ConflictsPage;
