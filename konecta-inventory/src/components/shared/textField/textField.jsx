import React from 'react';
import { useField } from 'formik';
import {TextField, 
        InputAdornment,
        Select,
        FormControl,
        FormHelperText,
        MenuItem, 
        InputLabel,
        RadioGroup,
        Radio,
        FormControlLabel,
        FormLabel, 
        Grid} from '@material-ui/core';

const MyTextField = ({label, type, iconComponent, iconPosition, ...props}) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    return (<TextField style={{width: 100 + "%"}} 
                      label={label} 
                      {...field} 
                      helperText={errorText} 
                      error={!!errorText}
                      type={type}
                      InputProps={iconComponent && {
                        startAdornment: (
                          <InputAdornment position={iconPosition}>
                            {iconComponent}
                          </InputAdornment>
                        )
                      }} />);
}

const MySelectField = ({label, iconComponent, iconPosition,items, ...props}) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  const labelId = `${label}-${Math.random()}`;
  return (
   <FormControl error={!!errorText} style={{width: 100 + '%'}}>
     <InputLabel id={labelId}>{label}</InputLabel>
     <Select
     {...field}
     labelId={labelId}>
        { items.map( item => (
          <MenuItem key={`${item.label}-${Math.random()}`} 
            value={item.value}>
              {item.label}
          </MenuItem>
        ))}
      </Select>
      {!!errorText && <FormHelperText>{errorText}</FormHelperText>}
   </FormControl>
  );
}

const MyRadioButtons = ({label, items, flex, ...props}) => {
  const [field] = useField(props);
  const labelId = `${label}-${Math.random()}`;
  return(
    <FormControl>
        <FormLabel id={labelId}>{label}</FormLabel>
        <RadioGroup {...field}>
          <Grid container direction={flex.direction} spacing={flex.spacing} >
          { items.map( item => (
            <Grid item key={`${item.label}-${Math.random()}`} {...flex.grid}>
              <FormControlLabel value={item.value} control={<Radio key={item.value} />} label={item.label}/>
            </Grid>
          ))}
          </Grid>
        </RadioGroup>
    </FormControl>
  );
};

export  { MyTextField, MySelectField, MyRadioButtons };