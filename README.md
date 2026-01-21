# Digital ERP

Digital ERP is a comprehensive and free school management software to digitize your institution. This repository contains the static website source code.

## Deployment

### Deploy to Render

This project is configured for easy deployment on Render.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

1.  Click the button above (or go to Render and connect your repo).
2.  Render will use the `render.yaml` file to configure the deployment automatically.
3.  Once deployed, Render will give you the live URL.

For more details, see [DEPLOY.md](DEPLOY.md).

## Project Tools

This project uses a `tools.json` file to dynamically load a list of tools into the application.

## `tools.json` Structure

The `tools.json` file should contain an array of tool objects. Each object must have the following structure:

```json
[
  {
    "name": "Tool Name",
    "description": "A brief description of what the tool does.",
    "url": "The URL where the tool is hosted, or an internal page link like '#page-id'.",
    "icon": "A URL to an icon image for the tool."
  },
  {
    "name": "Another Tool",
    "description": "Description for the second tool.",
    "url": "https://example.com/another-tool",
    "icon": "https://example.com/icon.png"
  }
]
```

### Fields

- `name` (string): The display name of the tool.
- `description` (string): A short description shown to the user on the tool button.
- `url` (string): The URL to embed in an iframe when the tool is selected. If the URL starts with a `#`, it is treated as a link to an internal page (e.g., `"#ai-tools"` will navigate to the AI Tools page).
- `icon` (string): The URL for the tool's icon image.
