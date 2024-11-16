import UIIcons from '../../../assets/icons/ui';
import type { HeaderProps } from './header-types';

export default function Header({ children }: HeaderProps) {
  const { Logo } = UIIcons;

  return (
    <header className="bg-brand-blue flex flex-col items-center px-0 md:px-4">
      <nav className="min-h-14 flex flex-row justify-between items-center relative w-full max-w-[1240px] px-4 md:px-0">
        <a href="/" className="block w-28">
          <Logo />
        </a>
      { children }
      </nav>
    </header>
  );
}
