import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default,
        "_title": "umi",
        "_title_default": "umi"
      },
      {
        "path": "/order/models/order_models",
        "exact": true,
        "component": require('../order/models/order_models.js').default,
        "_title": "umi",
        "_title_default": "umi"
      },
      {
        "path": "/order/order",
        "exact": true,
        "component": require('../order/order.js').default,
        "_title": "umi",
        "_title_default": "umi"
      },
      {
        "path": "/order/services/oder.service",
        "exact": true,
        "component": require('../order/services/oder.service.js').default,
        "_title": "umi",
        "_title_default": "umi"
      },
      {
        "component": () => React.createElement(require('E:/admin2.0/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
        "_title": "umi",
        "_title_default": "umi"
      }
    ],
    "_title": "umi",
    "_title_default": "umi"
  },
  {
    "component": () => React.createElement(require('E:/admin2.0/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
    "_title": "umi",
    "_title_default": "umi"
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
