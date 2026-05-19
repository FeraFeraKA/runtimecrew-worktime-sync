import type { RecommendationDto } from "@/shared/types/dashboard/dashboard.types";
import { ArrowRightIcon, User } from "lucide-react";
import { ScrollArea } from "../../scroll-area";
import CustomBadge from "../CustomBadge";

interface ITopRecommendationsProps {
  topRecommendations: RecommendationDto[];
}

const TopRecommendations = ({
  topRecommendations,
}: ITopRecommendationsProps) => {
  return (
    <div className="xl:col-span-3 xl:row-span-2 bg-sidebar border flex-1 p-3">
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-3.5">
          <span className="text-xl font-bold text-center">
            Топ рекомендаций
          </span>
          {topRecommendations.map((rec) => (
            <div
              key={rec.id}
              className="flex flex-col 2xl:flex-row items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <User className="border p-1" size={40} />
                <div className="flex justify-center w-24">
                  <CustomBadge severity={rec.priority} label={rec.priorityLabel} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span>{rec.description + " " + rec.title}</span>
                <ArrowRightIcon className="justify-self-end shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TopRecommendations;
