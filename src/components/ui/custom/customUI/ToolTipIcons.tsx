import { FC } from "react";
import { TooltipProvider } from "../../tooltip";
import TooltipIcon, { TIcon } from "./TooltipIcon";

interface TooltipIconsProps {
  className: string;
  isMobile: boolean;
  icons: {
    icon: TIcon;
    path: string;
    tooltipText: string;
    item: number;
  }[];
}

const TooltipIcons: FC<TooltipIconsProps> = ({
  className,
  icons,
  isMobile,
}) => (
  <div className={className}>
    <TooltipProvider>
      {icons.map(({ icon, path, tooltipText, item }, index) => (
        <TooltipIcon
          key={index}
          icon={icon}
          path={path}
          item={item}
          tooltipText={tooltipText}
          isMobile={isMobile}
        />
      ))}
    </TooltipProvider>
  </div>
);

export default TooltipIcons;
