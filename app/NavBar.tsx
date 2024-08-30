'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AiFillBug } from 'react-icons/ai';
import classNames from 'classnames';
import { Box } from '@radix-ui/themes';

const NavBar = () => {
  const currentLink = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classNames(
                { 'text-zinc-900': link.href === currentLink },
                { 'text-zinc-500': link.href !== currentLink },
                { 'hover:text-zinc-800 transition-colors': true }
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === 'authenticated' && (
          <Link href="/api/auth/signout">Logout</Link>
        )}
        {status === 'unauthenticated' && (
          <Link href="/api/auth/signin">Login</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
