import esbuild from "esbuild";

async function build(){
    const context = await esbuild.context({
        entryPoints: ['packages/func1/index.ts'],
        bundle: true,
      })
      
      // Manually do an incremental build
      const result = await context.rebuild()
      
      // Enable watch mode
      await context.watch()
      
      // Enable serve mode
    //   await context.serve()
      
      // Dispose of the context
    //   context.dispose()
}


build();