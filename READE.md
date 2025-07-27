# Project Tools

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
