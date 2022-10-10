import { Link } from 'react-router-dom';

// TODO: Move data fns to helpers

import type { PostByUser } from '../../pages/MyPosts/MyPosts';
import {
  AdminPostCardSC,
  AdminPostCardTitleSC,
} from '../../styles/AdminPostCardSC';
import { PostDateSC } from '../../styles/PostDateSC';
import { getRelDate } from '../../utils/getRelDate';
import Edit from '../svg/Edit';

// TODO: if created at and updated at is the same, only show created at

const AdminPostCard = ({
  id,
  slug,
  title,
  createdAt,
  updatedAt,
}: PostByUser) => {
  return (
    <AdminPostCardSC>
      <div>
        <AdminPostCardTitleSC>
          <Link to={`/posts/${slug}`}>{title}</Link>
        </AdminPostCardTitleSC>

        <PostDateSC>
          <>
            <strong>Created:</strong>&nbsp;
            {getRelDate(createdAt)}
          </>
        </PostDateSC>
        <PostDateSC>
          <>
            <strong>Updated:</strong>&nbsp;
            {getRelDate(updatedAt)}
          </>
        </PostDateSC>
      </div>

      <Link to={`./${id}`}>
        <Edit />
      </Link>
    </AdminPostCardSC>
  );
};

// TODO: On update, change updatedAt

export default AdminPostCard;
