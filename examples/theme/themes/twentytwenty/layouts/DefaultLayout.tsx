import { Header } from '../components/Header';

export const DefaultLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
