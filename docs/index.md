Set of useful tips for developers who are using bash, git, mysql, etc.

Install:

- `python3 -m venv .venv` - install python virtual env
- `source .venv/bin/activate` - activate virtual env
- `pip install mkdocs` - install mkdocs ([more info](https://www.mkdocs.org/#installation))
- `pip install mkdocs-material` -  install material theme ([more info](https://github.com/squidfunk/mkdocs-material))
- make sure the PATH is configured: `export PATH="$HOME/.local/bin:$PATH"`

Upgrade:

- `usr/bin/python3 -m pip install --upgrade pip` - upgrade python
- `pip install --upgrade mkdocs` - upgrade mkdocs
- `pip install --upgrade mkdocs-material` -  upgrade material theme ([more info](https://github.com/squidfunk/mkdocs-material))

Usage:

- `mkdocs serve` - start HTTP server
- `mkdocs gh-deploy` - deploy to github pages
- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
