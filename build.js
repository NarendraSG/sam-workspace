import fs from "fs";
import path from "path";
import esbuild from "esbuild";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); //https://codingbeautydev.com/blog/javascript-dirname-is-not-defined-in-es-module-scope/
const __dirname = path.dirname(__filename);

const functionsDir = "packages";
const outDir = "dist";

const entryPoints = fs.readdirSync(path.join(__dirname, functionsDir)).map((entry) => `./${functionsDir}/${entry}/index.ts`);

console.log(entryPoints);
// const entryPoints = [ 'packages/lib', 'packages/func1', 'packages/func2'  ]

  const context =  esbuild
    .build({
      entryPoints,
      bundle: true,
      outdir: "dist",
      outbase: functionsDir,
      platform: "node",
      sourcemap: "inline",
      watch: {
            onRebuild(error, result) {
              if (error) console.error("Rebuild failed", error);
              else {
                console.log(`Rebuild succeeded for: ${location}`);
              }
            },
          }
        
    })
    .then((result) => {
      console.log("Build successfull");
      if (process.env.watch) {
        console.log("Watching for changes...");
      }
    });

    // await context.watch()



// entryPoints.map(async (location) => {
//     const context = await esbuild
//       .context({
//         entryPoints: [location],
//         bundle: true,
//         outdir: path.join(__dirname, location, outDir),
//         outbase: functionsDir,
//         platform: "node",
//         sourcemap: "inline",
//         // watch: {
//         //       onRebuild(error, result) {
//         //         if (error) console.error("Rebuild failed", error);
//         //         else {
//         //           console.log(`Rebuild succeeded for: ${location}`);
//         //         }
//         //       },
//         //     }
          
//       })
//       .then((result) => {
//         console.log("Build successfull");
//         if (process.env.watch) {
//           console.log("Watching for changes...");
//         }
//       });

//       await context.watch()
//   });




