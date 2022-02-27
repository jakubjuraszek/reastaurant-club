import { memo } from 'react';

interface Props {
  isVisible: boolean;
}

const Spinner: React.FC<Props> = ({ isVisible }) => {
  return isVisible ? (
    <div className='spinner'>
      <div className='spinner__content' />
    </div>
  ) : null;
};

export default memo(Spinner);
