import { ProjectInfo } from "./menu/ProjectInfo";
import { TldrSection } from "./menu/TldrSection";
import { WalletButton } from "./menu/WalletButton";
import { SocialLinks } from "./menu/SocialLinks";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";
import { LayoutDashboard, Home, MapPin } from "lucide-react";

export const MenuContent = () => {
  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto overflow-x-hidden">
      <ProjectInfo />
      <TldrSection />
      <WalletButton />
      <div className="space-y-2">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent"
        >
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Link>
        <Link
          to="/treasure-islands"
          className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent"
        >
          <MapPin className="h-4 w-4" />
          <span>Treasure Islands</span>
        </Link>
        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent"
        >
          <LayoutDashboard className="h-4 w-4" />
          <span>Dashboard</span>
        </Link>
      </div>
      <SocialLinks />
      <div className="pt-4 border-t border-border">
        <ThemeToggle className="w-full justify-start" />
      </div>
    </div>
  );
};