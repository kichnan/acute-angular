---
layout: post
author: krishnan
title:  "How to deploy Angular 2 application in IIS 8 and above with base URL"
date:   2017-03-19 19:00:00 +0530
categories: deployment iis
---

Setting up or deploying your Angular 2 application on IIS is fairly simple, but a little
less straightforward. The reason why it does not work out of the box is because:

* You usually want to set up an application or virtual directory in IIS. This involves
playing around with `<base href="">` so that the **bundle.js** files load properly.
* Applications making use of **Angular Router** package may not work correctly with IIS.
* Accessing an URL like `http://localhost/my-app/home/heros/get/1` directly throws a
**404 not found** error.
* If your app contains [auxiliary routes][2], on accessing a URL like `http://localhost/my-app/home/(popup:edit-screen)`
throws a **Potentially dangerous request** error.

This post explains the steps involved to fix the issues mentioned above and setup
an Angular 2 app on Windows IIS 8 and above.

## Build angular app
First, let us compile and build our Angular application. It is typically achieved using
`ng build` command, or one of its many different configurations, like `ng build --prod`,
if you are using [Angular CLI][1]. But, it is fine if you are using any other technique too.

Whatever be the build process, I assume that, at the end of it, a `dist` folder is generated
at application's root folder. With that in hand, let us get your compiled app up and running on IIS.

### Set Base Href
1. Breaking change in code -- app base href="/my-app" (whatever virtual directory)
1. Build command: `npm build --base-href /my-app/`. Notice difference: last `/` character.
1. Verify `index.html`.

## IIS Setup
1. Copy contents of `dist` folder and paste it to whichever folder you want your app to be
hosted in. Let's keep the name of our folder (and angular app) as **my-app**.
1. Open IIS GUI. Right-click the "Website" (usually, "Default Web Site"). Click
**Add Application** from context menu.<br>
![My helpful screenshot]({{ site.baseurl }}/assets/2017-03-19-01-add-application.png)
1. Set whatever **Alias** name and **Application pool** you want there. **Physical path**
should be location of `my-app`.
1. Go to `my-app` folder and Create `web.config` in it.
1. Open `web.config` and add following configurations:
<code><!-- need to find correct syntax for this, or should I create an asset/data for this? -->
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
                requestPathInvalidCharacters="&lt;,&gt;,%,&amp;,\,?,*" />
            <pages validateRequest="false" />
        </system.web>
    </configuration>
</code>
<br>
The configurations added are self-explanatory.
    1. `httpErrors` section makes sure any first time URL requested is "404" redirected
    to index.html for the app to load, so that you don't face router issues.
    1. `httpRuntime` is required for auxiliary routes in URL that contain `:` symbol
    that is treated as "dangerous" by IIS.
    1. `sessionState` OFF is not a necessary configuration, but helps to have it.

<br>
That's it. Access `http://localhost/my-app` and your application should run perfectly fine now.


[1]: https://github.com/angular/angular-cli
[2]: https://angular.io/docs/ts/latest/guide/router.html#!#named-outlets
