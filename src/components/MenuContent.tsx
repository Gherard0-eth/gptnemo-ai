import { Link } from "react-router-dom";
import { Anchor, Map, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";

export const MenuContent = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="font-pirate text-xl text-pirate-navy dark:text-pirate-gold mb-4">
          Navigation
        </h2>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start dark:text-pirate-gold/70" asChild>
            <Link to="/">
              <Anchor className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start dark:text-pirate-gold/70" asChild>
            <Link to="/treasure-islands">
              <Map className="mr-2 h-4 w-4" />
              Treasure Islands
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start dark:text-pirate-gold/70" asChild>
            <Link to="/chat">
              <MessageSquare className="mr-2 h-4 w-4" />
              Pirate Chat
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};