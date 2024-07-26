import { NavLink } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export type TIcon = React.ComponentType<
  React.ComponentProps<"svg"> & { isActive: boolean }
>;
interface TooltipIconProps {
  icon: TIcon;
  path: string;
  tooltipText: string;
  item: number;
  isMobile: boolean;
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const TooltipIcon = ({
  icon: Icon,
  path,
  tooltipText,
  isMobile,
  item,
}: TooltipIconProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <NavLink
        to={path}
        className={({ isActive }: { isActive: boolean }) =>
          classNames(
            isActive
              ? "text-primary border-b-primary"
              : "border-transparent hover:text-gray-700",
            "inline-flex items-center px-1 pt-1 font-medium",
            isMobile && isActive ? "border-l-4 border-primary bg-indigo-50" : ""
          )
        }
      >
        {({ isActive }) => (
          <Icon
            className={`h-6 w-6 ${
              !isMobile &&
              isActive &&
              "text-primary border-b-primary border-b-2"
            }
            ${isMobile && isActive && "text-primary"}  
            `}
            aria-hidden="true"
            isActive={isActive}
          />
        )}
        {item}
      </NavLink>
    </TooltipTrigger>
    <TooltipContent className="bg-slate-300">
      <p>{tooltipText}</p>
    </TooltipContent>
  </Tooltip>
);

export default TooltipIcon;
