import { cn } from "@/lib/utils";

const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={cn("bg-accent w-full gap-1 p-8", className)}>
      <p className="text-xs font-medium">© 2025 Copyright BEWEAR</p>
      <p className="text-muted-foreground text-xs font-medium">
        Todos os direitos reservados
      </p>
    </footer>
  );
};

export default Footer;
