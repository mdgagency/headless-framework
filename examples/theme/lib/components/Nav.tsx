import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

export const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <Link href="/">
        <a className="navbar-brand">
          <Logo />
        </a>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item activ`e">
            <Link href="/docs">
              <a className="nav-link">Documentation</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/blog">
              <a className="nav-link">Blog</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
