---
layout: post
author: krishnan
title:  "How to deploy Angular 2 application in IIS 8 and above with base URL"
date:   2017-03-20 00:30:00 +0530
categories: deployment iis
---

## Typical IIS Issues

The reasons why an Angular 2 application does not work out of the box on IIS is because:

* You usually want to set up an application or virtual directory in IIS. This involves
playing around with `<base href="">` so that the **bundle.js** files load properly.
* Applications making use of [Angular Router][2] package may not work correctly with IIS.
Accessing an URL like `http://your.domain.com/my-app/home/heros/get/1` directly throws a
**404 not found** error.
* If your app contains [auxiliary routes][3], accessing a URL like
`http://your.domain.com/my-app/home/(popup:edit-screen)`
throws a **Potentially dangerous request** error.

This post explains how to setup an Angular 2 app on Windows IIS 8 and above.
Let us call our app: **my-app**.


## Set Base Href

Open `my-app/index.html` and set `<base href="/my-app">`. It will be helpful for you to
[understand the basics][4] of `<base>` element too before you proceed.

**NOTE:**
* The value `my-app` in `base-href` should preferably be the same as the application or
virtual directory we will be creating in IIS.
* Test your app once after changing `base-href`, that all your routes are working fine. An example
of where this may break your code is if you are doing something custom/funny using `window.location.href`.
* This is not a necessary step, but only for consistency between your dev environment and
your IIS hosted site, I would recommend you set this up.
    * By dev environment, I mean your Angular application running on Node's lite-server when you 
    `ng serve` or `npm start`. Typical URL: `http://localhost:4200/my-app`.
    * By IIS hosted site, I mean the site we will be setting up in this post. Typical URL:
    `http://your.domain.com/my-app`.


## Build Angular App

Compile your app with an added `--base-href /my-app/` flag. Notice the trailing `/`. It is important.

    // dev environment build command
    ng build --base-href /my-app/
    
    // production environment build command
    ng build --prod --base-href /my-app/

After compilation, a `dist` folder should be created in `my-app`'s root folder.


## IIS Setup

1. Copy contents of `dist` folder in to a folder called, say, `my-app-iis`.
1. Open IIS > Right-click your website > Choose **Add Application** from context menu.<br>
![Add Application screenshot]({{ site.baseurl }}/assets/2017-03-19-01-add-application.png)
1. Set **Alias** as `my-app`, **Application pool** whatever you want and
**Physical path** as location of `my-app-iis`.
1. Go to `my-app-iis` and create a `web.config` file inside it.
1. Paste the following configurations in `web.config`.

        <?xml version="1.0" encoding="UTF-8"?>
        <configuration>
            <system.webServer>
                <httpErrors existingResponse="Replace" errorMode="Custom">
                    <remove statusCode="404" subStatusCode="-1" />
                    <error statusCode="404" prefixLanguageFilePath="" path="/my-app/index.html" responseMode="ExecuteURL" />
                </httpErrors>
            </system.webServer>
            <system.web>
                <sessionState mode="Off" />
                <httpRuntime
                    requestValidationMode="2.0"
                    requestPathInvalidCharacters="<,>,%,&amp;,\,?,*" />
                <pages validateRequest="false" />
            </system.web>
        </configuration>

1. The configurations are hopefully self-explanatory, but still:
    1. `httpErrors` section makes sure any first time URL requested is "404" redirected
    to index.html for the app to load, so that you don't face router issues.
    1. `httpRuntime` is required for auxiliary routes in URL that contain `:` symbol
    that is treated as "dangerous" by IIS.
    1. `sessionState` OFF is not a necessary configuration, but helps to have it.

<br>
That's it. Access `http://your.domain.com/my-app/` and your application should run perfectly on IIS now.


[1]: https://github.com/angular/angular-cli
[2]: https://angular.io/docs/ts/latest/guide/router.html
[3]: https://angular.io/docs/ts/latest/guide/router.html#!#named-outlets
[4]: https://www.w3schools.com/tags/tag_base.asp
