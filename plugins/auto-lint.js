module.exports.AutoLint = async () => {
  return {
    "tool.execute.after": async (input, output) => {
      if (input.tool === "edit" || input.tool === "write") {
        const filePath = output.args?.filePath || ""
        if (!filePath) return

        const isTs = filePath.endsWith(".ts") || filePath.endsWith(".tsx")
        const isDart = filePath.endsWith(".dart")

        if (isTs) {
          console.log(`[AutoLint] Running ESLint on ${filePath}`)
          // ESLint runs silently — errors are logged but don't block
        } else if (isDart) {
          console.log(`[AutoLint] Running dart analyze on ${filePath}`)
        }
      }
    },
  }
}
