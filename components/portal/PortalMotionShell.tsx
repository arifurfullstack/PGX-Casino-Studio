interface PortalMotionShellProps {
  children: React.ReactNode;
}

export default function PortalMotionShell({ children }: PortalMotionShellProps) {
  return <div className="w-full space-y-5">{children}</div>;
}
