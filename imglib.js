var Jimp = require('jimp');
const fs = require('fs');
require('dotenv').config()

const AWS = require('aws-sdk')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
})

const generateImages = async (winArray) => {
  let promiseArray = []
  winArray.forEach(win => {
    promiseArray.push(generateImage(win))
  })

  Promise.all(promiseArray)
}

// winarray contains id, prize, numbers
const generateImage = async (win) => {
  try {


      let item = win

      let baseTextFont = Jimp.FONT_SANS_32_WHITE
  
      let img =  await Jimp.read('./template.png')
    
      let font = await Jimp.loadFont(baseTextFont)
  
      // number 1 
      img.print(font, -35, 875,   {
        text: item.numbers[0],
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_TOP
      }, 300,50 )
  
      // number 2
      img.print(font, 150, 875,   {
        text: item.numbers[1],
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_TOP
      }, 300,50 )
  
      // number 3
      img.print(font, 330, 875,   {
        text: item.numbers[2],
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_TOP
      }, 300,50 )
  
      // number 4
      img.print(font, 515, 875,   {
        text: item.numbers[3],
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_TOP
      }, 300,50 )
  
      // number 5
      img.print(font, -35, 1050,   {
        text: item.numbers[4],
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_TOP
      }, 300,50 )
  
  
      // number 6
      img.print(font, 150, 1050,   {
        text: item.numbers[5],
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_TOP
      }, 300,50 )
  
      // number 7
      img.print(font, 330, 1050,   {
        text: item.numbers[6],
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_TOP
      }, 300,50 )
  
      // number 8
      img.print(font, 515, 1050,   {
        text: item.numbers[7],
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_TOP
      }, 300,50 )
  
          
      img.resize(795, 1501)
      
      img.writeAsync(`tickets/${item.id}.png`);

  } catch (e) {
    throw new Error(e)
    
  } 
}

module.exports = {generateImages}