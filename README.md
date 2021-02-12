# react-timeline-bar

> timeline control to use for videos

[![NPM](https://img.shields.io/npm/v/react-timeline-bar.svg)](https://www.npmjs.com/package/react-timeline-bar) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-timeline-bar
```

## Usage

```jsx
import React from 'react'

import Timeline from 'react-timeline-bar'
import 'react-timeline-bar/dist/index.css'

const Example = () => {
  render() {
    return <Timeline onSetNewTime={seconds => console.log(seconds)} />
  }
}
```

## Props

* totalDuration total length of e.g. a video, in seconds
* currentTime seconds where the video's play time would currently be
* onSetNewTime callback returning the seconds value in the totalDuration space that a user clicked
* height div height of component, default 50px
* width div width of component, default 300px
* padding left/right padding, default 10px
* color default black
* text optional text to be displayed after total duration

## Behaviour
* the display is similar to the timeline in HTML5 <video> controls
* mouse movement is translated into time value within the totalDuration time space
* clicking will return the time value where the mouse is back to the parent component through the onSetNewTime callback
* when using 'width="100%"', set "padding={0}" to avoid miscalculations of mouse position clicks

## Others
* bootstrapped with [create-react-library](https://github.com/transitive-bullshit/create-react-library)

## License

MIT © [npm okl](https://github.com/okloecker)
