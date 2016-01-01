import React      from 'react';
import { render } from 'react-dom';
import DevTools   from '../containers/DevTools';

export default function showDevTools(store) {
  const popup = window.open(null, 'DevToolsWindow', 'menubar=no,location=no,resizable=yes,scrollbars=no,status=no');
  popup.location.reload();

  setTimeout(() => {
    popup.document.write('<div id="react-devtools"></div>');
    render(
      <DevTools store={store} />,
      popup.document.getElementById('react-devtools')
    );
  }, 10);
}

