# \<wr-accurate-location-detector\>

Fetch Location Accurate Accuracy

<wr-accurate-location-detector ></wr-accurate-location-detector>

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

Events

```
location-accuracy: Number | null | undefined = false

Set as per required to get accuracy within that range. If not set default accuracy will within range of 2000. 
```


```
in-process: Boolean | null | undefined = false

Sets flag to check initialization of the process and will return as per execution of the functions. Can be used for loading purpose. 
```

Methods

```
on-location-detector-success

Return method Success  <wr-accurate-location-detector on-location-detector-success="Methodname"></wr-accurate-location-detector>
```

```
on-location-detector-error
Return method Error  <wr-accurate-location-detector on-location-detector-error="Methodname"></wr-accurate-location-detector>
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
