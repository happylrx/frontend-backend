import React from "react";
import ReactDOM from "react-dom";
import Routers from './component/Routers';
import "./style/main.css";

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
  <Routers />,document.getElementById('app')
)
