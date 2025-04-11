import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Progress} from '@/components/ui/progress';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-teal-500" href="https://habitquest.ai">
            HabitQuest AI!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Get started by building your micro-habits!
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Track Your Progress</CardTitle>
              <CardDescription>Visualize your habit completion over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={66} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
