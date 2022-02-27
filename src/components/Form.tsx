import { FormEvent, ChangeEvent, memo } from 'react';

interface Props {
  inputLabel: string;
  submitLabel: string;
  name: string;
  value: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Form: React.FC<Props> = ({
  inputLabel,
  submitLabel,
  name,
  onSubmit,
  value,
  handleChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor={name}>{inputLabel}</label>
      <input type='text' name={name} value={value} onChange={handleChange} />
      <button type='submit'>{submitLabel}</button>
    </form>
  );
};

export default memo(Form);
