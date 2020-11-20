import { Header } from '../components/Header';

export const DefaultLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container" role="main">
        {children}
      </main>
    </>
  );
};
