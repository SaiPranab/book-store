const { log } = require('console');
const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router();
const modulesPath = path.resolve(__dirname, '../modules/');
// console.log('modulesPath', modulesPath);

const fileRegex = /Routes\.js$/;

fs.readdirSync(modulesPath, {withFileTypes: true}).forEach(dir => {
  // console.log('dir',dir);
  
  if(dir.isDirectory()) {
    const modulesDir = path.join(modulesPath, dir.name);

    fs.readdirSync(modulesDir).forEach(file => {
      // console.log('files inside ', modulesDir, file)
      if(fileRegex.test(file)){
        console.log('file matched', file);
        
        const routeName = dir.name;
        const route = require(path.join(modulesDir, file));
        // console.log('routes:- ', routeName, route);
        
        router.use(`/${routeName}`, route)
      }
    })
  }
})

module.exports = router;