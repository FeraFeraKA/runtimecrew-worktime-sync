import type { UIMatch } from "react-router";

export type PageHandle = {
  title: string;
};

export const pageHandles = {
  dashboard: {
    title: "Дашборд",
  },
  employees: {
    title: "Сотрудники",
  },
  employeeProfile: {
    title: "Профиль сотрудника",
  },
} satisfies Record<string, PageHandle>;

const isPageHandle = (handle: unknown): handle is PageHandle => {
  return (
    typeof handle === "object" &&
    handle !== null &&
    "title" in handle &&
    typeof handle.title === "string"
  );
};

export const getPageTitleFromMatches = (matches: UIMatch[]) => {
  for (const match of [...matches].reverse()) {
    if (isPageHandle(match.handle)) {
      return match.handle.title;
    }
  }

  return "Страница";
};
