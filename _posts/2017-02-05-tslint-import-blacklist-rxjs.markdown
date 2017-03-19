---
layout: post
author: krishnan
title:  "How to fix TSLint rule import-blacklist error for RxJS imports"
date:   2017-02-05 22:36:40 +0530
categories: tslint rxjs
---

In your Angular 2 application, after upgrading your TSLint package manually, or upgrading your application
to [angular-cli][1] `1.0.0-beta.26` or above, TSLint may have started throwing new errors.

For import statements like the following in, say, your.component.ts:

    import { Observable } from 'rxjs';
    import { Observable, BehaviorSubject } from 'rxjs';
    import { Subject } from 'rxjs';
    import { Subscription } from 'rxjs';

You may get an error like below when you run `ng lint`, or if you are using TSLint extensions
in your code editor/IDE, like [TSLint for VS Code][2], then a light-bulb notification:

    src/app/your.component.ts[6, 29]: This import is blacklisted, import a submodule instead
    src/app/your.component.ts[7, 34]: This import is blacklisted, import a submodule instead
    src/app/your.component.ts[8, 26]: This import is blacklisted, import a submodule instead
    src/app/your.component.ts[9, 31]: This import is blacklisted, import a submodule instead

To fix this error, you simply need to import the correct submodule. Following are fixes
to the aforementioned examples:

    import { Observable } from 'rxjs/Observable';
    import { BehaviorSubject } from 'rxjs/BehaviorSubject';
    import { Subject } from 'rxjs/Subject';
    import { Subscription } from 'rxjs/Subscription';

<br>
**NOTE:**

1. The submodule name starts with an upper-case. If you don't do that, your import may not work as expected.
1. You may need to break your "multiple items in a single line" import statement into multiple import statements.


[1]: https://github.com/angular/angular-cli
[2]: https://marketplace.visualstudio.com/items?itemName=eg2.tslint
