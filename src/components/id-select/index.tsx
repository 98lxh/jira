
/**
 * @description value传入多种类型 onChange只会回调 number | undefind类型
*/
import React from "react";
import { SelectProps, Select } from "antd";
import { Raw } from "types";


interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'defaultOptionName' | 'options'> {
  value?: Raw | null | undefined
  onChange?: (value?: number) => void
  defaultOptionName?: string
  options?: { name: string, id: number }[]
}


const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)

export const IdSelect: React.FC<IdSelectProps> = (props) => {
  const { value, onChange, defaultOptionName, options, ...rest } = props

  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={value => { onChange?.(toNumber(value) || undefined) }}
      {...rest}
    >
      {
        defaultOptionName && <Select.Option value={0}>{defaultOptionName}</Select.Option>
      }
      {
        options && options.map(option => (<Select.Option value={option.id} key={option.id}>{option.name}</Select.Option>))
      }
    </Select>
  )
}
