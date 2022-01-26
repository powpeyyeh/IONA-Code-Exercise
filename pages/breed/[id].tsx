/* eslint-disable @next/next/no-img-element */
// import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { _onFetchBreedDetailsAction } from '~/redux/actions/appGlobal';

interface CatDetailsInterface {
    app: {
        catDetails: any;
    };
}
const BeedCats = () => {
    const { catDetails } = useSelector(
        (state: CatDetailsInterface) => state.app
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(catDetails).length === 0) {
            queryBreedDetails();
        }
    }, [catDetails, dispatch]);

    const queryBreedDetails = async () => {
        const { pathname }: { pathname: string } = new URL(
            window.location.href
        );
        const breedId = pathname.split('/')[2];
        dispatch(_onFetchBreedDetailsAction(breedId));
    };

    return (
        <>
            <div className='container'>
                {Object.keys(catDetails).length > 0 ? (
                    <>
                        {catDetails.typeStatus === 'has-data' ? (
                            <>
                                <div className='card'>
                                    <div className='card-header'>
                                        <Link
                                            href={`/?${catDetails.breeds[0].id}`}
                                        >
                                            <a className='btn btn-primary btn-block'>
                                                Back
                                            </a>
                                        </Link>
                                    </div>
                                    <img
                                        className='card-img-top'
                                        src={catDetails.url}
                                        alt='Card image cap'
                                    />
                                    <div className='card-body'>
                                        <h4 className='card-title'>
                                            {catDetails.breeds[0].name}
                                        </h4>
                                        <h5>
                                            Origin:{' '}
                                            {catDetails.breeds[0].origin}
                                        </h5>
                                        <h6>
                                            {catDetails.breeds[0].temperament}
                                        </h6>
                                        <p className='card-text'>
                                            {catDetails.breeds[0].description}
                                        </p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <h5>No data on your query.</h5>
                            </>
                        )}
                    </>
                ) : (
                    'Loading'
                )}
            </div>
        </>
    );
};
export default BeedCats;
