"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateDisplayName } from "@/app/actions/profile";

export function Settings({ displayName }: { displayName: string }) {
  return (
    <form action={updateDisplayName} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="display_name">Display Name</Label>
        <Input
          id="display_name"
          name="display_name"
          defaultValue={displayName}
          required
        />
      </div>
      <Button type="submit" size="sm">
        Save Changes
      </Button>
    </form>
  );
}
