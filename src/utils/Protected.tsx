import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { signed } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!signed) router.push("/");
  }, [router, signed]);

  return <>{signed ? children : null}</>;
}
