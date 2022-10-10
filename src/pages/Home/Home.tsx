import { useSelector } from 'react-redux';
import PageWrap from '../../components/PageWrap/PageWrap';
import type { RootState } from '../../store/store';

const Home = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  return (
    <PageWrap pageTitle="Home">
      <h3>Welcome, {currentUser!.username}</h3>
      <h3>This is the homepage that should be protected</h3>
    </PageWrap>
  );
};

export default Home;
