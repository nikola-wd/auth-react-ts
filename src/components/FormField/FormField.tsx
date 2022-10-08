import { ReactNode, PropsWithChildren } from 'react';
import { FieldError } from 'react-hook-form';

import { FormFieldWrap } from '../../styles/FormFieldWrap';

import { InputProps } from '../Input/InputSC';

type FieldProps = {
  id: string;
  label?: string | ReactNode;
  error?: FieldError | undefined;
} & InputProps;

const FormField = (props: PropsWithChildren<FieldProps>) => {
  const { id, label = '', children } = props;

  return (
    <FormFieldWrap error={props.error}>
      <label htmlFor={`${id}`}>{label}</label>
      {children}
    </FormFieldWrap>
  );
};

export default FormField;
