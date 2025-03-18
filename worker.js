const serviceaccounts = [];
const randomserviceaccount = serviceaccounts[Math.floor(Math.random() * serviceaccounts.length)];
const authConfig = {
  "client_id": "",
  "client_secret": "",
  "refresh_token": "",
  "service_account": true,
  "redirect_domain": "",
  "users_list": [{
    "username": "",
    "password": "",
  }
  ],
  "roots": [
    {
      "id": "",
      "name": "",
      "protect_file_link": true
    },
  ]
};
const crypto_base_key = "3225f86e99e205347b4310e437253bfd"
const hmac_base_key = "4d1fbf294186b82d74fff2494c04012364200263d6a36123db0bd08d6be1423c"
const encrypt_iv = new Uint8Array([247, 254, 106, 195, 32, 148, 131, 244, 222, 133, 26, 182, 20, 138, 215, 81]);
var gds = [];
const drive_list = authConfig.roots.map(it => it.id)
function html(current_drive_order = 0, model = {}) {
  return `  
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>SPRiNGLER</title>
  <meta name="robots" content="noindex">
  <script>
    window.drive_names = JSON.parse('${JSON.stringify(authConfig.roots.map(it => it.name))}');
    window.MODEL = JSON.parse('${JSON.stringify(model)}');
    window.current_drive_order = ${current_drive_order};
  </script>
  <link href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.3/dist/darkly/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
</head>
<body class="d-flex flex-column min-vh-100">
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
  <script src="/app.js"></script>
  <script type="module" src="https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs"></script>
  <script src="https://cdn.jsdelivr.net/npm/marked@15.0.7/lib/marked.umd.js"></script>
</body>
</html>`;
};
const homepage = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>SPRiNGLER</title>
  <meta name="robots" content="noindex">
  <script>
    window.drive_names = JSON.parse('${JSON.stringify(authConfig.roots.map(it => it.name))}');
  </script>
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.3/dist/darkly/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
</head>
<body class="d-flex flex-column min-vh-100">
  <header>
      <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">SPRiNGLER</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <a class="nav-link" href="https://telegra.ph/SUPPORT-US-02-19" target="_blank">Support</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/logout">Logout</a>
              </li>
            </ul>
            <form class="d-flex" method="get" action="/0:search" id="search_bar_form">
              <input class="form-control me-sm-2" name="q" type="search" placeholder="Search" required>
              <button class="btn btn-secondary" type="submit">Search</button>
           </form>
          </div>
        </div>
      </nav>
  </header>
  <main id="content" style="padding-top: 20px;">
    <div class="container">
      <div class="alert alert-primary d-flex align-items-center" role="alert" style="margin-bottom: 0; padding-bottom: 0;">
        <nav style="--bs-breadcrumb-divider: '>';">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/">Home</a>
            </li>
          </ol>
        </nav>
      </div>
      <div id="list" class="list-group text-break"></div>
      <div class="alert alert-secondary text-center" role="alert" id="count">Total <span id="n_drives" class="number text-center"></span> drives</div>
    </div>
  </main>
  <button id="back-to-top" class="btn btn-secondary btn-lg shadow border border-light" style="position: fixed; bottom: 85px; right: 10px; display: none; z-index: 2;" role="button">
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
      <path fill="#ffffff" d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
    </svg>
  </button>
  <footer class="footer text-center mt-auto container bg-primary" style="border-radius: .5rem .5rem 0 0; border: 1px solid rgba(140, 130, 115, 0.13);">
    <div class="container" style="padding-top: 15px;">
      <div class="row">
        <div class="col-lg-12 col-md-12">
          <p>© <script type="text/javascript">document.write(new Date().getFullYear())</script> - <span style="color: #00BC8C;">SPRiNGLER</span>, All Rights Reserved.</p>
          <script>
            let btt = document.getElementById("back-to-top");
            window.onscroll = function () {
                scrollFunction();
            };
            function scrollFunction() {
                if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                    btt.style.display = "block";
                } else {
                    btt.style.display = "none";
                }
            }
            btt.addEventListener("click", backToTop);
                function backToTop() {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                }
          </script>
        </div>
      </div>
    </div>
  </footer>
</body>
  <script src="/assets/homepage.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</html>`
const login_html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Sign in - SPRiNGLER</title>
  <meta name="robots" content="noindex, nofollow">
  <meta name="googlebot" content="noindex, nofollow">
  <link href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.3/dist/darkly/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
  <style>
    #error-message { display:none; }
  </style>
