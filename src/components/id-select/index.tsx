/**
 * @description value传入多种类型 onChange只会回调 number | undefind类型
*/
import Select from "rc-select";
import React from "react";
import { Raw } from "types";

type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange'> {
  value: Raw | null | undefined
  onChange: (value?: number) => void
  defaultOptionName?: string
  options?: { name: string, id: number }[]
}


const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)

export const IdSelect: React.FC<IdSelectProps> = (props) => {
  const { value, onChange, defaultOptionName, options, ...rest } = props

  return (
    <Select value={toNumber(value)} onChange={value => { onChange(toNumber(value) || undefined) }} {...rest}>
      {
        defaultOptionName && <Select.Option value={0}>{defaultOptionName}</Select.Option>
      }
      {
        options && options.map(option => (<Select.Option value={option.id} key={option.id}>{option.name}</Select.Option>))
      }
    </Select>
  )
}
