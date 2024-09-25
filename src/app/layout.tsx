import './globals.css';
import style from './layout.module.css';
import classNames from 'classnames/bind';
import Link from 'next/link';

const cx = classNames.bind(style);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={cx('container')}>
          <header>
            <Link href={'/'}>ONEBITE CINEMA</Link>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
