<!--
Hello, and thanks for contributing to imgix.js! 🎉🙌
Please take a second to fill out PRs with the following template!
-->

# Description

<!-- What is accomplished by this PR? If there is something potentially controversial in your PR, please take a moment to tell us about your choices. -->

<!-- 
Please use the checklist that is most closely related to your PR, and delete the other checklists. -->

## Checklist: Fixing typos/Doc change

- [ ] Each commit follows the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/#summary) format: e.g. `chore(readme): fixed typo`. See the end of this file for more information.

## Checklist: Bug Fix

- [ ] Each commit follows the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/#summary) format: e.g. `chore(readme): fixed typo`. See the end of this file for more information.
- [ ] All existing unit tests are still passing (if applicable)
- [ ] Add new passing unit tests to cover the code introduced by your PR
- [ ] Update the readme
- [ ] Update or add any necessary API documentation
- [ ] Add some [steps](#steps-to-test) so we can test your bug fix

## Checklist: New Feature

- [ ] Each commit follows the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/#summary) format: e.g. `chore(readme): fixed typo`. See the end of this file for more information.
- [ ] Any breaking changes are specified on the commit on which they are introduced with `BREAKING CHANGE` in the body of the commit.
- [ ] If this is a big feature with breaking changes, consider [opening an issue](https://github.com/imgix/imgix.js/issues/new?assignees=&labels=&template=feature_request.md&title=) to discuss first. This is completely up to you, but please keep in mind that your PR might not be accepted.
- [ ] Run unit tests to ensure all existing tests are still passing
- [ ] Add new passing unit tests to cover the code introduced by your PR
- [ ] Update the readme
- [ ] Add some [steps](#steps-to-test) so we can test your cool new feature!

## Steps to Test

<!-- Delete this selction if you are just submitting a doc change/small fix -->

<!-- A code example or a set of steps is preferred -->

Related issue: [e.g. #42]

Code:

```js
// A standalone example of what the PR solves
```

<!-- A link to a codepen/codesandbox is also an option. -->

<!--

## Conventional Commit Spec

PR titles should be in the format `<type>(<scope>): <description>`. For example: `chore(readme): fix typo`

`type` can be any of the follow:
  - `feat`: a feature, or breaking change
  - `fix`: a bug-fix
  - `test`: Adding missing tests or correcting existing tests
  - `docs`: documentation only changes (readme, changelog, contributing guide)
  - `refactor`: a code change that neither fixes a bug nor adds a feature
  - `chore`: reoccurring tasks for project maintainability (example scopes: release, deps)
  - `config`: changes to tooling configurations used in the project
  - `build`: changes that affect the build system or external dependencies (example scopes: npm, bundler, gradle)
  - `ci`: changes to CI configuration files and scripts (example scopes: travis)
  - `perf`: a code change that improves performance
  - `style`: changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)

`scope` is optional, and can be anything.
`description` should be a short description of the change, written in the imperative-mood.
-->
