import fs from "fs";
import path from "path";
import * as esbuild from "esbuild";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); //https://codingbeautydev.com/blog/javascript-dirname-is-not-defined-in-es-module-scope/
const __dirname = path.dirname(__filename);

const functionsDir = "packages";
const outDir = "dist";

const entryPoints = fs.readdirSync(path.join(__dirname, functionsDir)).map((entry) => `./${functionsDir}/${entry}/index.ts`);

  async function go(){
    try{
      let context = await  esbuild
      .context({
        entryPoints,
        bundle: true,
        outdir: "dist",
        platform: "node"
      })
  
      await context.watch()

    }catch(error){
      console.log("ERROR", error)
    }
  }

go();




