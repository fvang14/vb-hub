import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Share an Update</CardTitle>
          <CardDescription>Post about your team, your business, or a recent game.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea placeholder="What's going on?" className="mb-4" />
          <div className="flex justify-end">
            <Button>Post</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {/* Mock Post 1 */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">John Doe</CardTitle>
              <CardDescription>Owner, Spike Athletics & Outside Hitter</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p>Just launched a new line of knee pads designed for liberos! Check out the website for 20% off your first order.</p>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Posted 2 hours ago
          </CardFooter>
        </Card>

        {/* Mock Post 2 */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">Sarah Adams</CardTitle>
              <CardDescription>Setter, Local Rec League</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p>Anyone looking for a sub in the Tuesday night C-league? Im available!</p>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Posted 5 hours ago
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
