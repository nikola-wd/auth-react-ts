import { formatRelative, subDays } from 'date-fns';
import { Link } from 'react-router-dom';

// TODO: Move data fns to helpers

import type { PostByUser } from '../../pages/MyPosts/MyPosts';
import {
  AdminPostCardDateSC,
  AdminPostCardSC,
  AdminPostCardTitleSC,
} from '../../styles/AdminPostCardSC';
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

        <AdminPostCardDateSC>
          <>
            <strong>Created At: </strong>
            {formatRelative(subDays(new Date(createdAt), 3), new Date())}
          </>
        </AdminPostCardDateSC>
        <AdminPostCardDateSC>
          <>
            <strong>Updated At: </strong>
            {formatRelative(subDays(new Date(updatedAt), 3), new Date())}
          </>
        </AdminPostCardDateSC>
      </div>

      <Link to={`./edit/${id}`}>
        <Edit />
      </Link>
    </AdminPostCardSC>
  );
};

// TODO: On update, change updatedAt

export default AdminPostCard;
