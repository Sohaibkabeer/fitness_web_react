import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Button, TextField } from "@mui/material";
import { options, fetchData} from '../utils/fetchData';
import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchExercises = ({setExercises, bodyPart, setBodyPart}) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', options)
      setBodyParts(['all', ...bodyPartsData]);
    }
    fetchExercisesData();
  }, [])
  

  const handleSearch = async () => {
    if (search) {
      const exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises' , options);
      const searchedExercises = exerciseData.filter(
        (exercise) => exercise.name.toLowerCase().includes(search)  
        || exercise.target.toLowerCase().includes(search)  
        || exercise.equipment.toLowerCase().includes(search) 
        || exercise.bodyPart.toLowerCase().includes(search) 
      );
      setSearch('');
      setExercises(searchedExercises);
    }
  };
  return (
    <>
      <Stack alignItems="center" mt="400px" justifyContent="center" p="20px">
        <Typography
          fontWeight={700}
          sx={{
            fontSize: { lg: "44px", xs: "30px" },
          }}
          mb="50px"
          textAlign="center"
        >
          Awesome Exercises You <br /> Should Know
        </Typography>
        <Box position="relative" mb="72px">
          <TextField
            sx={{
              input: { fontWeight: "700", border: "none", borderRadius: "4px" },
              width: { lg: "1000px", xs: "550px" },
              backgroundColor: "#fff",
              borderRadius: "40px",
            }}
            height="76px"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search Exercises"
            type="text"
          />
          <Button
            className="search-btn"
            sx={{
              bgcolor: "#FF2625",
              color: "#fff",
              textTransform: "none",
              width: { lg: "140px", xs: "80px" },
              height: { lg: "45px", xs: "40px" },
              mt: "5px",
              ml: "5px",
              fontSize: { lg: "20px", xs: "14px" },
              position: "absolute"
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
        <Box sx={{ position: 'relative', width:'100%', p: '20px'}}>
          <HorizontalScrollbar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart}/>
        </Box>
      </Stack>
    </>
  );
};

export default SearchExercises;
