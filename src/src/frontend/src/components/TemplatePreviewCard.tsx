import { Crown, Lock } from "lucide-react";
import React from "react";

interface TemplatePreviewCardProps {
  templateId: string;
  name: string;
  isSelected: boolean;
  isPremium: boolean;
  isLocked: boolean;
  quality?: "hd";
  onClick: () => void;
}

export default function TemplatePreviewCard({
  templateId: _templateId,
  name,
  isSelected,
  isPremium,
  isLocked,
  quality,
  onClick,
}: TemplatePreviewCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative shrink-0 w-28 rounded-xl border-2 overflow-hidden transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        isSelected
          ? "border-primary shadow-md"
          : "border-border hover:border-primary/50"
      } ${isLocked ? "opacity-70" : ""}`}
    >
      {/* Template thumbnail */}
      <div className="w-full aspect-[3/4] bg-muted flex items-center justify-center relative">
        <div className="text-xs text-muted-foreground font-medium px-2 text-center leading-tight">
          {name}
        </div>

        {/* Lock overlay for premium locked templates */}
        {isLocked && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-1">
              <Lock className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        )}

        {/* HD badge */}
        {quality === "hd" && !isLocked && (
          <div className="absolute top-1.5 right-1.5">
            <span className="text-[9px] font-bold bg-primary text-primary-foreground px-1 py-0.5 rounded">
              HD
            </span>
          </div>
        )}
      </div>

      {/* Label bar */}
      <div
        className={`px-2 py-1.5 flex items-center justify-between gap-1 ${
          isSelected ? "bg-primary text-primary-foreground" : "bg-card"
        }`}
      >
        <span
          className={`text-[10px] font-semibold truncate ${
            isSelected ? "text-primary-foreground" : "text-foreground"
          }`}
        >
          {name}
        </span>
        {isPremium && (
          <Crown
            className={`w-3 h-3 shrink-0 ${
              isSelected ? "text-primary-foreground" : "text-amber-500"
            }`}
          />
        )}
      </div>
    </button>
  );
}
