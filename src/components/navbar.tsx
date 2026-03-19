import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="border-b bg-white">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="font-bold text-xl tracking-tight">
          VB Hub
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Feed
          </Link>
          <Link href="/directory" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Directory
          </Link>
          
          {user ? (
            <>
              <Link href="/profile" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Profile
              </Link>
              <form action="/auth/signout" method="POST">
                <Button variant="outline" size="sm" type="submit">
                  Log out
                </Button>
              </form>
            </>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm">Log in</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
