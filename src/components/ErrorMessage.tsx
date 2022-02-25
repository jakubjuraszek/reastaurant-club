interface Props {
  isVisible: boolean;
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ isVisible, message }) => {
  return isVisible ? (
    <div className='error-message'>
      <strong>{message}</strong>
    </div>
  ) : null;
};

export default ErrorMessage;
