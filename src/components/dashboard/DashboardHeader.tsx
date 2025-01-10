import { User, LogOut, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StoreData } from "../store-creator/types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardHeaderProps {
  storeData: StoreData;
}

const DashboardHeader = ({ storeData }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const handleViewAsCustomer = () => {
    navigate('/store', { state: { fromDashboard: true } });
  };

  return (
    <>
      <header className="border-b border-border bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-lg font-semibold">{storeData.name}</h1>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleViewAsCustomer}
                className="hidden md:flex"
                title="Voir comme client"
              >
                <Eye className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setShowProfile(true)}>
                    <User className="mr-2 h-4 w-4" />
                    Voir le profil
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Profil</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 py-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={storeData.logo} alt={storeData.name} />
              <AvatarFallback>{storeData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center">
              <h3 className="font-semibold text-lg">{storeData.name}</h3>
              <p className="text-sm text-muted-foreground">{storeData.contact}</p>
              <p className="text-sm text-muted-foreground">
                {storeData.address}, {storeData.city}
              </p>
              <p className="text-sm text-muted-foreground">{storeData.country}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardHeader;