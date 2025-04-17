import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">404 - Página no encontrada</h1>
          </div>

          <p className="mt-4 mb-6 text-sm text-gray-600 dark:text-gray-300">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          
          <Link href="/">
            <Button className="w-full">Volver al inicio</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
