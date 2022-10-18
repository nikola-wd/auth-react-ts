import { Link } from 'react-router-dom';

import type { PostByUser } from '../../pages/MyPosts/MyPosts';
import {
  AdminPostCardSC,
  AdminPostCardTitleSC,
} from '../../styles/AdminPostCardSC';
import CreatedUpdatedAt from '../CreatedUpdatedAt/CreatedUpdatedAt';
import Edit from '../svg/Edit';

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

        <CreatedUpdatedAt createdAt={createdAt} updatedAt={updatedAt} />
      </div>

      <Link to={`./${id}`}>
        <Edit />
      </Link>
    </AdminPostCardSC>
  );
};

export default AdminPostCard;
