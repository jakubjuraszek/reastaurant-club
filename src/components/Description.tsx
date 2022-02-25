interface Props {
  projectId: string;
  name: string;
}

const Description: React.FC<Props> = ({ projectId, name }) => {
  return (
    <div className='content__description'>
      Name: <strong>{name}</strong>
      <br />
      <label htmlFor='selectedId'>Project ID:</label>
      <input readOnly type='text' name='selectedId' defaultValue={projectId} />
    </div>
  );
};

export default Description;
