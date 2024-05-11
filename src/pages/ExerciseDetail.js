import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { options, youtubeOptions, fetchData } from "../utils/fetchData";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideo, setExerciseVideo] = useState([]);
  const { id } = useParams(); // to get the id from the url
  useEffect(() => {
    const fetchExerciseData = async () => {
      const exerciseDBUrl = "https://exercisedb.p.rapidapi.com";
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com";

      const exerciseDetailData = await fetchData(`${exerciseDBUrl}/exercises/exercise/${id}`, options);
      setExerciseDetail(exerciseDetailData);

      const exerciseVideoData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetail.name}`, youtubeOptions);
      setExerciseVideo(exerciseVideoData.contents);
    };
    fetchExerciseData();
  }, [id]);

  return (
    <>
      <Box>
        <Detail exerciseDetail={exerciseDetail} />
        <ExerciseVideos exerciseVideo={exerciseVideo} name={exerciseDetail.name}/>
        <SimilarExercises />
      </Box>
    </>
  );
};

export default ExerciseDetail;
