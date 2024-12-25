import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Profile() {
  const { address } = useAccount();
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would typically update the username in the backend
    console.log("Username updated:", username);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-pirate text-center">Treasure Hunter Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center mb-6">
            <ConnectButton />
          </div>
          
          {address && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2">
                  Treasure Hunter Username
                </label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your pirate name"
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full">Save Username</Button>
            </form>
          )}

          {!address && (
            <p className="text-center text-muted-foreground">
              Connect your wallet to customize your profile
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}