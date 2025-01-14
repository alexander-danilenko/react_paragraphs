import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export const CheckboxesWidget = ({fieldId, defaultValue, onFieldChange, settings}) => {
  const defaultFieldValues = {};

  if (defaultValue && defaultValue.length) {
    defaultValue.map(item => defaultFieldValues[item.value] = true);
  }

  const checkboxChanged = (e, checked) => {
    const newValues = {...defaultFieldValues};
    newValues[e.target.value] = checked;

    Object.keys(newValues)
      .filter(key => !newValues[key])
      .forEach(key => delete newValues[key]);

    const fieldValues = [];
    Object.keys(newValues).map(key => fieldValues.push({value: key}));
    onFieldChange(fieldValues);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{settings.label}</FormLabel>
      <FormGroup>
        {Object.keys(settings.options).map(key =>
          <FormControlLabel
            key={`${fieldId}-${key}`}
            labelPlacement="end"
            label={settings.options[key]}
            control={
              <Checkbox
                id={`${fieldId}-${key}`}
                checked={defaultFieldValues[key] === true}
                value={key}
                onChange={checkboxChanged}
              />
            }
          />
        )}
      </FormGroup>
      <FormHelperText dangerouslySetInnerHTML={{__html: settings.help}}/>
    </FormControl>
  )
};
