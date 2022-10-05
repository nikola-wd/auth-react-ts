import React from 'react';

import { FormFieldWrap } from '../../styles/FormFieldWrap';

import { InputProps } from '../Input/InputSC';

type FieldProps = {
  id: string;
  label?: string;
} & InputProps;

const FormField = (props: React.PropsWithChildren<FieldProps>) => {
  const { id, label = '', children } = props;

  return (
    <FormFieldWrap>
      <label htmlFor={`${id}`}>{label}</label>
      {children}
    </FormFieldWrap>
  );
};

export default FormField;
