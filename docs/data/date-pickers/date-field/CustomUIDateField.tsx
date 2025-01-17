import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { CssVarsProvider } from '@mui/joy/styles';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/joy/FormLabel';
import JoyTextField, {
  TextFieldProps as JoyTextFieldProps,
} from '@mui/joy/TextField';
import InputUnstyled, { InputUnstyledProps } from '@mui/base/InputUnstyled';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  unstable_useDateField as useDateField,
  UseDateFieldComponentProps,
} from '@mui/x-date-pickers/DateField';

type JoyDateFieldProps = UseDateFieldComponentProps<Dayjs, JoyTextFieldProps>;

const JoyDateField = (props: JoyDateFieldProps) => {
  const { ref: inputRef, ...fieldProps } = useDateField<Dayjs, JoyDateFieldProps>({
    props,
  });

  return (
    <JoyTextField
      {...fieldProps}
      componentsProps={{ input: { componentsProps: { input: { ref: inputRef } } } }}
    />
  );
};

type UnstyledDateFieldProps = UseDateFieldComponentProps<Dayjs, InputUnstyledProps>;

const UnstyledDateField = (props: UnstyledDateFieldProps) => {
  const { ref: inputRef, ...fieldProps } = useDateField<
    Dayjs,
    UnstyledDateFieldProps
  >({ props });

  return (
    <InputUnstyled
      {...(fieldProps as InputUnstyledProps)}
      componentsProps={{ input: { ref: inputRef, style: { width: '100%' } } }}
    />
  );
};

type BrowserInputDateFieldProps = UseDateFieldComponentProps<
  Dayjs,
  React.HTMLAttributes<HTMLInputElement>
>;

const BrowserInputDateField = (props: BrowserInputDateFieldProps) => {
  const fieldProps = useDateField<Dayjs, BrowserInputDateFieldProps>({
    props,
  });

  return <input {...fieldProps} />;
};

export default function CustomUIDateField() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-07'));

  const handleChange = (newValue: Dayjs | null) => setValue(newValue);

  return (
    <CssVarsProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={2}>
          <JoyDateField
            label="Using @mui/joy TextField"
            value={value}
            onChange={handleChange}
          />
          <FormControlLabel
            label={<FormLabel>Using unstyled input</FormLabel>}
            control={<UnstyledDateField value={value} onChange={handleChange} />}
            labelPlacement="top"
            sx={{ alignItems: 'stretch' }}
          />
          <FormControlLabel
            label={<FormLabel>Using browser input</FormLabel>}
            control={<BrowserInputDateField value={value} onChange={handleChange} />}
            labelPlacement="top"
            sx={{ alignItems: 'stretch' }}
          />
        </Stack>
      </LocalizationProvider>
    </CssVarsProvider>
  );
}
