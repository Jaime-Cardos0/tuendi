"use client";

import { useEffect, useState } from "react";

export function MirageProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      import("@/services/mirage/server").then(({ makeServer }) => {
        makeServer();
        setReady(true);
      });
    } else {
      setReady(true);
    }
  }, []);

  if (!ready) return null;

  return <>{children}</>;
}