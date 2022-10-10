import { Link } from 'react-router-dom';
import PageWrap from '../../components/PageWrap/PageWrap';
import { ButtonSC } from '../../styles/ButtonSC';

const CreatePost = () => {
  return (
    <PageWrap pageTitle="Create Post">
      <Link to="/my-posts" className="tdn">
        <ButtonSC>back to My Posts</ButtonSC>

        {/* TODO: Implement */}
      </Link>
    </PageWrap>
  );
};

export default CreatePost;
