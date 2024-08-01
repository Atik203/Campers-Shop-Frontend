import { NavLink } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../tooltip";

export type TIcon = React.ComponentType<React.ComponentProps<"svg">>;
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
          <div className="relative inline-flex items-center">
            <Icon
              className={`h-8 w-8 ${
                !isMobile &&
                isActive &&
                "text-primary border-b-primary border-b-2"
              }
      ${isMobile && isActive && "text-primary"}  
      `}
              aria-hidden="true"
            />
            {item > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-green-600 rounded-full">
                {item}
              </span>
            )}
          </div>
        )}
      </NavLink>
    </TooltipTrigger>
    <TooltipContent className="bg-slate-300">
      <p>{tooltipText}</p>
    </TooltipContent>
  </Tooltip>
);

export default TooltipIcon;
