import { gql, useMutation} from "@apollo/client";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import { CategoryContainer, Title } from "./category.styles";


const GET_COLLECTION_BY_TITLE = gql`
  query ($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const SET_CATEGORY = gql`
  mutation ($category: Category!) {
    setNewCategory(category: $category) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const Category = () => {
  const { category } = useParams();
  // const { loading, error, data } = useQuery(GET_COLLECTION_BY_TITLE, {
  //   variables: {
  //     title: category,
  //   },
  // });

  const [setNewCategory, { loading, error, data }] = useMutation(SET_CATEGORY);
  setNewCategory({
    variables: {
      category: categoryObject,
    },
  });

  console.log("data from category", data);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data) {
      const {
        getCollectionsByTitle: { items },
      } = data;
      setProducts(items);
    }
  }, [data]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Title>{category.toUpperCase()}</Title>
          <CategoryContainer>
            {products &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </CategoryContainer>
        </>
      )}
    </Fragment>
  );
};

export default Category;
