import React from 'react';
import { Button } from '../button';
import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';

function Header() {
  const { user, isSignedIn } = useUser(); // Fixed the incorrect function name

  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
      <img src="/logo.svg" alt="Logo" width={100} height={100} />

      {isSignedIn ? (
        <div className="flex items-center space-x-4">
          <Link to={'/dashboard'}>
          <Button>Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to="/auth/sign-in">
          <Button>Get Started Here</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
