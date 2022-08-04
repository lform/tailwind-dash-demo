# Setup

-   `dash-test.pcss` - Source for demo
-   `dash-test.html` - Demo HTML doc
-   `dash-test.css` - The build CSS

## Install

1. Run `npm i`
2. Run `npm run dev` to see the issue
3. Run `npm run watch` to watch & rebuild to test solutions

# The problem

We're creating some utility classes in a `@layer utilities` layer that extend each other using `@apply` statements to create a simple header font-scaling system that utilizes modular scale. The classes work fine except if you try to use a dash-prefixed class thats been defined in the utilites layer in one of the `@apply` statements. There are workarounds but they would break the consistency of using the dash-prefix for negative values that tailwind employs uniformly.

The above repo has the full code demo but basically the follow is the problem:

```
@layer utilities {
	.h-ms {
		// Works fine
		@apply font-header leading-tight;
	}

	.h-ms-1 {
		// Works fine
		@apply h-ms text-ms-1 font-bold;
	}

	.-h-ms-1 {
		// Works fine, `-text-ms-1` is defined in the tailwind config
		@apply h-ms -text-ms-1 font-bold;
	}

	.new-class {
		// This throws the error below
		@apply -h-ms-1 italic;
	}
}
```

Which then throws the following error (the error goes away if you remove the offending dash-prefixed item in question from the apply statement):

```
TypeError: Cannot read property 'parent' of undefined
    at Root.normalize (/Users/bmf/sites/tailwind-dash-test/node_modules/postcss/lib/container.js:292:15)
    at Root.normalize (/Users/bmf/sites/tailwind-dash-test/node_modules/postcss/lib/root.js:25:23)
    at Root.insertAfter (/Users/bmf/sites/tailwind-dash-test/node_modules/postcss/lib/container.js:201:22)
    at Rule.after (/Users/bmf/sites/tailwind-dash-test/node_modules/postcss/lib/node.js:161:17)
    at processApply (/Users/bmf/sites/tailwind-dash-test/node_modules/tailwindcss/lib/lib/expandApplyAtRules.js:453:16)
    at /Users/bmf/sites/tailwind-dash-test/node_modules/tailwindcss/lib/lib/expandApplyAtRules.js:471:9
    at /Users/bmf/sites/tailwind-dash-test/node_modules/tailwindcss/lib/processTailwindFeatures.js:55:50
    at Object.Once (/Users/bmf/sites/tailwind-dash-test/node_modules/tailwindcss/lib/cli.js:682:27)
    at LazyResult.runOnRoot (/Users/bmf/sites/tailwind-dash-test/node_modules/postcss/lib/lazy-result.js:337:23)
    at LazyResult.runAsync (/Users/bmf/sites/tailwind-dash-test/node_modules/postcss/lib/lazy-result.js:393:26)
```
