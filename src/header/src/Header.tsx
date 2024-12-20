import type { HeaderProps } from './header-types';

export default function Header({ children }: HeaderProps) {

  return (
    <header className="bg-brand-blue flex flex-col items-center px-0 md:px-4">
      <nav className="min-h-14 flex flex-row justify-between items-center relative w-full max-w-[1240px] px-4 md:px-0">
      { children }
      </nav>
    </header>
  );
}
