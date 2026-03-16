import { useState, useEffect, useContext } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { InputBase, List, ListItem, Box, styled } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'; // hooks
import { getProducts as listProducts } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/ContextProvider';

const SearchContainer = styled(Box)`
  border-radius: 2px;
  margin-left: 10px;
  width: 38%;
  background-color: #F8F3E1;
  display: flex;
`;

const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  display: flex;
  color: #41431B;
`;

const ListWrapper = styled(List)`
  position: absolute;
  color: #41431B;
  background: #F8F3E1;
  margin-top: 36px;
`;

const InputSearchBase = styled(InputBase)`
  font-size: unset;
  width: 100%;
  padding-left: 20px;
`;

const Search = () => {
    const [ open, setOpen ] = useState(true);

    const { searchText, setSearchText } = useContext(AppContext);

    const getProducts = useSelector(state => state.getProducts);
    const { products } = getProducts;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    const handleInput = (value) => {
        setSearchText(value);
        setOpen(false);
    };

    return (
        <SearchContainer>
            <InputSearchBase
              placeholder="Search for products, brands and more"
              inputProps={{ 'aria-label': 'search' }}
              value={searchText}
              onChange={(e) => handleInput(e.target.value)}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            {
              searchText && 
              <ListWrapper hidden={open}>
                {
                  (products || [])
                    .filter(product => {
                      const title = (product?.title?.longTitle || product?.title?.shortTitle || '').toLowerCase();
                      const asin = (product?.asin || '').toLowerCase();
                      const query = searchText.toLowerCase();
                      return title.includes(query) || asin.includes(query);
                    })
                    .map(product => (
                      <ListItem key={product?.id || Math.random()}>
                        <Link 
                          to={`/product/${product.id}`} 
                          style={{ textDecoration:'none', color:'inherit'}}
                          onClick={() => setOpen(true)}  
                        >
                          {product?.title?.longTitle || product?.title?.shortTitle}
                        </Link>
                      </ListItem>
                    ))
                }  
              </ListWrapper>
            }
        </SearchContainer>
    )
}

export default Search;