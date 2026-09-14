import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Next's recommended rules.
 *
 * components/ui/** and hooks/use-mobile.ts are vendored shadcn/ui sources. They
 * keep their upstream code as-is so a future registry update stays a clean
 * diff, which means a few React Compiler rules (setState in an effect, the
 * skeleton's Math.random width) fire on code this repo did not write. They are
 * downgraded to warnings there and nowhere else.
 */
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    files: ["components/ui/**", "hooks/use-mobile.ts"],
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  { ignores: [".next/**", "node_modules/**", ".agents/**"] },
];

export default eslintConfig;
