# Google Drive Index

A modern web application that allows you to browse and share your Google Drive files through a clean, responsive web interface. This project creates a public index of your Google Drive folders that can be deployed on Cloudflare Workers.

## Features

- **Multiple Drive Support**: Index multiple Google Drive accounts
- **Modern UI**: Clean, responsive design with Bootstrap 5
- **Search Functionality**: Search through your indexed files
- **Mobile Friendly**: Responsive design that works on all devices
- **Authentication**: Password protection for accessing the index
- **File Preview**: Support for various file types including:
  - Documents (PDF, DOC, TXT)
  - Images (JPG, PNG, GIF, etc.)
  - Videos (MP4, AVI, etc.)
  - Audio files
  - Code files
  - Archives (ZIP, RAR, etc.)
- **Fast Loading**: Optimized for speed with pagination
- **CDN Ready**: Designed to work with Cloudflare Workers

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Bootstrap 5
- **Backend**: Cloudflare Workers
- **API**: Google Drive API v3
- **Authentication**: Google Service Accounts

## Project Structure

```
google-drive-index/
├── app.js              # Main frontend application logic
├── worker.js           # Cloudflare Worker backend code
├── assets/
│   └── homepage.js     # Homepage rendering logic
├── images/
│   ├── Google Logo 1x 150x54dp.png
│   ├── Google Logo 2x 150x54dp.png
│   └── robot.png
└── README.md
```

## Drive ID Types

* My Drive is `root`, eg. Drive of Simple Gmail Account.
* Shared Drive ID is Team/Shared Drive IDs Root.

## Basic Config

````
    "roots":[
      {
          "id": "root",
          "name": "Drive One",
          "protect_file_link": false,
      },
    ]};
````

## Multiple ID Config

* Add this code for each drive. see cloud flare workers code for more info. (requires common sense)

````
    "roots":[
      {
          "id": "root",
          "name": "Drive One",
          "protect_file_link": false,
      },
      {
          "id": "root",
          "name": "Drive Two",
          "protect_file_link": false,
      },
    ]};
````

## Service Account

* Multiple Service Accounts are supported.
* set `"service_account": false` to `"service_account": true`
* Replace {} with data from service account `file.json`

## Security Features

- Password protection for the entire index
- Session-based authentication
- Encrypted tokens for secure access
- Service account isolation
- No direct file access without authentication

## Credits

* Base Source:
  - [maple3142](https://github.com/maple3142/GDIndex)
  - [yanzai](https://github.com/yanzai/goindex)
  - [Bhadoo](https://gitlab.com/GoogleDriveIndex/Google-Drive-Index)
* CSS: [Bootstrap](https://getbootstrap.com) and [Bootswatch](https://bootswatch.com)
* API: [Google Drive API](https://developers.google.com/drive/api)
* [jQuery](https://jquery.com)
* PDF Viewer: [pdf.js](https://github.com/mozilla/pdf.js)
* CDN: [jsDelivr](https://www.jsdelivr.com)
* Obfuscator: [JavaScript Obfuscator Tool](https://obfuscator.io)
* Made for: [Cloudflare Workers](https://workers.cloudflare.com)
* Several Different Fixes by
  - [SpEcHiDe](https://github.com/SpEcHiDe)
  - [Adnan Ahmad](https://gitlab.com/viperadnan)
  - [Prashanth C A](https://github.com/Achrou/goindex-theme-acrou/pull/176)
  - [cheems](https://github.com/cheems/goindex-extended/blob/master/index.js#L553)
  - [iSumitBot](https://t.me/isumitbot)

## Disclaimer

* This project is not associated with Google, this project uses Google Drive API to Index Files and Folders.
* This Repo was imported from [Bhadoo](https://gitlab.com/GoogleDriveIndex/Google-Drive-Index) and then modified for personal use.

## License

* [MIT License](https://github.com/kvnprdtyaa/google-drive-index/blob/main/LICENSE)

### Donate by Crypto Currency

* BTC `1KzTb2FSX98ykNXpSjtUzTY4g5AGDKqzMe`
* USDT/(TRC20) `TYMSgzFNpxZEjR3FLSjDHPW6ugTfm2y1HT`
