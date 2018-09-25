![hurakken](hurakken.jpg)

Advanced throttling module as a Redux Middleware, by [Victor Buzzegoli](https://twitter.com/victorbuzzegoli)

Lightweight, Powerfull, _MMMM_ compliant (check out : [Modern Modular Middleware Model](https://twitter.com/victorbuzzegoli))

Often used along with [Axiom](https://www.npmjs.com/package/redux-axiom)

## Installation

To install **Hurakken** in your project, navigate to your project folder in your terminal and run :

    npm i --save redux-hurakken

## Setup

To start using **Hurakken**, you will first need to apply the middleware to your store, just like any redux middleware :

    ...
    import hurakken from "redux-hurakken";
    ...
    export default createStore(rootReducer,applyMiddleware([hurakken]));

> Note that `Hurakken` is already included in [Axiom](https://www.npmjs.com/package/redux-axiom).

## Usage

> Using ES6+ syntax

    import * as actions from "../constants/action-types";

    export const clearArray = () => {
        type: actions.CLEAR_ARRAY,
        payload: [],
        hurakken: {
            throttle: 5000
        }
    }

> `throttle` is a value in **milliseconds** for which this action will not be dispatchable again. Note that due to Javascript single threaded environment, this value can be subject to slight variant, and is therefore not precisely defined.

-   _Throttling_ can be espacially useful to prevent from overloading a network by rejecting spam attempts. For that reason, **Hurakken** is included natively into our REST Middleware [Axiom](https://www.npmjs.com/package/redux-axiom).

##### Behaviour

-   Use `onAccepted` and `onRejected` to override the default behaviour

> Note that these functions are called **reactions**, accordingly to the [Modern Modular Middleware Model](https://twitter.com/victorbuzzegoli). Therefore they contain a `next` argument that can be use to release an action to the reducer (or next middleware). They can be used like :

In `/reactions` :

    export const customReaction = (action, next) => {
        console.log("Rejected Action :", action);
        next(action);
    };

In `/actions` :

    import * as actions from "../constants/action-types";
    import { customReaction } from "../reactions/customReaction";

    export const clearArray = () => {
        type: actions.CLEAR_ARRAY,
        payload: [],
        hurakken: {
            throttle: 5000,
            onRejected: customReaction
        }
    }

> If you were to use a non 4M compliant middleware such as _redux-thunk_, which is **deprecated by the [4M documentation](https://twitter.com/victorbuzzegoli)**, please note that, by default, using/dispatching the action returned by `onAccepted` or `onRejected` will not trigger _Hurakken_ again even though the arguments are still contained in the action's parameters. To force triggering _Hurakken_ again, use : `_skip: false` or remove `_skip` in the `hurakken` node.

-   Use `log: true` to print the middleware logs in the console (add `xlog: true` for extended logs)

Here is a overview of every options possible:

    hurakken: {
        throttle: 3000,
        log: true,
        xlog: true,
        onSuccess: (action, next) => {
            //...
        },
        onRejected: (action, next) => {
            //...
        }
    }

## Version

1.2.0

## License

**The MIT License**

Copyright 2018 - Victor Buzzegoli

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contact

[@victorbuzzegoli](https://twitter.com/victorbuzzegoli) on Twitter
