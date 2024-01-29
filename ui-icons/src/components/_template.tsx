import React from 'react'
import { IconData } from '../types/icon-data'
import { default as sizes } from '../sizes'

const iconData: IconData = {}

//ReplaceWithTypes

const IconReplaceName: React.FC<IconReplaceNameProps> = ({ variant = 'base', size = 'sm', title }) => {
  const currentSize = sizes[size]
  if (!iconData[variant]) {
    throw new Error(`IconReplaceName: variant ${variant} not found.`)
  }
  if (!iconData[variant][currentSize]) {
    throw new Error(`IconReplaceName: size ${currentSize} not found for variant ${variant}.`)
  }
  let data = iconData[variant][currentSize]
  if (title) {
    data = `<title>${title}</title>${data}`
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...(title ? {} : { "aria-hidden": true })}
      width={currentSize}
      height={currentSize}
      fill="currentColor"
      viewBox={`0 0 ${currentSize} ${currentSize}`}
      dangerouslySetInnerHTML={{ __html: data }}
    />
  )
}

export default IconReplaceName;
