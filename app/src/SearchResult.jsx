import styled from "styled-components";
import { BASE_URL } from "./App";

function SearchResult({ data, loading }) { 
  return (
    <FoodCardContainer>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <FoodCards>
          {data?.map((food) => (
            <div className="food-card" key={food.name}>
              <div className="food_image">
                <img src={BASE_URL + food.image} alt={food.name} />
              </div>
              <div className="food_info">
                <h3>{food.name}</h3>
                <p>{food.text}</p> {/* Display additional text info */}
                <button>${food.price.toFixed(2)}</button> {/* Price button */}
              </div>
            </div>
          ))}
        </FoodCards>
      )}
    </FoodCardContainer>
  );
}

export default SearchResult;

const FoodCardContainer = styled.section`
  height: calc(100vh - 240px);
  background-image: url("/bg.png");
  background-size: cover;
  padding: 20px;
`;

const FoodCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* Adjust to space out the cards */
  gap: 20px;

  .food-card {
  display: flex;
  background-color: rgba(130, 122, 122, 0.5); /* Semi-transparent white */
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 30%; /* Ensure three cards per row */
  max-width: 350px; /* Optional: limit the card width */
  position: relative; /* To position the button correctly */
}


  .food_image img {
    width: 120px; /* Set a fixed width for the image */
    height: auto;
    border-radius: 8px;
    margin-right: 16px; /* Space between image and info */
  }

  .food_info {
    display: flex;

    flex-direction: column;
    justify-content: space-between; /* Space out the info and button */
    flex-grow: 1; /* Allow the info section to take remaining space */
  }

  .food_info h3 {
    margin: 0 0 8px 0;
    font-size: 1.2em;
    color: #333;
  }

  .food_info p {
    margin: 0 0 16px 0;
    font-size: 0.9em;
    color: #200c0c;
  }

  .food_info button {
    align-self: flex-end;
    padding: 8px 16px;
    background-color: #ff6347;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    position: top;
    bottom: 16px;
    right: 16px;
  }

  .food_info button:hover {
    background-color: #e5533d;
  }
`;
