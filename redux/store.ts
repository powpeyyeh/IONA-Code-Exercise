import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import app from '@/redux/reducers/appGlobal';

const middleware = compose(
    process.env.NODE_ENV === 'development'
        ? applyMiddleware(thunk, logger)
        : applyMiddleware(thunk)
);

const reducers = combineReducers({
    app,
});
export default createStore(
    reducers,
    process.env.NODE_ENV === 'development'
        ? composeWithDevTools(middleware)
        : middleware
);
