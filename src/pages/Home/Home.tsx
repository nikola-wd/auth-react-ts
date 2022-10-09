import { useSelector } from 'react-redux';
import PageWrap from '../../components/PageWrap/PageWrap';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import type { RootState } from '../../store/store';

const Home = () => {
  const axiosPrivate = useAxiosPrivate();

  const currentUser = useSelector((state: RootState) => state.auth.user);

  const handleTest = async () => {
    try {
      const res = await axiosPrivate.get('/posts/test-cookie');

      console.log(res);
      console.log(res.status);

      // const data = await res.json();
      // console.log(data);

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageWrap pageTitle="Home">
      <h3>Welcome, {currentUser!.username}</h3>
      <br />
      <h3>This is the homepage that should be protected</h3>
      <p>lorem ipsum dolor sit amet, consectetur adip</p>
      TEST COOKIE
      <button onClick={handleTest}>Test Cookie</button>
    </PageWrap>
  );
};

export default Home;

// refresh
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoibmlrb2xhQHRlc3QuY29tIiwidXNlcm5hbWUiOiJuaWtvbGExMjMiLCJpYXQiOjE2NjUyMzQwNzUsImV4cCI6MTY2NTgzODg3NX0
//   .jKswbVHUenJsCBqw9dhvtI5GQqL_xHNK0IycGI2nTCc;

// access
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//   .eyJzdWIiOjEsImVtYWlsIjoibmlrb2xhQHRlc3QuY29tIiwidXNlcm5hbWUiOiJuaWtvbGExMjMiLCJpYXQiOjE2NjUyMzQwNzUsImV4cCI6MTY2NTIzNDA4NX0
//   .YLqhzSiw9z9ziQRM_bhER0vn3WvpCwzr3EF6jM_Yhzo;

// sent from cookies
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//   .eyJzdWIiOjEsImVtYWlsIjoibmlrb2xhQHRlc3QuY29tIiwidXNlcm5hbWUiOiJuaWtvbGExMjMiLCJpYXQiOjE2NjUyMzQwNzUsImV4cCI6MTY2NTIzNDA4NX0
//   .YLqhzSiw9z9ziQRM_bhER0vn3WvpCwzr3EF6jM_Yhzo;
