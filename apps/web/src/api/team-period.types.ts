export type TeamPeriodParams = {
  teamId: string;
  from: string;
  to: string;
};

export type TeamPeriodRequestParams = TeamPeriodParams & {
  signal?: AbortSignal;
};
