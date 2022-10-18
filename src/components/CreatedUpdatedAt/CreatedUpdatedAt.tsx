import { PostDateSC } from '../../styles/PostDateSC';
import { getRelDate } from '../../utils/getRelDate';

type CaUaType = {
  createdAt: Date;
  updatedAt: Date;
};

const CreatedUpdatedAt = ({ createdAt, updatedAt }: CaUaType) => {
  return (
    <>
      {createdAt !== updatedAt && (
        <PostDateSC>
          <strong>Created:</strong>&nbsp; {getRelDate(createdAt)}
        </PostDateSC>
      )}
      <PostDateSC>
        <strong>Updated:</strong>&nbsp; {getRelDate(updatedAt)}
      </PostDateSC>
    </>
  );
};

export default CreatedUpdatedAt;
