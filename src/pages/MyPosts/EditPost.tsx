import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PageWrap from '../../components/PageWrap/PageWrap';
import { ButtonSC } from '../../styles/ButtonSC';

const EditPost = () => {
  const { postId } = useParams();

  return (
    <PageWrap pageTitle={`Edit Post: ${postId}`}>
      <Link to="/my-posts" className="tdn">
        <ButtonSC>back to My Posts</ButtonSC>

        {/* TODO: Implement */}
      </Link>
    </PageWrap>
  );
};

export default EditPost;

// if form is touched but not submitted, popup are you sure. Also, abort controller
