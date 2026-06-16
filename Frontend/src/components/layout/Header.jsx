import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown, Bell, Settings, Activity } from "lucide-react";

export default function Header(){
  return (
    <header className="h-[70px] bg-white border-b flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold">Mining Dashboard – Real-time Slope Monitoring</h1>
        <Badge variant="outline" className="gap-1"><Activity className="h-3 w-3"/> Operational</Badge>
      </div>
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">Mine: Alpha <ChevronDown className="h-4 w-4"/></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Alpha</DropdownMenuItem>
            <DropdownMenuItem>Bravo</DropdownMenuItem>
            <DropdownMenuItem>Charlie</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="destructive" className="hidden md:inline-flex">Emergency</Button>
        <Button variant="ghost"><Bell/></Button>
        <Button variant="ghost"><Settings/></Button>
      </div>
    </header>
  );
}
