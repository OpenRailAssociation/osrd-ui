import React from 'react'
import { IconData } from '../types/icon-data'

const iconData: IconData = {}

//ReplaceWithTypes

const IconReplaceName: React.FC<IconReplaceNameProps> = ({variant, size}) => {
  if (!iconData[variant]) {
    throw new Error(`IconReplaceName: variant ${variant} not found.`)
  }
  if (!iconData[variant][size]) {
    throw new Error(`IconReplaceName: size ${size} not found for variant ${variant}.`)
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      dangerouslySetInnerHTML={{ __html: iconData[variant][size] }}
    />
  )
}

export default IconReplaceName;
