import React,  { useEffect, useMemo, useContext } from 'react';

import { Box, styled } from '@mui/material';

import NavBar from './Home/NarBar';
import Banner from './Home/Banner';
import MidSlide from './Home/MidSlide';
import MidSection from './Home/MidSection';
import Slide from './Home/Slide';

import { useSelector, useDispatch } from 'react-redux'; // hooks
import { getProducts as listProducts } from '../redux/actions/productActions';
import { AppContext } from '../context/ContextProvider';

const Component = styled(Box)`
    padding: 20px 10px;
    background: #F8F3E1;
`;

const CATEGORY_KEYWORDS = {
    Grocery: ['coffee', 'chips', 'soda', 'oatmeal', 'candy', 'corn', 'pasta', 'sauce', 'water', 'nuts'],
    Mobile: ['iphone', 'samsung', 'pixel', 'oneplus', 'motorola', 'nokia', 'phone', 'galaxy'],
    Fashion: ['jean', 't-shirt', 'sneaker', 'shoe', 'hoodie', 'watch', 'jacket', 'beanie'],
    Electronics: ['headphone', 'mouse', 'laptop', 'tv', 'speaker', 'ssd', 'earbud', 'charger', 'camera', 'monitor'],
    Home: ['chair', 'table', 'lamp', 'furniture', 'mattress', 'sofa'],
};

const normalize = (value = '') => (value || '').toString().toLowerCase();

const matchesKeywords = (text = '', keywords = []) => {
    const lower = normalize(text);
    return keywords.some(keyword => lower.includes(keyword));
};

const Home = () => {
    const { searchText, selectedCategory, setSelectedCategory } = useContext(AppContext);

    const getProducts = useSelector(state => state.getProducts);
    const { products = [] } = getProducts;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    const filteredProducts = useMemo(() => {
        let list = products || [];

        if (selectedCategory && selectedCategory !== 'Top Offers') {
            const keywords = CATEGORY_KEYWORDS[selectedCategory] || [];
            list = list.filter(product => {
                const title = normalize(product?.title?.longTitle || product?.title?.shortTitle);
                const tagline = normalize(product?.tagline);
                const categoryMatch = matchesKeywords(title, keywords) || matchesKeywords(tagline, keywords);
                return categoryMatch;
            });
        }

        if (searchText) {
            const search = normalize(searchText);
            list = list.filter(product => {
                const title = normalize(product?.title?.longTitle || product?.title?.shortTitle);
                const asin = normalize(product?.asin);
                const desc = normalize(product?.description);
                return title.includes(search) || asin.includes(search) || desc.includes(search);
            });
        }

        return list;
    }, [products, selectedCategory, searchText]);

    return (
        <>
            <NavBar
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
            />
            <Component>
                <Banner />
                <MidSlide products={filteredProducts} />
                <MidSection />
                <Slide
                    data={filteredProducts}
                    title='Discounts for You'
                    timer={false}
                    multi={true}
                />
                <Slide
                    data={filteredProducts}
                    title='Suggested Items'
                    timer={false}
                    multi={true}
                />
                <Slide
                    data={filteredProducts}
                    title='Top Selection'
                    timer={false}
                    multi={true}
                />
                <Slide
                    data={filteredProducts}
                    title='Recommended Items'
                    timer={false}
                    multi={true}
                />
            </Component>
        </>
    )
}

export default Home;