module.exports.TestRunner = async () => {
  return {
    "tool.execute.after": async (input, output) => {
      if (input.tool === "edit" || input.tool === "write") {
        const filePath = output.args?.filePath || ""
        if (!filePath) return

        const isTestFile = filePath.includes(".test.") || filePath.includes(".spec.") || filePath.includes("_test.dart")

        if (isTestFile) {
          if (filePath.endsWith(".ts") || filePath.endsWith(".tsx")) {
            console.log(`[TestRunner] Test file modified: ${filePath}`)
            console.log(`[TestRunner] Run: npm test -- ${filePath.replace(/\\/g, "/")}`)
          } else if (filePath.endsWith(".dart")) {
            console.log(`[TestRunner] Test file modified: ${filePath}`)
            console.log(`[TestRunner] Run: flutter test ${filePath}`)
          }
        }
      }
    },
  }
}
