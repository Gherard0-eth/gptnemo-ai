import { ProjectInfo } from "./menu/ProjectInfo";
import { TldrSection } from "./menu/TldrSection";
import { WalletButton } from "./menu/WalletButton";
import { SocialLinks } from "./menu/SocialLinks";
import { ThemeToggle } from "./ThemeToggle";

export const MenuContent = () => {
  return (
    <div className="space-y-6">
      <ProjectInfo />
      <TldrSection />
      <WalletButton />
      <SocialLinks />
      <div className="pt-4 border-t border-border">
        <ThemeToggle className="w-full justify-start" />
      </div>
    </div>
  );
};