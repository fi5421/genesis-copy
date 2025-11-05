import { createFileRoute } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const Route = createFileRoute('/about/')({
  component: About,
});

function About() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">About</h1>
        <p className="text-lg text-gray-600">
          Learn more about this application and its features.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Built With</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">
                  React & TypeScript
                </h3>
                <p className="text-gray-600">
                  Modern React with full TypeScript support
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Express with TypeScript
                </h3>
                <p className="text-gray-600">
                  Fast, unopinionated web framework for Node.js with full
                  TypeScript support
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">TanStack Router</h3>
                <p className="text-gray-600">
                  Type-safe routing with excellent developer experience
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">shadcn/ui</h3>
                <p className="text-gray-600">
                  Beautiful, accessible components built with Radix primitives
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">Tailwind CSS</h3>
                <p className="text-gray-600">
                  Utility-first CSS framework for rapid styling
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">Nx Workspace</h3>
                <p className="text-gray-600">
                  Powerful build system and development tools
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
