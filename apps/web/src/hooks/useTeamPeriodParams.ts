import { DEFAULT_PERIOD, DEFAULT_TEAM_ID } from "@/shared/config/defaults";
import { format } from "date-fns";
import { useMemo } from "react";
import type { DateRange } from "react-day-picker";
import { useOutletContext } from "react-router";

type AppOutletContext = {
  currentTeam: string | null;
  period: DateRange | undefined;
};

const formatDateParam = (date: Date) => format(date, "yyyy-MM-dd");

export const useTeamPeriodParams = () => {
  const { currentTeam, period } = useOutletContext<AppOutletContext>();

  return useMemo(() => {
    const from = period?.from
      ? formatDateParam(period.from)
      : DEFAULT_PERIOD.from;
    const to = period?.to
      ? formatDateParam(period.to)
      : period?.from
        ? formatDateParam(period.from)
        : DEFAULT_PERIOD.to;

    return {
      teamId: currentTeam ?? DEFAULT_TEAM_ID,
      from,
      to,
    };
  }, [currentTeam, period]);
};
