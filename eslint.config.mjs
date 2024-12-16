import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs}"], // Match .js, .mjs, and .cjs files
    languageOptions: {
      sourceType: "module", // Allow ES module syntax
      globals: {
        ...globals.node, // Include Node.js globals like process, __dirname, require, etc.
        process: "readonly", // Ensure process is available but only readonly
        __dirname: "readonly", // Also mark __dirname as readonly
      },
    },
  },
  pluginJs.configs.recommended, // Use the recommended JS rules
];
