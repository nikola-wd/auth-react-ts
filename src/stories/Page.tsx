import React from 'react';
import Header from '../components/Header/Header';

import '../App.css';

// TODO: add types to one place
type PageProps = {
  user?: {
    firstName: string;
    email?: string;
  };
};

export const Page: React.FC<PageProps> = ({ user }) => {
  // const [user, setUser] = React.useState<User>();

  console.log('user: ', user);

  return (
    <div className="App">
      <Header user={user} />
      {/* <Header
        user={user}
        onLogin={() => setUser({ name: 'Jane Doe' })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: 'Jane Doe' })}
      /> */}

      <main className="main">
        <p>Page Content Here</p>
      </main>
    </div>
  );
};
