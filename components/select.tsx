import React, { Component, FunctionComponent } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { useQuery } from 'react-query';
export function Select (props: any) {

    console.log(props)
    const [checked, setChecked] = React.useState(false);
    const { data } = useQuery<any[]>(props.param.queryKey);

    const li = data;
    console.log('select',data);
    
    return (<React.Fragment>

        <select  {...props.param.regiter}>
            {data?.map(
                (val)=>{
                    return  <option value={val.id}> {val.name}</option>
                }
            )}
        </select>


    </React.Fragment>)
} 