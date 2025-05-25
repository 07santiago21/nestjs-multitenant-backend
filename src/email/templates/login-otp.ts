export const loginOtpTemplate = (code: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Código de inicio de sesión</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        color: #333;
      }
      .container {
        max-width: 480px;
        margin: 0 auto;
        padding: 24px;
        border: 1px solid #eee;
        border-radius: 8px;
        background-color: #fafafa;
      }
      .code {
        font-size: 32px;
        font-weight: bold;
        letter-spacing: 4px;
        margin: 20px 0;
        color: #2b6cb0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Hola 👋</h2>
      <p>Este es tu código de inicio de sesión:</p>
      <div class="code">${code}</div>
      <p>Este código es válido por <strong>15 minutos</strong>.</p>
      <p>Si no solicitaste este acceso, ignora este mensaje.</p>
      <p style="margin-top: 30px;">Gracias,<br /></p>
    </div>
  </body>
</html>
`;
