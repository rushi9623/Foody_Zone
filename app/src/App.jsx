import { useState, useEffect } from "react";
import styled from "styled-components";
import SearchResult from "./SearchResult"; // Import the SearchResult component

export const BASE_URL = "http://localhost:9000";

function App() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState("all");

  const fetchFoodData = async () => {
    setLoading(true);
    try {
      const response = await fetch(BASE_URL);
      const json = await response.json();
      setData(json);
      setFilteredData(json); // Initially show all data
    } catch (error) {
      console.error("Failed to fetch food data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }
    const filtered = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filtered);
    setSelectedBtn(type);
  };

  const searchFood = (e) => {
    const searchValue = e.target.value.toLowerCase();

    if (searchValue === "") {
      filterFood(selectedBtn); // Apply current filter when search is empty
      return;
    }

    const filtered = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  return (
    <MainContainer>
      <Container>
        <div className="logo">
          {/* Reference the SVG file directly from the public folder */}
          <img src="/Foody_Zone.svg" alt="Logo" />
        </div>
        <div className="search">
          <input onChange={searchFood} placeholder="Search Food" />
        </div>
      </Container>
      <FilterContainer>
        <StyledButton onClick={() => filterFood("all")}>All</StyledButton>
        <StyledButton onClick={() => filterFood("breakfast")}>
          Breakfast
        </StyledButton>
        <StyledButton onClick={() => filterFood("lunch")}>Lunch</StyledButton>
        <StyledButton onClick={() => filterFood("dinner")}>Dinner</StyledButton>
      </FilterContainer>
      {/* Pass the filteredData and loading state to the SearchResult component */}
      <SearchResult data={filteredData} loading={loading} />
    </MainContainer>
  );
}

export default App;

const MainContainer = styled.div`
  background-color: #1e1e1e; /* Slightly lighter dark background */
`;

const Container = styled.section`
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 40px;
`;

export const StyledButton = styled.button`
  background-color: ${(props) =>
    props.selected ? "darkred" : "red"}; /* Change color if selected */
  border-radius: 5px;
  padding: 6px 12px;
  color: wheat;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;
