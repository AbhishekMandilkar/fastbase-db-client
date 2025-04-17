import clsx from 'clsx'

export const getCellRenderValueByColumnType = (
  value: any,
  columnType: string
): {
  displayValue: string
  className: string
} => {
  let displayValue = value
  let className = ''
  switch (columnType) {
    case 'timestamp':
    case 'date':
    case 'time':
    case 'timestamp without time zone':
      displayValue = new Date(value as string).toLocaleString()
      break
    case 'boolean':
      displayValue = value ? 'Yes' : 'No'
      break
    case 'json':
      displayValue = JSON.stringify(value)
      break
    default:
      displayValue = JSON.stringify(value).replace(/^"|"$/g, '')
      break
  }

  const { nullCheckedClassName, nullCheckedValue } = nullCheck(displayValue)
  className = className + ' ' + nullCheckedClassName
  displayValue = nullCheckedValue;

  return {
    displayValue,
    className
  }
}

const nullCheck = (value: any) => {
  if (value === null || value === 'null') {
    return { nullCheckedValue: 'NULL', nullCheckedClassName: 'italic' }
  }
  return { nullCheckedValue: value, nullCheckedClassName: '' }
}
