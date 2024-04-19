"use client"; // Error components must be Client Components

import { Card } from "@/ui/card";
import { useEffect } from "react";

export type ErrorType = {
  error: Error & { digest?: string };
  reset: () => void;
};
export default function Error({ error }: ErrorType) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid justify-center p-12">
      <Card className="mt-4 p-8 h-fit">
        <h1 className="grid text-center text-3xl">Something went wrong!</h1>

        {error?.message && (
          <h2 className="grid text-orange-600 text-center text-3xl mt-4">
            {error.message}
          </h2>
        )}
      </Card>
    </div>
  );
}
