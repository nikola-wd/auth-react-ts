import { AdminPostCardSC } from '../../styles/AdminPostCardSC';

type AdminPostCardProps = {
  slug: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

const AdminPostCard = ({
  slug,
  title,
  createdAt,
  updatedAt,
}: AdminPostCardProps) => {
  return <AdminPostCardSC></AdminPostCardSC>;
};

// TODO: On update, change updatedAt

export default AdminPostCard;
