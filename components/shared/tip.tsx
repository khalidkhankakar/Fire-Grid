import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TipProps {
  children: React.ReactNode
  label: string
  side?: "top" | "bottom" | "left" | "right"
  align?: "center" | "end" | "start"

}
const Tip = ({ children,
  label,
  side,
  align }: TipProps) => {
  return (
      <TooltipProvider delayDuration={100}>
          <Tooltip>
              <TooltipTrigger asChild>
                  {children}
              </TooltipTrigger>
              <TooltipContent align={align} side={side}>
                  <p>{label}</p>
              </TooltipContent>
          </Tooltip>
      </TooltipProvider>

  )
}

export default Tip
