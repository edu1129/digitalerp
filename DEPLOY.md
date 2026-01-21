# Deployment Instructions

This project is ready to be deployed to Render as a static site.

## How to Deploy to Render

1.  **Push to GitHub/GitLab**: Ensure this code is pushed to a repository on GitHub or GitLab.
2.  **Log in to Render**: Go to [dashboard.render.com](https://dashboard.render.com/) and log in.
3.  **New Static Site**: Click on "New +" and select "Static Site".
4.  **Connect Repository**: Connect your GitHub/GitLab account and select this repository.
5.  **Configure**: Render will automatically detect the settings.
    *   **Build Command**: Leave empty (or `null` if using Blueprint).
    *   **Publish Directory**: `.` (Current directory).
6.  **Deploy**: Click "Create Static Site".

## Using Render Blueprint (Recommended)

This project includes a `render.yaml` file. You can deploy using Blueprint:

1.  In Render Dashboard, click "New +" -> "Blueprint".
2.  Connect your repository.
3.  Render will read `render.yaml` and set up the service automatically.
4.  Click "Apply".

## Important Notes

*   **API Keys**: The file `indexphone.html` uses a Google Gemini API key. You need to edit the file `indexphone.html` and add your API key to the `const apiKey = "";` line before deploying if you want that feature to work.
    *   *Security Warning*: Putting API keys in client-side code is not secure for production apps, but acceptable for simple demos or if you restrict the key usage in Google Cloud Console.
*   **Google Apps Script**: The forms submit to a Google Apps Script URL. Ensure the script is deployed and has the correct permissions if you are the owner, or if you are using the existing one, ensure it is active.

## Accessing Your Site

Once the deployment is complete, Render will provide you with a URL (e.g., `https://digital-erp.onrender.com`).
