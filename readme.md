# Reference Code for Smartling Language Switcher

Reference code for language switcher (top and bottom of page) that can be used to enable user navigation to/from Smartling language subdomains. 

Using this code/design is not required - it is provided as a convenience and/or starting point for a language switcher implementation. Please modify and customize as desired.  

This code is a genericized version of the code that was developed for Drupal websites by the ITS Web Platform (WebNY) Team.  The WebNY team is not available to troubleshoot or customize implementations.

## Usage

Firstly download/clone this repo to verify you have all needed files to work.

For an example to use, look at the **demo.html** file included.

Your HTML file needs a few additional lines in your `<head>` and two additional lines at the bottom of your `<body>`.

Include this in your `<head>`

```
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="/css/language.css" rel="stylesheet" type="text/css"/>
<link href="/fonts/fontawesome/css/all.css" rel="stylesheet" type="text/css"/>
<link href="/fonts/icomoon/style.css" rel="stylesheet" type="text/css"/>
```

Add these two lines to the bottom of your `<body>` just above the `</body>`

```
<script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"></script>
<script src="/js/language.js"></script>
```

