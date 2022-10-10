import PageWrap from '../../components/PageWrap/PageWrap';
import { useAppSelector } from '../../store/hooks';
import { getCurrentUser } from '../../store/slices/authSlice';

const Home = () => {
  const currentUser = useAppSelector(getCurrentUser);

  return (
    <PageWrap pageTitle="Home">
      <h3>Welcome, {currentUser!.username}</h3>
      <h3>This is the homepage that should be protected</h3>
    </PageWrap>
  );
};

export default Home;
