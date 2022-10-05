import React from 'react';
import { FormFieldWrap } from '../../styles/FormFieldWrap';

import { InputProps, InputSC } from '../Input/InputSC';

type FieldProps = {
  id: string;
  tag?: string;
} & InputProps;

const FormField = (props: React.PropsWithChildren<FieldProps>) => {
  const { id, tag, children } = props;
  return (
    <FormFieldWrap>
      <label htmlFor={`${id}`}>{children}</label>
      <InputSC tag={tag} id={id} />
    </FormFieldWrap>
  );
};

export default FormField;
