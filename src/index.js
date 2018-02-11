import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/recDishes').default);
app.model(require('./models/scanPage').default);
app.model(require('./models/menu').default);
app.model(require('./models/chat').default);
app.model(require('./models/navigation').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
