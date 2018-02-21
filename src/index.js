import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';
import {message} from 'antd';
import { browserHistory } from 'dva/router';

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(e) {
    message.error(e.message, /* duration */3); //全局错误处理
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/recDishes').default);
app.model(require('./models/scanPage').default);
app.model(require('./models/menu').default);
app.model(require('./models/chat').default);
app.model(require('./models/navigation').default);
app.model(require('./models/cart').default);
app.model(require('./models/pcenter').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
