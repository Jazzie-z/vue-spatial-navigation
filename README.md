# vue-tv(vue-spatial-navigation)
  Focus library for smart Tv application using Vue js and event-bus

## Demo
Check out the demo here
https://vue-spatial-navigation.herokuapp.com/list

## Screenshots

<div>
  <div>List<div/>
<img src="https://firebasestorage.googleapis.com/v0/b/my-api-project-c329d.appspot.com/o/list.PNG?alt=media&token=9e1221cb-7888-4bba-83b9-d72f06b0bdcd" alt="list" width="800"/>
    <div>Carousel</div>
<img src="https://firebasestorage.googleapis.com/v0/b/my-api-project-c329d.appspot.com/o/carousel.PNG?alt=media&token=baf8b807-1968-4e26-a879-87e823a6fbbf" alt="carousel" width="800"/>
    <img src="https://firebasestorage.googleapis.com/v0/b/my-api-project-c329d.appspot.com/o/grid.PNG?alt=media&token=e2029ac5-1112-4e98-b62f-c652a895890a" alt="grid" width="800"/>
</div>

## Getting Started

```bash
npm install vue-tv
```

```bash
import {FocusableList} from "vue-tv";

<List
    :child="Button" //custom component
    :isFocused="true" //to set focus
    :items="items" //array to loop
    :shouldScroll="shouldScroll" 
    v-on:onFocusChange="onFocusHandler"
  />

```

Readme will be updated soon!

Please check the examples folder for reference for now.
