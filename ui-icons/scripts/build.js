/// This script is used to generate the components from the SVG files in the icons directory.
/// It will generate a file for each icon group (variant, size independant) in the src/components directory.
/// It will also generate an index.ts file in the src directory to export all the components.

import { readFileSync, readdirSync, existsSync, unlinkSync, writeFileSync, appendFileSync } from 'fs'
import { join } from 'path'
import { load } from 'cheerio'

// Icons directory path
const iconsDir = 'icons'
const variantKeywords = [
  'fill'
]

// Extract name, variant and size from file name
const extractMetadataFromFilename = (fileName) => {
  const split = fileName.split('.')[0].split("-")

  const size = split.slice(-1)[0]
  
  let variant = "base"
  let name = split.slice(0, -1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')
  
  // Check if variant is present
  if (variantKeywords.includes(split.slice(-2)[0])) {
    variant = split.slice(-2)[0]
    name = split.slice(0, -2).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')
  }

  return [name, variant, size, fileName]
}

// Validate SVG file and extract path
const validateSvgAndExtractPath = (svgFilePath, height) => {
  const svg = readFileSync(svgFilePath, 'utf8')
  const svgElement = load(svg)('svg')
  const svgWidth = parseInt(svgElement.attr('width'))
  const svgHeight = parseInt(svgElement.attr('height'))
  const svgViewBox = svgElement.attr('viewBox')
  const svgPath = svgElement.html().split("\n").map(line => line.trim()).join("").trim()

  if (!svgWidth) {
    throw new Error(`${svgFilePath}: Missing width attribute.`)
  }

  if (!svgHeight) {
    throw new Error(`${svgFilePath}: Missing height attribute.`)
  }

  if (!svgViewBox) {
    throw new Error(`${svgFilePath}: Missing viewBox attribute.`)
  }

  if (svgHeight !== parseInt(height)) {
    throw new Error(`${svgFilePath}: Height in filename does not match height attribute of SVG`)
  }

  const viewBoxPattern = /0 0 ([0-9]+) ([0-9]+)/

  if (!viewBoxPattern.test(svgViewBox)) {
    throw new Error(
      `${svgFilePath}: Invalid viewBox attribute. The viewBox attribute should be in the following format: "0 0 <width> <height>"`
    )
  }

  const [, viewBoxWidth, viewBoxHeight] = svgViewBox.match(viewBoxPattern)

  if (svgWidth !== parseInt(viewBoxWidth)) {
    throw new Error(`${svgFilePath}: width attribute and viewBox width do not match.`)
  }

  if (svgHeight !== parseInt(viewBoxHeight)) {
    throw new Error(`${svgFilePath}: height attribute and viewBox height do not match.`)
  }

  return svgPath
}

// Read all SVG files and generate components for each
const svgFiles = readdirSync(iconsDir).filter(file => file.endsWith('.svg'))
const componentTemplate = readFileSync(join('.', 'src', 'components', 'template.tsx'), 'utf8')

// Generate representation of all icons
const representation = svgFiles
  .map(fileName => extractMetadataFromFilename(fileName))
  .reduce((acc, [name, variant, size, originalFileName]) => {
    if (!acc[name]) {
      acc[name] = {}
    }
    if (!acc[name][variant]) {
      acc[name][variant] = {}
    }
    acc[name][variant][size] = 
      validateSvgAndExtractPath(join(iconsDir, originalFileName), size)
    return acc
  }, {})

// Delete existing index file
const indexFile = join('.', 'src', 'index.ts')
if (existsSync(indexFile)) {
  unlinkSync(indexFile)
}

// Generate components
for (const [name, currentData] of Object.entries(representation)) {
  const supportedVariants = Object.keys(currentData)

  const definitions = supportedVariants
    .map(variant => {
      const supportedSizes = Object.keys(currentData[variant])
      const sizeStr = supportedSizes.map(word => `${word}`).join(' | ')
      return [
        `IconReplaceName${variant}Props`,
        `interface IconReplaceName${variant}Props {size: ${sizeStr}, variant: '${variant}'}`
      ]
    })
  const iconPropsContent = definitions.map(([name, content]) => `${content}\n`).join('\n')
  const iconsPropsTypeUnion = definitions.map(([name]) => name).join(' | ')
  const iconPropsExport = `export type IconReplaceNameProps = ${iconsPropsTypeUnion}`

  let file = componentTemplate
    .replace(
      'const iconData: IconData = {}',
      `const iconData: IconData = ${JSON.stringify(currentData)}`
    )
    .replace('//ReplaceWithTypes', iconPropsContent.concat(`\n${iconPropsExport}`))
    .replace(/IconReplaceName/g, name)

  writeFileSync(
    join('.', 'src', 'components', `${name}.tsx`), 
    file
  )
  appendFileSync(
    indexFile,
    `export { default as ${name} } from './components/${name}'\n`
  ) 
}