</head>
<body>
<div class="container d-flex justify-content-center align-items-center vh-100">
  <div class="card bg-secondary">
    <div class="card-body">
      <h5 class="card-title text-center">SPRiNGLER</h5>
        <div id="error-message" class="alert alert-danger"></div>
          <form id="login-form" method="post">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" required>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" required>
            </div>
              <div class="mb-3 cf-turnstile" data-sitekey=""></div>
            <button type="submit" class="btn btn-primary w-100">LOGIN</button>
          </form>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
  <script>
    $(document).ready(function(){
    $("#login-form").on("submit", function(event) {
      event.preventDefault();
      const formData = new URLSearchParams();
      formData.append('username', $("#username").val());
      formData.append('password', $("#password").val());
      fetch('/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      })
      .then(res => res.json())
      .then(data => {
        if (!data.ok) {
          $("#error-message").show().text("Invalid Credentials");
        } else {
          window.location.reload();
        }
        });
    });
    const queryparams = new URLSearchParams(window.location.search);
    if (queryparams.get('error')) {
      $("#error-message").show().text(queryparams.get('error'));
    }
    });
  </script>
</div>
</body>
</html>`
const not_found = `
<!DOCTYPE html>
<html lang=en>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1, minimum-scale=1, width=device-width">
  <title>Error 404 (Not Found)</title>
  <style>
  * {
    margin: 0;
    padding: 0;
  }
  html, code {
    font: 15px/22px;
  }
  html {
    background: #fff;
    color: #222;
    padding: 15px;
  }
  body {
    margin: 7% auto 0;
    max-width: 390px;
    min-height: 180px;
    padding: 30px 0 15px;
    background:url(https://raw.githubusercontent.com/kvnprdtyaa/google-drive-index/refs/heads/main/images/robot.png) 100% 5px no-repeat;
    padding-right: 205px;
  }
  p {
    margin: 11px 0 22px;
    overflow: hidden;
  } 
  ins {
    color:#777;
    text-decoration: none;
  }
  a img {
    border: 0;
  }
  @media screen and (max-width:772px) {
    body {
      background: none;
      margin-top: 0;
      max-width: none;
      padding-right: 0;
    }
  }
  #logo {
    background:url(https://raw.githubusercontent.com/kvnprdtyaa/google-drive-index/refs/heads/main/images/Google%20Logo%201x%20150x54dp.png) no-repeat;
    display: inline-block;
    height: 54px;
    width: 150px;
    margin-left: -5px;
  }
  @media only screen and (min-resolution:192dpi), only screen and (-webkit-min-device-pixel-ratio: 2) {
    #logo {
      background:url(https://raw.githubusercontent.com/kvnprdtyaa/google-drive-index/refs/heads/main/images/Google%20Logo%202x%20150x54dp.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  </style>
</head>
<body>
  <a href="//www.google.com/"><span id="logo" aria-label="Google"></span></a>
  <p><b>404.</b> <ins>That’s an error.</ins></p>
  <p id="status"></p>

  <script>
    document.getElementById("status").innerHTML = "The requested URL <code>" + window.location.pathname + "</code> was not found on this server.  <ins>That’s all we know.</ins>";
  </script>
</body>
</html>`

const directlink = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1, minimum-scale=1, width=device-width">
  <title>Direct Link - Access Denied</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100vh;
      color: #b0bec5;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 100;
      background-color: #f5f5f5;
    }
    .content {
      text-align: center;
    }
    .message {
      font-size: 80px;
      margin-bottom: 40px;
    }
    a {
      text-decoration: none;
      color: #3498db;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      color: #fff;
      background-color: #3498db;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover {
      background-color: #2980b9;
    }
  </style>
</head>
<body>
  <div class="content">
    <div class="message">Access Denied</div>
    <a href="#"><button id="goto">Click Here to Proceed!</button></a>
  </div>
</body>
</html>`
const SearchFunction = {
  formatSearchKeyword: function (keyword) {
    let nothing = "";
    let space = " ";
    if (!keyword) return nothing;
    return keyword.replace(/(!=)|['"=<>/\\:]/g, nothing)
      .replace(/[,，|(){}]/g, space)
      .trim()
  }
};
const DriveFixedTerms = new (class {
  default_file_fields = 'parents,id,name,mimeType,modifiedTime,createdTime,fileExtension,size';
  gd_root_type = {
    user_drive: 0,
    share_drive: 1
  };
  folder_mime_type = 'application/vnd.google-apps.folder';
})();
const JSONWebToken = {
  header: {
    alg: 'RS256',
    typ: 'JWT'
  },
  importKey: async function (pemKey) {
    var pemDER = this.textUtils.base64ToArrayBuffer(pemKey.split('\n').map(s => s.trim()).filter(l => l.length && !l.startsWith('---')).join(''));
    return crypto.subtle.importKey('pkcs8', pemDER, {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256'
    }, false, ['sign']);
  },
  createSignature: async function (text, key) {
    const textBuffer = this.textUtils.stringToArrayBuffer(text);
    return crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, textBuffer)
  },
  generateGCPToken: async function (serviceAccount) {
    const iat = parseInt(Date.now() / 1000);
    var payload = {
      "iss": serviceAccount.client_email,
      "scope": "https://www.googleapis.com/auth/drive",
      "aud": "https://oauth2.googleapis.com/token",
      "exp": iat + 3600,
      "iat": iat
    };
    const encPayload = btoa(JSON.stringify(payload));
    const encHeader = btoa(JSON.stringify(this.header));
    var key = await this.importKey(serviceAccount.private_key);
    var signed = await this.createSignature(encHeader + "." + encPayload, key);
    return encHeader + "." + encPayload + "." + this.textUtils.arrayBufferToBase64(signed).replace(/\//g, '_').replace(/\+/g, '-');
  },
  textUtils: {
    base64ToArrayBuffer: function (base64) {
      var binary_string = atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    },
    stringToArrayBuffer: function (str) {
      var len = str.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = str.charCodeAt(i);
      }
      return bytes.buffer;
    },
    arrayBufferToBase64: function (buffer) {
      let binary = '';
      let bytes = new Uint8Array(buffer);
      let len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    }
  }
};
async function encryptString(string, iv) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(crypto_base_key),
    "AES-CBC",
    false,
    ["encrypt"]
  );
  const encodedId = new TextEncoder().encode(string);
  const encryptedData = await crypto.subtle.encrypt({
    name: "AES-CBC",
    iv: encrypt_iv
  },
    key,
    encodedId
  );
  const encryptedString = btoa(Array.from(new Uint8Array(encryptedData), (byte) => String.fromCharCode(byte)).join(""));
  return encryptedString;
}
async function decryptString(encryptedString) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(crypto_base_key),
    "AES-CBC",
    false,
    ["decrypt"]
  );
  const encryptedBytes = Uint8Array.from(atob(encryptedString), (char) => char.charCodeAt(0));
  const decryptedData = await crypto.subtle.decrypt({
    name: "AES-CBC",
    iv: encrypt_iv
  },
    key,
    encryptedBytes
  );
  const decryptedString = new TextDecoder().decode(decryptedData);
  return decryptedString;
}
async function genIntegrity(data, key = hmac_base_key) {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hmacKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key), {
    name: 'HMAC',
    hash: 'SHA-256'
  },
    false,
    ['sign']
  );
  const hmacBuffer = await crypto.subtle.sign('HMAC', hmacKey, dataBuffer);
  const hmacArray = Array.from(new Uint8Array(hmacBuffer));
  const hmacHex = hmacArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  return hmacHex;
}
async function checkintegrity(text1, text2) {
  return text1 === text2;
}
function login() {
  return new Response(login_html, {
    status: 401,
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  });
}
async function handleRequest(request, event) {
  const referer = request.headers.get("Referer");
  var user_ip = request.headers.get("CF-Connecting-IP");
  let url = new URL(request.url);
  let path = url.pathname;
  let hostname = url.hostname;
  if (path == '/app.js') {
    const js = await fetch('https://rawcdn.githack.com/kvnprdtyaa/google-drive-index/7c52e64be6ef4119b94947cbbbe90771024e65ea/app.js', {
      method: 'GET',
    })
    const data = await js.text()
    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    });
  }
  if (path == '/assets/homepage.js') {
    const js = await fetch('https://rawcdn.githack.com/kvnprdtyaa/google-drive-index/be116ec732f8a33c811b42cd1da4797d1d5b5c8b/assets/homepage.js', {
      method: 'GET',
    })
    const data = await js.text()
    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    });
  }
  if (path == '/logout') {
    let response = new Response("", {});
    response.headers.set('Set-Cookie', `session=; HttpOnly; Secure; SameSite=Lax;`);
    response.headers.set("Refresh", "1; url=/");
    return response;
  }
  if (path == '/findpath') {
    const params = url.searchParams;
    const id = params.get('id');
    const view = params.get('view') || 'false';
    return Response.redirect(url.protocol + hostname + '/0:findpath?id=' + id + '&view=' + view, 307);
  }
  if (path == '/download.aspx') {
    console.log("Anonymous Download")
  } else if (path == '/google_callback') {
    const code = url.searchParams.get('code')
    if (!code) {
      return new Response('Missing authorization code.', {
        status: 400
      });
    }
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        redirect_uri: authConfig.redirect_domain + '/google_callback',
        grant_type: 'authorization_code',
      }),
    });
    const data = await response.json();
    console.log(JSON.stringify(data));
    if (response.ok) {
      const idToken = data.id_token;
      const decodedIdToken = await decodeJwtToken(idToken);
      const username = decodedIdToken.email;
      let user_found = false;
      for (i = 0; i < authConfig.users_list.length; i++) {
        if (authConfig.users_list[i].username == username) {
          user_found = true;
          console.log("User Found")
          break;
        }
      }
      const current_time = Date.now();
      const session_time = current_time + 86400000 * 1;
      const encryptedSession = `${await encryptString(username)}|${await encryptString(kv_key)}|${await encryptString(session_time.toString())}`;
      let response = new Response("", {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Set-Cookie': `session=${encryptedSession}; path=/; HttpOnly; Secure; SameSite=Lax`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Refresh': '0; url=/',
        }
      });
      return response;
    } else {
      let response = new Response('Invalid Token!', {});
      response.headers.set('Set-Cookie', `session=; HttpOnly; Secure; SameSite=Lax;`);
      response.headers.set("Refresh", "1; url=/?error=Invalid Token");
      return response;
    }
  } else if (request.method === 'POST' && path === '/login') {
    console.log("POST Request for Login")
    const formdata = await request.formData();
    const username = formdata.get('username');
    const password = formdata.get('password');
    {
      for (i = 0; i < authConfig.users_list.length; i++) {
        if (authConfig.users_list[i].username == username && authConfig.users_list[i].password == password) {
          var user_found = true;
          break;
        }
      }
    }
    if (!user_found) {
      const jsonResponse = {
        ok: false,
      }
      let response = new Response(JSON.stringify(jsonResponse), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }
      });
      return response;
    }
    if (user_found) {
      const current_time = Date.now();
      const session_time = current_time + 86400000 * 1;
      const encryptedSession = `${await encryptString(username)}|${await encryptString(password)}|${await encryptString(session_time.toString())}`;
      const jsonResponse = {
        ok: true,
      }
      let response = new Response(JSON.stringify(jsonResponse), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Set-Cookie': `session=${encryptedSession}; path=/; HttpOnly; Secure; SameSite=Lax`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }
      });
      return response;
    } else {
      const jsonResponse = {
        ok: false,
      }
      let response = new Response(JSON.stringify(jsonResponse), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }
      });
      return response;
    }
  } else if (request.method === 'GET') {
    const cookie = request.headers.get('cookie');
    if (cookie && cookie.includes('session=')) {
      const session = cookie.split('session=').pop().split(';').shift().trim();
      if (session == 'null' || session == '' || session == null) {
        return login()
      }
      const username = await decryptString(session.split('|')[0]);
      const session_time = await decryptString(session.split('|')[2]);
      console.log("User: " + username + " | Session Time: " + session_time)
      const current_time = Date.now();
      if (Number(session_time) < current_time) {
        let response = new Response('Session Expired!', {
          headers: {
            'Set-Cookie': `session=; HttpOnly; Secure; SameSite=Lax;`,
          }
        });
        response.headers.set("Refresh", "1; url=/?error=Session Expired!");
        return response;
      }
      for (i = 0; i < authConfig.users_list.length; i++) {
        if (authConfig.users_list[i].username == username) {
          var user_found = true;
          break;
        }
      }
      if (user_found) {
        console.log("User Found")
      } else {
        let response = new Response('Invalid User! Something Wrong', {});
        response.headers.set('Set-Cookie', `session=; HttpOnly; Secure; SameSite=Lax;`);
        response.headers.set("Refresh", "1; url=/?error=Invalid User");
        return response;
      }
    } else {
      return login()
    }
  }
  if (gds.length === 0) {
    for (let i = 0; i < authConfig.roots.length; i++) {
      const gd = new googleDrive(authConfig, i);
      await gd.init();
      gds.push(gd)
    }
    let tasks = [];
    gds.forEach(gd => {
      tasks.push(gd.initRootType());
    });
    for (let task of tasks) {
      await task;
    }
  }
  let gd;
  function redirectToIndexPage() {
    return new Response('', {
      status: 307,
      headers: {
        'Location': `${url.origin}/0:/`
      }
    });
  }
  if (path == '/') {
    return new Response(homepage, {
      status: 200,
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    })
  } else if (path == '/fallback') {
    return new Response(html(0, {
      is_search_page: false,
      root_type: 1
    }), {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    });
  } else if (path == '/download.aspx') {
    console.log("Download.aspx started");
    const file = await decryptString(url.searchParams.get('file'));
    console.log(file)
    const expiry = await decryptString(url.searchParams.get('expiry'));
    let integrity_result = false;
    if (user_ip) {
      const integrity = await genIntegrity(`${file}|${expiry}|${user_ip}`);
      const mac = url.searchParams.get('mac');
      integrity_result = await checkintegrity(mac, integrity);
    }
    if (integrity_result) {
      let range = request.headers.get('Range');
      const inline = 'true' === url.searchParams.get('inline');
      console.log(file, range)
      return download(file, range, inline);
    } else {
      return new Response('Invalid Request!', {
        status: 401,
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      })
    }
  }
  if (referer == null) {
    return new Response(directlink, {
      headers: {
        'content-type': 'text/html;charset=UTF-8'
      },
      status: 401
    });
  } else if (referer.includes(hostname)) {
    console.log("Refer Detected");
  } else {
    return new Response(directlink, {
      headers: {
        'content-type': 'text/html;charset=UTF-8'
      },
      status: 401
    });
  }
  const command_reg = /^\/(?<num>\d+):(?<command>[a-zA-Z0-9]+)(\/.*)?$/g;
  const match = command_reg.exec(path);
  if (match) {
    const num = match.groups.num;
    const order = Number(num);
    if (order >= 0 && order < gds.length) {
      gd = gds[order];
    } else {
      return redirectToIndexPage()
    }
    const command = match.groups.command;
    if (command === 'search') {
      if (request.method === 'POST') {
        return handleSearch(request, gd, user_ip);
      } else {
        const params = url.searchParams;
        return new Response(html(gd.order, {
          q: params.get("q").replace(/'/g, "").replace(/"/g, "") || '',
          is_search_page: true,
          root_type: gd.root_type
        }), {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8'
          }
        });
      }
    } else if (command === 'id2path' && request.method === 'POST') {
      return handleId2Path(request, gd)
    } else if (command === 'fallback' && request.method === 'POST') {
      const formdata = await request.json();
      const id = await decryptString(formdata.id);
      const type = formdata.type;
      if (type && type == 'folder') {
        const page_token = formdata.page_token || null;
        const page_index = formdata.page_index || 0;
        const details = await gd._list_gdrive_files(id, page_token, page_index);
        for (const file of details.data.files) {
          if (file.mimeType != 'application/vnd.google-apps.folder') {
            file.link = await generateLink(file.id, user_ip);
          }
          file.driveId = await encryptString(file.driveId);
          file.id = await encryptString(file.id);
        }
        const encryptedDetails = details;
        return new Response(JSON.stringify(encryptedDetails), {});
      }
      const details = await gd.findItemById(id)
      details.link = await generateLink(details.id, user_ip);
      details.id = formdata.id;
      details.parents[0] = null;
      return new Response(JSON.stringify(details), {});
    } else if (command === 'findpath' && request.method === 'GET') {
      return findId2Path(gd, url)
    }
  }
  const common_reg = /^\/\d+:\/.*$/g;
  try {
    if (!path.match(common_reg)) {
      return redirectToIndexPage();
    }
    let split = path.split("/");
    let order = Number(split[1].slice(0, -1));
    if (order >= 0 && order < gds.length) {
      gd = gds[order];
    } else {
      return redirectToIndexPage()
    }
  } catch (e) {
    return redirectToIndexPage()
  }
  if (request.method == 'POST') {
    return apiRequest(request, gd, user_ip);
  }
  let action = url.searchParams.get('a');
  if (path.slice(-1) == '/' || action != null) {
    return new Response(html(gd.order, {
      root_type: gd.root_type
    }), {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    });
  } else {
    console.log(path)
    const file = await gd.get_single_file(path.slice(3));
    console.log(file)
    let range = request.headers.get('Range');
    const inline = 'true' === url.searchParams.get('inline');
    if (gd.root.protect_file_link) return login();
    return download(file.id, range, inline);
  }
}
function enQuery(data) {
  const ret = [];
  for (let d in data) {
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  }
  return ret.join('&');
}
async function getAccessToken() {
  if (authConfig.expires == undefined || authConfig.expires < Date.now()) {
    const obj = await fetchAccessToken();
    if (obj.access_token != undefined) {
      authConfig.accessToken = obj.access_token;
      authConfig.expires = Date.now() + 3500 * 1000;
    }
  }
  return authConfig.accessToken;
}
async function fetchAccessToken() {
  console.log("fetchAccessToken");
  const url = "https://www.googleapis.com/oauth2/v4/token";
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  var post_data;
  if (authConfig.service_account && typeof randomserviceaccount != "undefined") {
    const jwttoken = await JSONWebToken.generateGCPToken(randomserviceaccount);
    post_data = {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwttoken,
    };
  } else {
    post_data = {
      client_id: authConfig.client_id,
      client_secret: authConfig.client_secret,
      refresh_token: authConfig.refresh_token,
      grant_type: "refresh_token",
    };
  }
  let requestOption = {
    'method': 'POST',
    'headers': headers,
    'body': enQuery(post_data)
  };
  let response;
  for (let i = 0; i < 3; i++) {
    response = await fetch(url, requestOption);
    if (response.ok) {
      break;
    }
    await sleep(800 * (i + 1));
  }
  return await response.json();
}
async function sleep(ms) {
  return new Promise(function (resolve, reject) {
    let i = 0;
    setTimeout(function () {
      console.log('sleep' + ms);
      i++;
      if (i >= 2) reject(new Error('i>=2'));
      else resolve(i);
    }, ms);
  })
}
async function generateLink(file_id, user_ip, iv) {
  const encrypted_id = await encryptString(file_id, iv);
  const expiry = Date.now() + 1000 * 60 * 60 * 24 * 1;
  const encrypted_expiry = await encryptString(expiry.toString(), iv);
  let url
  if (user_ip) {
    const encrypted_ip = await encryptString(user_ip, iv);
    const integrity = await genIntegrity(`${file_id}|${expiry}|${user_ip}`);
    url = `/download.aspx?file=${encodeURIComponent(encrypted_id)}&expiry=${encodeURIComponent(encrypted_expiry)}&ip=${encodeURIComponent(encrypted_ip)}&mac=${encodeURIComponent(integrity)}`;
  } else {
    const integrity = await genIntegrity(`${file_id}|${expiry}`);
    url = `/download.aspx?file=${encodeURIComponent(encrypted_id)}&expiry=${encodeURIComponent(encrypted_expiry)}&mac=${encodeURIComponent(integrity)}`;
  }
  return url;
}
async function apiRequest(request, gd, user_ip) {
  let url = new URL(request.url);
  let path = url.pathname;
  path = path.replace(gd.url_path_prefix, '') || '/';
  console.log("handling apirequest: " + path);
  let option = {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  if (path.slice(-1) == '/') {
    let requestData = await request.json();
    let list_result = await gd.request_list_of_files(
      path,
      requestData.page_token || null,
      Number(requestData.page_index) || 0
    );
    let password = await gd.password(path);
    if (password && password.replace("\n", "") !== form.get('password')) {
      let html = `Y29kZWlzcHJvdGVjdGVk=0Xfi4icvJnclBCZy92dzNXYwJCI6ISZnF2czVWbiwSMwQDI6ISZk92YisHI6IicvJnclJyeYmFzZTY0aXNleGNsdWRlZA==`;
      return new Response(html, option);
    }
    list_result.data.files = await Promise.all(list_result.data.files.map(async (file) => {
      const {
        driveId,
        id,
        mimeType,
        ...fileWithoutId
      } = file;
      const encryptedId = await encryptString(id);
      const encryptedDriveId = await encryptString(driveId);
      let link = null;
      if (mimeType !== 'application/vnd.google-apps.folder') {
        link = await generateLink(id, user_ip);
      }
      return {
        ...fileWithoutId,
        id: encryptedId,
        driveId: encryptedDriveId,
        mimeType: mimeType,
        link: link,
      };
    }));
    const encryptedFiles = list_result;
    const data = JSON.stringify(encryptedFiles)
    return new Response(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  } else {
    let file_json = await gd.get_single_file(path);
    const {
      driveId,
      id,
      ...fileWithoutId
    } = file_json;
    const encryptedId = await encryptString(id);
    const encryptedDriveId = await encryptString(driveId);
    const link = await generateLink(id, user_ip);
    const encryptedFile = {
      ...fileWithoutId,
      id: encryptedId,
      driveId: encryptedDriveId,
      link: link,
    };
    const encryptedFiles = encryptedFile;
    const data = JSON.stringify(encryptedFiles)
    return new Response(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=UTF-8'

      }
    });
  }
}
async function handleSearch(request, gd, user_ip = '') {
  const option = {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };
  const requestData = await request.json();
  const q = requestData.q || '';
  const pageToken = requestData.page_token || null;
  const pageIndex = Number(requestData.page_index) || 0;
  if (q == '') return new Response(JSON.stringify({
    "nextPageToken": null,
    "curPageIndex": 0,
    "data": {
      "files": []
    }
  }), option);
  const searchResult = await gd.searchFilesinDrive(q, pageToken, pageIndex);
  searchResult.data.files = await Promise.all(searchResult.data.files.map(async (file) => {
    const {
      driveId,
      id,
      ...fileWithoutId
    } = file;
    const encryptedId = await encryptString(id);
    const encryptedDriveId = await encryptString(driveId);
    const link = await generateLink(id, user_ip);
    return {
      ...fileWithoutId,
      id: encryptedId,
      driveId: encryptedDriveId,
      link: link,
    };
  }));
  return new Response(JSON.stringify(searchResult), option);
}
async function handleId2Path(request, gd) {
  let url = new URL(request.url);
  const option = {
    status: 200,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    }
  };
  try {
    const data = await request.json();
    const id = await decryptString(data.id);
    let [path, prefix] = await gd.findPathById(id);
    let jsonpath = '{"path": "/' + prefix + ':' + path + '"}'
    console.log(jsonpath)
    return new Response(jsonpath || '', option);
  } catch (error) {
    console.log(error)
    return new Response('{"message":"Request Failed or Path Not Found","error":"' + error + '"}', {
      status: 500,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      }
    });
  }
}
async function findId2Path(gd, url) {
  try {
    let [path, prefix] = await gd.findPathById(url.searchParams.get('id'));
    console.log(path, prefix)
    if (!path) {
      return new Response("Invalid URL");
    } else if (url.searchParams.get('view') && url.searchParams.get('view') == 'true') {
      return Response.redirect("https://" + url.hostname + "/" + prefix + ":" + path + "?a=view" || '', 302);
    } else {
      return Response.redirect("https://" + url.hostname + "/" + prefix + ":" + path || '', 302);
    }
  } catch (error) {
    const encrypted_id = await encryptString(url.searchParams.get('id'), encrypt_iv)
    return Response.redirect("https://" + url.hostname + "/fallback?id=" + encrypted_id || '', 302);
  }
}
class googleDrive {
  constructor(authConfig, order) {
    this.order = order;
    this.root = authConfig.roots[order];
    this.root.protect_file_link = this.root.protect_file_link || false;
    this.url_path_prefix = `/${order}:`;
    this.authConfig = authConfig;
    this.paths = [];
    this.files = [];
    this.passwords = [];
    this.paths["/"] = this.root['id'];
  }
  async init() {
    await getAccessToken();
    if (authConfig.user_drive_real_root_id) return;
    const root_obj = await (gds[0] || this).findItemById('root');
    if (root_obj && root_obj.id) {
      authConfig.user_drive_real_root_id = root_obj.id
    }
  }
  async initRootType() {
    const root_id = this.root['id'];
    const types = DriveFixedTerms.gd_root_type;
    if (root_id === 'root' || root_id === authConfig.user_drive_real_root_id) {
      this.root_type = types.user_drive;
    } else {
      this.root_type = types.share_drive;
    }
  }
  async get_single_file(path) {
    if (typeof this.files[path] == 'undefined') {
      this.files[path] = await this.get_single_file_api(path);
    }
    return this.files[path];
  }
  async get_single_file_api(path) {
    let arr = path.split('/');
    let name = arr.pop();
    name = decodeURIComponent(name).replace(/\'/g, "\\'");
    let dir = arr.join('/') + '/';
    console.log("try " + name, dir);
    let parent = await this.findPathId(dir);
    console.log("try " + parent)
    let url = 'https://www.googleapis.com/drive/v3/files';
    let params = {
      'includeItemsFromAllDrives': true,
      'supportsAllDrives': true
    };
    params.q = `'${parent}' in parents and name = '${name}' and trashed = false and mimeType != 'application/vnd.google-apps.shortcut'`;
    params.fields = "files(id, name, mimeType, size ,createdTime, modifiedTime, iconLink, thumbnailLink, driveId, fileExtension)";
    url += '?' + enQuery(params);
    let requestOption = await this.requestOptions();
    let response;
    for (let i = 0; i < 3; i++) {
      response = await fetch(url, requestOption);
      if (response.ok) {
        break;
      }
      await sleep(800 * (i + 1));
    }
    let obj = await response.json();
    return obj.files[0];
  }
  async request_list_of_files(path, page_token = null, page_index = 0) {
    if (this.path_children_cache == undefined) {
      this.path_children_cache = {};
    }
    if (this.path_children_cache[path] &&
      this.path_children_cache[path][page_index] &&
      this.path_children_cache[path][page_index].data
    ) {
      let child_obj = this.path_children_cache[path][page_index];
      return {
        nextPageToken: child_obj.nextPageToken || null,
        curPageIndex: page_index,
        data: child_obj.data
      };
    }
    let id = await this.findPathId(path);
    let result = await this._list_gdrive_files(id, page_token, page_index);
    let data = result.data;
    if (result.nextPageToken && data.files) {
      if (!Array.isArray(this.path_children_cache[path])) {
        this.path_children_cache[path] = []
      }
      this.path_children_cache[path][Number(result.curPageIndex)] = {
        nextPageToken: result.nextPageToken,
        data: data
      };
    }
    return result
  }
  async _list_gdrive_files(parent, page_token = null, page_index = 0) {
    if (parent == undefined) {
      return null;
    }
    let obj;
    let params = {
      'includeItemsFromAllDrives': true,
      'supportsAllDrives': true
    };
    params.q = `'${parent}' in parents and trashed = false AND name !='.password' and mimeType != 'application/vnd.google-apps.shortcut' and mimeType != 'application/vnd.google-apps.document' and mimeType != 'application/vnd.google-apps.spreadsheet' and mimeType != 'application/vnd.google-apps.form' and mimeType != 'application/vnd.google-apps.site'`;
    params.orderBy = 'folder, name, modifiedTime desc';
    params.fields = "nextPageToken, files(id, name, mimeType, size, modifiedTime, driveId, kind, fileExtension)";
    params.pageSize = 100;
    if (page_token) {
      params.pageToken = page_token;
    }
    let url = 'https://www.googleapis.com/drive/v3/files';
    url += '?' + enQuery(params);
    let requestOption = await this.requestOptions();
    let response;
    for (let i = 0; i < 3; i++) {
      response = await fetch(url, requestOption);
      if (response.ok) {
        break;
      }
      await sleep(800 * (i + 1));
    }
    obj = await response.json();
    return {
      nextPageToken: obj.nextPageToken || null,
      curPageIndex: page_index,
      data: obj
    };
  }
  async password(path) {
    if (this.passwords[path] !== undefined) {
      return this.passwords[path];
    }
    let file = await this.get_single_file(path + '.password');
    if (file == undefined) {
      this.passwords[path] = null;
    } else {
      let url = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`;
      let requestOption = await this.requestOptions();
      let response = await this.fetch200(url, requestOption);
      this.passwords[path] = await response.text();
    }
    return this.passwords[path];
  }
  async searchFilesinDrive(origin_keyword, page_token = null, page_index = 0) {
    const types = DriveFixedTerms.gd_root_type;
    const is_user_drive = this.root_type === types.user_drive;
    const is_share_drive = this.root_type === types.share_drive;
    const empty_result = {
      nextPageToken: null,
      curPageIndex: page_index,
      data: null
    };
    if (!is_user_drive && !is_share_drive) {
      return empty_result;
    }
    let keyword = SearchFunction.formatSearchKeyword(origin_keyword);
    if (!keyword) {
      return empty_result;
    }
    let words = keyword.split(/\s+/);
    let name_search_str = `name contains '${words.join("' AND name contains '")}'`;
    let params = {};
    if (is_user_drive) {
      params.corpora = 'allDrives';
      params.includeItemsFromAllDrives = true;
      params.supportsAllDrives = true;
    }
    if (is_share_drive) {
      params.corpora = 'allDrives';
      params.includeItemsFromAllDrives = true;
      params.supportsAllDrives = true;
    }
    if (page_token) {
      params.pageToken = page_token;
    }
    params.q = `trashed = false AND mimeType != 'application/vnd.google-apps.shortcut' and mimeType != 'application/vnd.google-apps.document' and mimeType != 'application/vnd.google-apps.spreadsheet' and mimeType != 'application/vnd.google-apps.form' and mimeType != 'application/vnd.google-apps.site' AND name !='.password' AND (${name_search_str})`;
    params.fields = "nextPageToken, files(id, driveId, name, mimeType, size , modifiedTime)";
    params.pageSize = 50;
    params.orderBy = 'folder, name, modifiedTime desc';
    let url = 'https://www.googleapis.com/drive/v3/files';
    url += '?' + enQuery(params);
    let requestOption = await this.requestOptions();
    let response;
    for (let i = 0; i < 3; i++) {
      response = await fetch(url, requestOption);
      if (response.ok) {
        break;
      }
      await sleep(800 * (i + 1));
    }
    let res_obj = await response.json();
    return {
      nextPageToken: res_obj.nextPageToken || null,
      curPageIndex: page_index,
      data: res_obj
    };
  }
  async findParentFilesRecursion(child_id, drive_index_no, contain_myself = true) {
    const gd = this;
    const gd_root_id = gd.root.id;
    const user_drive_real_root_id = authConfig.user_drive_real_root_id;
    const is_user_drive = gd.root_type === DriveFixedTerms.gd_root_type.user_drive;
    const target_top_id = is_user_drive ? user_drive_real_root_id : gd_root_id;
    const fields = DriveFixedTerms.default_file_fields;
    const parent_files = [];
    let meet_top = false;
    async function addItsFirstParent(file_obj) {
      if (!file_obj) return;
      if (!file_obj.parents) return null;
      if (file_obj.parents.length < 1) return;
      let p_ids = file_obj.parents;
      if (p_ids && p_ids.length > 0) {
        const first_p_id = p_ids[0];
        console.log(first_p_id)
        if (drive_list.includes(first_p_id)) {
          meet_top = true;
          drive_index_no = drive_list.indexOf(first_p_id);
          return drive_index_no;
        }
        const p_file_obj = await gd.findItemById(first_p_id);
        if (p_file_obj && p_file_obj.id) {
          parent_files.push(p_file_obj);
          await addItsFirstParent(p_file_obj);
        }
      }
      return drive_index_no;
    }
    const child_obj = await gd.findItemById(child_id);
    if (contain_myself) {
      parent_files.push(child_obj);
    }
    const drive_id = await addItsFirstParent(child_obj);
    console.log("parents -- " + JSON.stringify(parent_files))
    return meet_top ? [parent_files, drive_index_no] : null;
  }
  async findPathById(child_id) {
    let p_files
    let drive_index_no = 0;
    try {
      [p_files, drive_index_no] = await this.findParentFilesRecursion(child_id);
    } catch (error) {
      return null;
    }
    if (!p_files || p_files.length < 1) return '';
    let cache = [];
    p_files.forEach((value, idx) => {
      const is_folder = idx === 0 ? (p_files[idx].mimeType === DriveFixedTerms.folder_mime_type) : true;
      let path = '/' + p_files.slice(idx).map(it => encodeURIComponent(it.name)).reverse().join('/');
      if (is_folder) path += '/';
      cache.push({
        id: p_files[idx].id,
        path: path
      })
    });
    return [cache[0].path, drive_index_no];
  }
  async findItemById(id) {
    const is_user_drive = this.root_type === DriveFixedTerms.gd_root_type.user_drive;
    let url = `https://www.googleapis.com/drive/v3/files/${id}?fields=${DriveFixedTerms.default_file_fields}${is_user_drive ? '' : '&supportsAllDrives=true'}`;
    let requestOption = await this.requestOptions();
    let res = await fetch(url, requestOption);
    return await res.json()
  }
  async findPathId(path) {
    let c_path = '/';
    let c_id = this.paths[c_path];
    let arr = path.trim('/').split('/');
    for (let name of arr) {
      c_path += name + '/';
      if (typeof this.paths[c_path] == 'undefined') {
        let id = await this._findDirId(c_id, name);
        this.paths[c_path] = id;
      }
      c_id = this.paths[c_path];
      if (c_id == undefined || c_id == null) {
        break;
      }
    }
    console.log('findPathId: ', path, c_id)
    return this.paths[path];
  }
  async _findDirId(parent, name) {
    name = decodeURIComponent(name).replace(/\'/g, "\\'");
    if (parent == undefined) {
      return null;
    }
    let url = 'https://www.googleapis.com/drive/v3/files';
    let params = {
      'includeItemsFromAllDrives': true,
      'supportsAllDrives': true
    };
    params.q = `'${parent}' in parents and mimeType = 'application/vnd.google-apps.folder' and name = '${name}'  and trashed = false`;
    params.fields = "nextPageToken, files(id, name, mimeType)";
    url += '?' + enQuery(params);
    let requestOption = await this.requestOptions();
    let response;
    for (let i = 0; i < 3; i++) {
      response = await fetch(url, requestOption);
      if (response.ok) {
        break;
      }
      await sleep(800 * (i + 1));
    }
    let obj = await response.json();
    if (obj.files[0] == undefined) {
      return null;
    }
    return obj.files[0].id;
  }
  async fetch200(url, requestOption) {
    let response;
    for (let i = 0; i < 3; i++) {
      response = await fetch(url, requestOption);
      if (response.ok) {
        break;
      }
      await sleep(800 * (i + 1));
    }
    return response;
  }
  async requestOptions(headers = {}, method = 'GET') {
    const Token = await getAccessToken();
    headers['authorization'] = 'Bearer ' + Token;
    return {
      'method': method,
      'headers': headers
    };
  }
}
const drive = new googleDrive(authConfig, 0);
async function download(id, range = '', inline) {
  let url = `https://www.googleapis.com/drive/v3/files/${id}?alt=media`;
  const requestOption = await drive.requestOptions();
  requestOption.headers['Range'] = range;
  let file = await drive.findItemById(id);
  if (!file.name) {
    return new Response(`{"error":"Unable to Find this File, Try Again."}`, {
      status: 500,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "max-age=3600",
      }
    });
  }
  let res;
  for (let i = 0; i < 3; i++) {
    res = await fetch(url, requestOption);
    if (res.ok) {
      break;
    }
    sleep(800 * (i + 1));
    console.log(res);
  }
  if (res.ok) {
    const {
      headers
    } = res = new Response(res.body, res)
    headers.set("Content-Disposition", `attachment; filename="${file.name}"`);
    headers.set("Content-Length", file.size);
    headers.append('Access-Control-Allow-Origin', '*');
    inline === true && headers.set('Content-Disposition', 'inline');
    return res;
  } else if (res.status == 404) {
    return new Response(not_found, {
      status: 404,
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    })
  } else if (res.status == 403) {
    const details = await res.text()
    return new Response(details, {
      status: 403,
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    })
  } else {
    const details = await res.text()
    return new Response(details, {})
  }
}
String.prototype.trim = function (char) {
  if (char) {
    return this.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
  }
  return this.replace(/^\s+|\s+$/g, '');
};
function decodeJwtToken(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request, event).catch(
    (err) => new Response("Report this page when asked at the time of support... ==> " + err.stack, { status: 500 })
  )
  );
});
