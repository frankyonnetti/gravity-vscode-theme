const fs = require('fs')
const path = require('path')
const jsonMinify = require('node-json-minify')

// colors for each theme.
const accentColors = [
  {
    newFileName: 'gravity-blue-theme',
    replacementStrings: [
      '#007aff', // color_base
      '#3696ff', // color_light
      '#0063cf', // color_dark
      '#ffffff'  // color_text
    ]
  },
  {
    newFileName: 'gravity-purple-theme',
    replacementStrings: [
      '#af52de', // color_base
      '#bb6ce3', // color_light
      '#a338d9', // color_dark
      '#ffffff'  // color_text
    ]
  },
  {
    newFileName: 'gravity-pink-theme',
    replacementStrings: [
      '#ff2d55', // color_base
      '#ff4b6d', // color_light
      '#ff0f3d', // color_dark
      '#ffffff'  // color_text
    ]
  },
  {
    newFileName: 'gravity-red-theme',
    replacementStrings: [
      '#ff3b30', // color_base
      '#ff584e', // color_light
      '#ff1e12', // color_dark
      '#ffffff'  // color_text
    ]
  },
  {
    newFileName: 'gravity-orange-theme',
    replacementStrings: [
      '#ff9500', // color_base
      '#ffac36', // color_light
      '#e68600', // color_dark
      '#2c2c2c'  // color_text
    ]
  },
  {
    newFileName: 'gravity-yellow-theme',
    replacementStrings: [
      '#ffcc00', // color_base
      '#ffe477', // color_light
      '#e6b800', // color_dark
      '#2c2c2c'  // color_text
    ]
  },
  {
    newFileName: 'gravity-green-theme',
    replacementStrings: [
      '#28cd41', // color_base
      '#4ddc62', // color_light
      '#20a635', // color_dark
      '#2c2c2c'  // color_text
    ]
  },
  {
    newFileName: 'gravity-gray-theme',
    replacementStrings: [
      '#8e8e93', // color_base
      '#adadb1', // color_light
      '#7f7f85', // color_dark
      '#ffffff'  // color_text
    ]
  }
]

// Function to replace strings in theme files.
function themeAccentColor(replacementStrings, newFileName) {
  const filePath = './src/gravity-base-theme.jsonc'
  const outputDirectory = './themes'
  const searchStrings = [
    '@color_base',
    '@color_light',
    '@color_dark',
    '@color_text'
  ]

  // Read the content of the file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err)
      return
    }

    // Perform string replacements
    let modifiedContent = data
    searchStrings.forEach((searchString, index) => {
      const replacementString = replacementStrings[index] || '' // Use an empty string if no replacement provided
      modifiedContent = modifiedContent.replace(new RegExp(searchString, 'g'), replacementString)
    })

    // Minify the content
    const minifiedContent = jsonMinify(modifiedContent)

    // Build the new file path
    const newFilePath = path.join(outputDirectory, newFileName + '.json')

    // Write the modified content to the new file
    fs.writeFile(newFilePath, minifiedContent, 'utf8', (err) => {
      if (err) {
        console.error('Error writing the file:', err)
        return
      }
      console.log('File successfully modified and saved as', newFilePath)
    })
  })
}

// Process each set of data using forEach
accentColors.forEach(({ replacementStrings, newFileName }) => {
  themeAccentColor(replacementStrings, newFileName)
})
