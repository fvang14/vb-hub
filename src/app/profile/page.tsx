import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default async function Profile() {
  // 1. Get the authenticated Supabase user
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2. Fetch their full profile and businesses from our Prisma database
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { businesses: true },
  });

  if (!dbUser) {
    // Edge case: Trigger hasn't fired yet or failed
    return <div className="text-center p-8">Loading profile data... please refresh.</div>;
  }

  // Generate fallback initials (e.g., "John Doe" -> "JD")
  const initials = dbUser.name 
    ? dbUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() 
    : 'U';

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex items-center gap-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={dbUser.image || ""} alt={dbUser.name || "User"} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{dbUser.name || "Anonymous Player"}</h1>
          <p className="text-muted-foreground text-lg">
            {dbUser.position || "Position not set"} {dbUser.experience ? `• ${dbUser.experience}` : ""}
          </p>
          <div className="mt-2 space-x-2">
            <Button size="sm">Edit Profile</Button>
            <Button size="sm" variant="outline">Message</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Athletic Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Volleyball Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="font-semibold block">Primary Position</span>
              <span className="text-muted-foreground">{dbUser.position || "Not set"}</span>
            </div>
            <div>
              <span className="font-semibold block">Experience Level</span>
              <span className="text-muted-foreground">{dbUser.experience || "Not set"}</span>
            </div>
            <div>
              <span className="font-semibold block">Bio</span>
              <p className="text-sm text-muted-foreground mt-1">
                {dbUser.bio || "This player hasn't written a bio yet."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Business Profile */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>My Businesses</CardTitle>
              <Button size="sm" variant="outline">Add New</Button>
            </div>
          </CardHeader>
          <CardContent>
            {dbUser.businesses.length === 0 ? (
              <div className="text-center p-6 border rounded-lg bg-slate-50 text-muted-foreground">
                <p className="text-sm">You haven't listed any businesses yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {dbUser.businesses.map((business) => (
                  <div key={business.id} className="border rounded-lg p-4">
                    <h3 className="font-bold text-lg">{business.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{business.industry || "No industry specified"}</p>
                    <p className="text-sm mb-4 line-clamp-2">{business.description}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary">View Listing</Button>
                      <Button size="sm" variant="secondary">Edit Business</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
