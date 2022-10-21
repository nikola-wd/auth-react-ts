import { PostDateSC } from '../../styles/PostDateSC';
import { CreatedAtUpdatedAtType } from '../../types';
import { getRelDate } from '../../utils/getRelDate';

const CreatedUpdatedAt = ({ createdAt, updatedAt }: CreatedAtUpdatedAtType) => {
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
