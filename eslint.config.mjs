import eslint from "@eslint/js"
import vitest from "@vitest/eslint-plugin"
import { configs as eslintPluginAstro } from "eslint-plugin-astro"
import functional from "eslint-plugin-functional"
import importPlugin from "eslint-plugin-import"
import jsxA11y from "eslint-plugin-jsx-a11y"
import perfectionist from "eslint-plugin-perfectionist"
import { configs as sonarjs } from "eslint-plugin-sonarjs"
import unusedImports from "eslint-plugin-unused-imports"
import { configs as tseslint } from "typescript-eslint"
import "eslint-plugin-only-warn"

/** @type {import("eslint").Linter.Config[]} */
export default [
  { files: ["**/*.ts"] },
  { settings: { "import/resolver": { typescript: {} } } },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  eslint.configs.all,
  ...tseslint.all,
  ...eslintPluginAstro.recommended,
  sonarjs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  jsxA11y.flatConfigs.recommended,
  perfectionist.configs["recommended-alphabetical"],
  functional.configs.off,
  {
    plugins: {
      "unused-imports": unusedImports,
    },
  },
  {
    rules: {
      "@typescript-eslint/array-type": ["error", { default: "generic", readonly: "generic" }],
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/class-methods-use-this": ["error", { ignoreOverrideMethods: true }],
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "@typescript-eslint/explicit-member-accessibility": "off",
      "@typescript-eslint/init-declarations": "off",
      "@typescript-eslint/max-params": "off",
      "@typescript-eslint/member-ordering": "off",
      "@typescript-eslint/method-signature-style": ["error", "method"],
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-magic-numbers": "off",
      "@typescript-eslint/no-misused-promises": ["error", { "checksVoidReturn": false }],
      "@typescript-eslint/no-restricted-types": [
        "error",
        {
          "types": {
            "Readonly": "Readonly rend illisible les messages d’erreur TS",
          },
        },
      ],
      "@typescript-eslint/no-shadow": "off",
      "@typescript-eslint/no-unnecessary-type-parameters": "off",
      "@typescript-eslint/no-unsafe-type-assertion": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/prefer-destructuring": "off",
      "@typescript-eslint/prefer-readonly-parameter-types": [
        "off",
        {
          allow: [
            "FormEvent",
            "HTMLFormElement",
            "HTMLInputElement",
            "SubmitEvent",
            "SyntheticEvent",
            "ReactElement",
            "ChartDataset",
            "ClientSafeProvider",
          ],
        },
      ],
      "@typescript-eslint/switch-exhaustiveness-check": [
        "error",
        { "considerDefaultExhaustiveForUnions": true },
      ],
      "arrow-body-style": "off",
      "capitalized-comments": "off",
      "class-methods-use-this": "off",
      "func-style": ["error", "declaration"],
      "functional/immutable-data": ["error", { ignoreClasses: true }],
      "id-length": ["error", { exceptions: ["_"] }],
      "import/newline-after-import": "error",
      "import/no-anonymous-default-export": "off",
      "import/no-extraneous-dependencies": "error",
      "import/no-mutable-exports": "error",
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              except: ["domain", "shared"],
              from: ["src", "node_modules"],
              message: "Le domain représente le métier, il ne dépend d’aucun élément extérieur.",
              target: ["src/domain"],
            },
            {
              except: ["domain", "shared"],
              from: ["src", "node_modules"],
              message:
                "Les use cases automatisent l’interaction entre les règles métiers et les ports représentant des éléments extérieurs.",
              target: ["src/use-cases/**[^test].ts"],
            },
            {
              except: ["domain", "use-cases", "use-cases/shared"],
              from: ["src", "node_modules"],
              message:
                "Les use cases automatisent l’interaction entre les règles métiers et les ports représentant des éléments extérieurs.",
              target: ["src/use-cases/**test.ts"],
            },
            {
              except: [
                "domain",
                "use-cases",
                "gateways/shared",
                "shared",
                "@prisma/client",
                "better-auth",
                "better-auth/node",
              ],
              from: ["src", "node_modules"],
              message: "Les gateways n’ont besoin que du domain et d’implementer les ports définis dans les use cases.",
              target: ["src/gateways/**[^test].ts"],
            },
            {
              except: [
                "domain",
                "use-cases",
                "gateways",
                "shared",
                "@prisma/client",
              ],
              from: ["src", "node_modules"],
              message: "Les gateways n’ont besoin que du domain et d’implementer les ports définis dans les use cases.",
              target: ["src/gateways/**test.ts"],
            },
            {
              except: ["use-cases", "presenters/shared", "shared"],
              from: ["src", "node_modules"],
              message:
                "Les presenters préparent les données à afficher et n’ont pas connaissance du domain ni des gateways.",
              target: ["src/presenters/**[^test].ts"],
            },
            {
              except: ["use-cases", "presenters"],
              from: ["src", "node_modules"],
              message:
                "Les presenters préparent les données à afficher et n’ont pas connaissance du domain ni des gateways.",
              target: ["src/presenters/**test.ts"],
            },
            {
              except: ["views", "presenters", "shared", "use-cases/testHelper.ts"],
              from: ["src"],
              message: "Le front ne doit pas avoir la connaissance du back.",
              target: ["src/views"],
            },
          ],
        },
      ],
      "import/order": [
        "error",
        {
          alphabetize: { caseInsensitive: true, order: "asc" },
          groups: [
            ["builtin", "external"],
            ["internal", "parent", "sibling", "index", "object", "type"],
          ],
          "newlines-between": "always",
        },
      ],
      "init-declarations": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "jsx-a11y/lang": "error",
      "jsx-a11y/no-aria-hidden-on-focusable": "error",
      "jsx-a11y/no-interactive-element-to-noninteractive-role": "error",
      "jsx-quotes": ["error"],
      "line-comment-position": "off",
      "max-classes-per-file": "off",
      "max-lines": "off",
      "max-lines-per-function": "off",
      "max-params": "off",
      "max-statements": "off",
      "multiline-comment-style": "off",
      "new-cap": ["error", { capIsNewExceptions: ["GET", "NextAuth", "Notification"] }],
      "no-inline-comments": "off",
      "no-magic-numbers": "off",
      "no-restricted-syntax": [
        "error",
        {
          message: "Utiliser plutôt l’API React",
          selector: "Identifier[name=/window|document/]",
        },
      ],
      "no-shadow": "off",
      "no-ternary": "off",
      "no-undefined": "off",
      "no-use-before-define": "off",
      "no-void": ["error", { allowAsStatement: true }],
      "one-var": ["error", "never"],
      "perfectionist/sort-imports": "off",
      "perfectionist/sort-jsx-props": "off",
      "perfectionist/sort-modules": ["error", {
        "groups": [
          [
            "export-class",
            "export-function",
            "export-enum",
            "export-interface",
            "export-type",
          ],
          "unknown",
        ],
        "type": "unsorted",
      }],
      "prefer-destructuring": "off",
      "prefer-named-capture-group": "off",
      "require-unicode-regexp": "off",
      "sonarjs/function-return-type": "off",
      "sonarjs/no-nested-functions": "off",
      "sort-imports": "off",
      "sort-keys": ["error", "asc", { "caseSensitive": false }],
      "unused-imports/no-unused-imports": "error",
    },
  },
  {
    files: ["**/*.astro"],
    rules: {
      "@typescript-eslint/no-unsafe-return": "off",
    },
  },
  {
    files: ["**/*.test.ts"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.all.rules,
      "@typescript-eslint/class-methods-use-this": "off",
      "@typescript-eslint/unbound-method": "off",
      "class-methods-use-this": "off",
      "func-style": "off",
      "no-restricted-syntax": [
        "error",
        {
          message: "Utiliser plutôt epochTime",
          selector: "NewExpression[callee.name='Date']",
        },
        {
          message: "Tu es trop couplé à cette lib, mieux vaut l’injecter",
          selector: "CallExpression[callee.object.name='vi'][callee.property.name='mock']",
        },
        {
          message: "toHaveTextContent n’est pas assez strict, privilégier expect(xxx.textContent).toBe('...')",
          selector: "[callee.property.name='toHaveTextContent']",
        },
      ],
      "no-undef": "off",
      "vitest/max-expects": "off",
      "vitest/no-conditional-expect": "off",
      "vitest/no-hooks": "off",
      "vitest/padding-around-all": "off",
      "vitest/padding-around-describe-blocks": "error",
      "vitest/padding-around-expect-groups": "off",
      "vitest/padding-around-test-blocks": "error",
      "vitest/prefer-expect-assertions": "off",
      "vitest/prefer-importing-vitest-globals": "off",
      "vitest/prefer-to-be-falsy": "off",
      "vitest/prefer-to-be-truthy": "off",
      "vitest/require-hook": "off",
      "vitest/valid-title": ["error", { "allowArguments": true }],
    },
  },
]
