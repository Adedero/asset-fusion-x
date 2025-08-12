export default function Layout(body: string, params: { subject: string }) {
  const logo = "https://assetfusionx.com/logo.png";
  const { subject } = params;

  return `
<html lang="en">
  <head>
    <style>
      html {
        font-size: 15px;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
        outline: none;
        border: none;
      }

      body {
        width: 100vw;
        font-family: Verdana, Tahoma, Inter, sans-serif;
        font-size: 1rem;
      }

      .div {
        margin: 0.25rem 0 0.25rem 0;
      }

      .container {
        margin: auto;
        width: 98%;
        max-width: 32rem;
        padding: 1.2rem;
      }

      .rounded {
        border-radius: 5px;
      }

      .text-muted {
        color: #303030;
      }

      .link {
        color: #2354b8;
      }

      .link:hover {
        text-decoration: underline;
      }

      section {
        margin: 1rem 0;
      }

      .title {
        font-weight: 600;
        font-size: 1.3rem;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div style="width: 100%; height: 100%; border: 1px solid rgba(0, 0, 0, 0.1)">
        <header style="background-color: #f0f0f0; padding: 1rem;">
          <img src="${logo}" alt="AssetFusionX Logo" width="40" height="40">
        </header>

        <div style="padding: 1rem;">
          <section>
            <h1 class="text-muted title">
              ${subject}
            </h1>
          </section>

          ${body}
        </div>
      </div>

      <section class="text-muted" style="font-size: 0.785rem; text-align: center">
        &copy; <a class="link" href="https://assetfusionx.com" target="_blank" ref="noopener">AssetFusionX</a>. All Rights Reserved.
      </section>
    </div>
  </body>
</html>`;
}
