import { baseUrl } from '~/plugins/baseUrl';
import { APP_GLOBAL_USE } from '../type';

const catSelectionPayload = (payload: any) => {
    return {
        type: APP_GLOBAL_USE.CAT_LIST_SELECTION,
        payload,
    };
};
interface CatSelectionInterface {
    selections: any;
}
export const _onFetchCatSelectionAction = () => {
    return async (dispatch: Function) => {
        try {
            const response: any = await fetch(`${baseUrl}/v1/breeds`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                let catListSelection = new Object() as CatSelectionInterface;
                const data: any[] = await response.json();
                catListSelection.selections = data;
                dispatch(catSelectionPayload(catListSelection));
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const _onCatSelectionAction = (breedId: string, pageNumber: string) => {
    return async () => {
        return await fetch(
            `${baseUrl}/v1/images/search?page=${pageNumber}&limit=10&breed_id=${breedId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    };
};

export const breedDetailsPayload = (payload: any) => {
    const hasData = { ...payload, typeStatus: 'has-data' } as any;

    return {
        type: APP_GLOBAL_USE.BREED_DETAILS,
        payload: hasData,
    };
};

const _bradDetailsOnRefreshAction = (payload: any) => {
    return {
        type: APP_GLOBAL_USE.BREED_DETAILS,
        payload,
    };
};

export const _onFetchBreedDetailsAction = (breedId: string) => {
    return async (dispatch: Function) => {
        try {
            const reponse = await fetch(`${baseUrl}/v1/images/${breedId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (reponse.status === 200) {
                const data = await reponse.json();
                const hasData = { ...data, typeStatus: 'has-data' } as any;
                dispatch(_bradDetailsOnRefreshAction(hasData));
            } else if (reponse.status === 400) {
                const noData = await reponse.json();
                const regData = { ...noData, typeStatus: 'no-data' } as any;

                dispatch(_bradDetailsOnRefreshAction(regData));
            }
        } catch (error) {
            console.log('data', error);
        }
    };
};
