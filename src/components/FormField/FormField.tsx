import React from 'react';
import { FieldError } from 'react-hook-form';

import { FormFieldWrap } from '../../styles/FormFieldWrap';

import { InputProps } from '../Input/InputSC';

type FieldProps = {
  id: string;
  label?: string;
  error?: FieldError | undefined;
} & InputProps;

const FormField = (props: React.PropsWithChildren<FieldProps>) => {
  const { id, label = '', children } = props;

  return (
    <FormFieldWrap error={props.error}>
      <label htmlFor={`${id}`}>{label}</label>
      {children}
    </FormFieldWrap>
  );
};

export default FormField;
