import React from 'react'
import { IconData } from '../types/icon-data'
import { default as sizes } from '../sizes'

const iconData: IconData = {}

//ReplaceWithTypes

const IconReplaceName: React.FC<IconReplaceNameProps> = ({variant, size}) => {
  const currentSize = sizes[size]
  if (!iconData[variant]) {
    throw new Error(`IconReplaceName: variant ${variant} not found.`)
  }
  if (!iconData[variant][currentSize]) {
    throw new Error(`IconReplaceName: size ${currentSize} not found for variant ${variant}.`)
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={currentSize}
      height={currentSize}
      viewBox={`0 0 ${currentSize} ${currentSize}`}
      dangerouslySetInnerHTML={{ __html: iconData[variant][currentSize] }}
    />
  )
}

export default IconReplaceName;
