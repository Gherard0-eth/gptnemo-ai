import { ProjectInfo } from "./menu/ProjectInfo";
import { TldrSection } from "./menu/TldrSection";
import { WalletButton } from "./menu/WalletButton";
import { SocialLinks } from "./menu/SocialLinks";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

export const MenuContent = () => {
  return (
    <div className="p-6 space-y-6">
      <ProjectInfo />
      <TldrSection />
      <WalletButton />
      <Link
        to="/dashboard"
        className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent"
      >
        <LayoutDashboard className="h-4 w-4" />
        <span>Dashboard</span>
      </Link>
      <SocialLinks />
      <div className="pt-4 border-t border-border">
        <ThemeToggle className="w-full justify-start" />
      </div>
    </div>
  );
};