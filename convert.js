const sharp = require('sharp');
const fs = require('fs');

const svgPath = 'public/placeholder.svg';
const pngPath = 'public/placeholder.png';

async function convertSvgToPng() {
  try {
    const svgBuffer = fs.readFileSync(svgPath);
    await sharp(svgBuffer)
      .png()
      .toFile(pngPath);
    console.log('SVG converted to PNG successfully!');
  } catch (error) {
    console.error('Error converting SVG to PNG:', error);
  }
}

convertSvgToPng();
