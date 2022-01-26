/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    _onFetchCatSelectionAction,
    _onCatSelectionAction,
    breedDetailsPayload,
} from '~/redux/actions/appGlobal';
import { useRouter } from 'next/router';
interface CatListInterface {
    app: {
        catsListSelection: any;
    };
}
type CatSelectted = Array<any>;

interface UrlInterface {
    hash: string;
    host: string;
    hostname: string;
    href: string;
    readonly origin: string;
    password: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
    username: string;
    toString(): string;
}
const Home: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { catsListSelection } = useSelector(
        (state: CatListInterface) => state.app
    );

    const [catsSelected, setCatSelected] = useState<CatSelectted>([]);
    const [catSelectId, setCatSelectId] = useState('');
    const [catOption, setCatOption] = useState('');

    const loadMoreButton = useRef(null),
        loadDataText = useRef(null);

    useEffect(() => {
        dispatch(_onFetchCatSelectionAction());
        const { search } = new URL(window.location.href) as UrlInterface;

        if (search !== '') {
            renderCats(search);
        }
    }, [dispatch]);

    const onSelectCat = async (catBreedId: string) => {
        const loadText = loadDataText.current! as HTMLDivElement;
        const loadMoreButtonRef = loadMoreButton.current! as HTMLButtonElement;
        const { search } = new URL(window.location.href) as UrlInterface;

        /**if has query params in the url  */
        if (search !== '') {
            router.push({
                pathname: '/',
            });
        }

        if (loadText) {
            loadText.textContent = 'Loading...';
        }
        if (loadMoreButtonRef !== null) {
            if (loadMoreButtonRef.classList.contains('d-none')) {
                loadMoreButtonRef.style.cssText = 'visibility: visible;';
                loadMoreButtonRef.classList.remove('d-none');
            }
        }

        try {
            const response: any = await dispatch(
                _onCatSelectionAction(catBreedId, '1')
            );
            if (response.status === 200) {
                const data: any[] = await response.json();
                setCatSelected(data);
                setCatSelectId(catBreedId);
                setCatOption(catBreedId);
                imageInterSectionObersever(); //imageInterSectionObersever;
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const loadMoreCats = async () => {
        const loadMoreButtonRef = loadMoreButton.current! as HTMLButtonElement;

        loadMoreButtonRef.textContent = 'Loading more...';
        loadMoreButtonRef.setAttribute('disabled', 'disabled');
        loadMoreButtonRef.style.cursor = 'not-allowed';

        try {
            const response: any = await dispatch(
                _onCatSelectionAction(catSelectId, '2')
            );

            if (response.status === 200) {
                const data: any[] = await response.json();
                /**Note: There's no pagination associated to the end poit still i've got the same query even if the page number is change */
                if (data.length > 0) {
                    /**More more into array  */
                } else {
                    /**No more data, */
                }

                loadMoreButtonRef.textContent = 'Load more';
                loadMoreButtonRef.removeAttribute('disabled');
                loadMoreButtonRef.style.cssText =
                    'cursor: pointer; visibility: hidden;';
                loadMoreButtonRef.classList.add('d-none');
            }
        } catch (error) {
            console.log('error', error);
        }
    };
    const detailsProduct = (details: any) => {
        dispatch(breedDetailsPayload(details));
    };

    const renderCats = async (search: string) => {
        const loadText = loadDataText.current! as HTMLDivElement;

        const searchId = search.replace(/[?]/g, '');
        if (loadText) {
            loadText.textContent = 'Loading...';
        }

        try {
            const response: any = await dispatch(
                _onCatSelectionAction(searchId, '1')
            );
            if (response.status === 200) {
                const data: any[] = await response.json();
                setCatSelected(data);
                setCatOption(searchId);
                imageInterSectionObersever(); //imageInterSectionObersever;
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const imageInterSectionObersever = () => {
        const imageRef = document.getElementsByTagName('img')! as
            | HTMLImageElement
            | any;

        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const image: any = entry.target;
                    const newUrl = image.getAttribute('data-src');
                    image.src = newUrl;
                    observer.unobserve(image);
                }
            });
        }, {});

        [...imageRef].forEach((image) => {
            observer.observe(image);
        });
    };

    return (
        <div className='container'>
            <Head>
                <title>Cat browser</title>
                <meta
                    name='description'
                    content='Generated by create next app'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            {Object.keys(catsListSelection).length > 0 ? (
                <>
                    <h1>Cat browse</h1>
                    <p>Breed</p>
                    <select
                        className='form-select'
                        aria-label='Default select example'
                        onChange={(e) => onSelectCat(e.target.value)}
                        value={catOption}
                    >
                        <option value='default'>Select Breed</option>
                        {catsListSelection.selections.map((cat: any) => {
                            return (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            );
                        })}
                    </select>
                    {catsSelected.length > 0 ? (
                        <>
                            <div className='row m-10'>
                                {catsSelected.map((breed: any) => {
                                    return (
                                        <div
                                            className='col-md-3 col-sm-6 col-12'
                                            key={breed.id}
                                        >
                                            <div className='card'>
                                                <img
                                                    className='card-img-top'
                                                    src={breed.url}
                                                    alt={breed.id}
                                                    height={250}
                                                    data-src={breed.url}
                                                />
                                                <div className='card-body'>
                                                    <Link
                                                        href={`/breed/${breed.id}`}
                                                    >
                                                        <a
                                                            onClick={() =>
                                                                detailsProduct(
                                                                    breed
                                                                )
                                                            }
                                                            className='btn btn-primary btn-block'
                                                        >
                                                            View Details
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className='loadMoreButton'>
                                <button
                                    type='button'
                                    className='btn btn-success'
                                    ref={loadMoreButton}
                                    onClick={loadMoreCats}
                                >
                                    Load more
                                </button>
                            </div>
                        </>
                    ) : (
                        <div ref={loadDataText} className='t-10'>
                            No cats are available
                        </div>
                    )}
                </>
            ) : (
                <div className='loading'>Loading...</div>
            )}
        </div>
    );
};

export default Home;
