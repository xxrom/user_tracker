"use client";

import { memo, useEffect } from "react";
import { revalidateTable } from "../../actions/tableActions";
import { Button } from "@/ui/button";

const REVALIDATE_INTERVAL = 10 * 1000; // 10 sec auto updates

export const UpdateButton = memo(() => {
  const revalidateAll = () => {
    revalidateTable();
  };

  useEffect(() => {
    const interval = setInterval(revalidateAll, REVALIDATE_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Button
      onClick={revalidateAll}
      size="sm"
      className="absolute right-4 top-2"
    >
      Update
    </Button>
  );
});

UpdateButton.displayName = "UpdateTable";
