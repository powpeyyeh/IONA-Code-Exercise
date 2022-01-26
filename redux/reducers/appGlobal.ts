import { APP_GLOBAL_USE } from '../type';
interface InitSateInterface {
    catsListSelection: any;
    catDetails: any;
}

interface ActionInterface {
    type: string;
    payload: any;
}

const initState: InitSateInterface = {
    catsListSelection: {},
    catDetails: {},
};

const app = (state = initState, action: ActionInterface) => {
    switch (action.type) {
        case APP_GLOBAL_USE.CAT_LIST_SELECTION:
            return {
                ...state,
                catsListSelection: (state.catsListSelection = action.payload),
            };
        case APP_GLOBAL_USE.BREED_DETAILS:
            return {
                ...state,
                catDetails: (state.catDetails = action.payload),
            };

        default:
            return state;
    }
};
export default app;
