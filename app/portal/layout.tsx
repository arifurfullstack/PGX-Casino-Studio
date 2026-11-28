import type { ReactNode } from "react";

export default function PortalRootLayout({ children }: { children: ReactNode }) {
  return (
    <div dir="ltr" lang="en">
      {children}
    </div>
  );
}
