import { ControlHub } from "@/components/control-hub";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex">
      <ControlHub />
      <div className="flex-1 lg:ml-16 transition-all duration-300 w-full min-w-0">
        {children}
      </div>
    </div>
  );
}
