import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Directory() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Business Directory</h1>
          <p className="text-muted-foreground">Support your fellow volleyball players.</p>
        </div>
        <Button>List Your Business</Button>
      </div>

      <div className="flex gap-4">
        <Input placeholder="Search businesses by name, industry, or location..." className="max-w-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mock Business 1 */}
        <Card>
          <CardHeader>
            <CardTitle>Spike Athletics</CardTitle>
            <CardDescription>Sporting Goods • Seattle, WA</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">We provide high-quality knee pads, athletic tape, and custom uniforms designed specifically for volleyball athletes.</p>
            <p className="text-sm font-medium">Owner: John Doe (Outside Hitter)</p>
          </CardContent>
        </Card>

        {/* Mock Business 2 */}
        <Card>
          <CardHeader>
            <CardTitle>Peak Performance Physical Therapy</CardTitle>
            <CardDescription>Health & Wellness • Austin, TX</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">Specializing in sports injury recovery and injury prevention for jumping athletes.</p>
            <p className="text-sm font-medium">Owner: Dr. Emily Chen (Middle Blocker)</p>
          </CardContent>
        </Card>

        {/* Mock Business 3 */}
        <Card>
          <CardHeader>
            <CardTitle>Dig It Digital Marketing</CardTitle>
            <CardDescription>Marketing Services • Remote</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">Helping small businesses build their online presence, SEO, and social media strategy.</p>
            <p className="text-sm font-medium">Owner: Alex Rodriguez (Libero)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
