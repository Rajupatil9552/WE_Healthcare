import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';

function Test() {
  return React.createElement(
    NavigationMenuPrimitive.Root,
    { defaultValue: 'item1' },
    React.createElement(
      NavigationMenuPrimitive.List,
      null,
      React.createElement(
        NavigationMenuPrimitive.Item,
        { value: 'item1' },
        React.createElement(NavigationMenuPrimitive.Trigger, null, 'Trigger 1'),
        React.createElement(NavigationMenuPrimitive.Content, null, 'Content 1')
      )
    ),
    React.createElement(NavigationMenuPrimitive.Viewport, null)
  );
}

console.log(ReactDOMServer.renderToString(React.createElement(Test)));
