import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  ...((require('E:/admin2.0/src/dva.js').config || (() => ({})))()),
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'global', ...(require('E:/admin2.0/src/models/global.js').default) });
app.model({ namespace: 'logout', ...(require('E:/admin2.0/src/models/logout.js').default) });
app.model({ namespace: 'order_models', ...(require('E:/admin2.0/src/pages/order/models/order_models.js').default) });
