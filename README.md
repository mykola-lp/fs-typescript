This is a [TypeScript](https://www.typescriptlang.org/) project.

## Running GitHub Actions Locally with `act`

To test the workflow locally without pushing to the repository, use [`act`](https://github.com/nektos/act) — it runs GitHub Actions in Docker containers, closely mimicking the real CI environment.

### Installation

```bash
curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
sudo mv ~/bin/act /usr/local/bin/act
```

Verify:
```bash
act --version
```

### Usage

Navigate to the repository root and run:

```bash
act push
```

This triggers the job that runs on `push` (the `on: push` trigger).

If the repository has multiple workflow files and you need a specific one:

```bash
act push -W .github/workflows/healthapp-e2e-tests.yml
```

### First run — choosing a container image

`act` will ask which Docker image to use:

```
Please choose the default image you want to use with act:
  Large size image: ...
  Medium size image: ...   ← choose this one
  Micro size image: ...
```

**Medium** is recommended — it's the closest match to GitHub's `ubuntu-latest` in terms of installed packages.

You can also specify it directly, skipping the interactive prompt:

```bash
act push -P ubuntu-latest=catthehacker/ubuntu:act-latest
```

### Useful flags

See what would run, without actually executing anything (dry run):

```bash
act push -n
```

Verbose output (useful if something fails unexpectedly):

```bash
act push -v
```

### Important note

`working-directory: ./healthapp` and `./healthapp-tests` use standard GitHub Actions syntax, which `act` supports the same way.

However, the `act` Docker container doesn't always have access to the same system-level dependencies as official GitHub runners. In particular, Playwright browsers may require additional system libraries — so a local run can sometimes behave differently from the real Actions run, specifically at the **Install Playwright browsers** step. If issues show up there, it doesn't necessarily mean the same will happen on GitHub.