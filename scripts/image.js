const webp=require('webp-converter');
const sharp = require('sharp');
//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, 'input');

const headerRow = [
  "Name",
  "Image"
].join(", ");

fs.writeFile(
  `output/result.csv`,
  headerRow + "\n",
  "utf8",
  (err) => {
    if (err) { console.error(err);
    } else { console.log("done"); }
  }
);

//passsing directoryPath and callback function
fs.readdir(directoryPath, async function (err, files) {
  //handling error
  if (err) {
      return console.log('Unable to scan directory: ' + err);
  } 

  //listing all files using forEach
  await files.forEach(async function (file) {
    if (file.includes(".DS_Store")) return;

    const name = file.replace(".jpg", "");

    await sharp('input/'+ file)
      .resize(300, 300, {withoutEnlargement: true})
      .webp({effort: 6, quality: 50})
      // .toFile('output/' + file + ".webp")
      .toBuffer()
      .then((buffer) => {
        let dataBase64 = Buffer.from(buffer).toString('base64');
        const image = "data:image/webp;base64," + dataBase64;
        
        fs.appendFile(
          `output/result.csv`,
          [name, image].join(", ") + "\n",
          "utf8",
          (err) => {
            if (err) { console.error(err);
            } else { console.log("done"); }
          }
        );
      })      
  });

});

// console.log(rows);

// const allRows = rows.join("\n");

// fs.writeFile(
//   `output/result.csv`,
//   allRows,
//   "utf8",
//   (err) => {
//     if (err) { console.error(err);
//     } else { console.log("done"); }
//   }
// );



// sharp('Go blue.png')
//   .resize(320)
//   // .jpeg({mozjpeg: true})
//   .webp({effort: 6})
//   .toFile('output23.webp')
//   // .toBuffer({alphaQuality: 0, effort: 6})
//   // .then((buffer) => {
//   //   let dataBase64 = Buffer.from(buffer).toString('base64');
//   //   console.log("data:image/webp;base64,",dataBase64);
//   // })


// const result = webp.cwebp("Go blue.png","nodejs_logo.webp","-q 80");
// result.then((response) => {
//   console.log(response);
// });