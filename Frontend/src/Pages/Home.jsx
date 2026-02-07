import React from 'react'
import { useContext } from 'react'
import { userDataContext } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext);
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const synth = window.speechSynthesis;


  const handleLogout = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  // convert text to speech

  const speak = (text) => {
    const utterence = new SpeechSynthesisUtterance(text);

    isSpeakingRef.current = true;
    utterence.onend = () => {
      isSpeakingRef.current = false;
      recognitionRef.current?.start();
    };
    synth.speak(utterence);
  }





  const handleCommand = async (data) => {
    const { type, userInput, response } = data;
    // GOOGLE SEARCH
    if (type === "google_search") {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }

    // CALCULATOR
    if (type === "calculator_open") {
      window.open("https://www.google.com/search?q=calculator", "_blank");
    }

    // INSTAGRAM
    if (type === "instagram_open") {
      window.open("https://www.instagram.com/", "_blank");
    }

    // FACEBOOK
    if (type === "facebook_open") {
      window.open("https://www.facebook.com/", "_blank");
    }

    // WEATHER
    if (type === "weather_show") {
      window.open("https://www.google.com/search?q=weather", "_blank");
    }

    // YOUTUBE SEARCH / PLAY
    if (type === "youtube_search" || type === "youtube_play") {
      const query = encodeURIComponent(userInput);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
    }


  }





  // setup web speech api to listen to user commands(also convert speech to text) and send them to backend for processing.
  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";


    recognitionRef.current = recognition;
    const isRecognizingRef = { current: false };

    const safeRecognition = () => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        try {
          recognition.start();
          console.log("Recognition requested to start");
        }

        catch (error) {
          if (error.name !== "InvalidStateError") {
            console.log("Start Error :", error);
          }
        }
      }
    }

    recognition.onstart = () => {
      console.log("Recognition started");
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      console.log("Recognition ended");
      isRecognizingRef.current = false;
      setListening(false);

      if (!isSpeakingRef.current) {
        setTimeout(() => {
          safeRecognition();
        }, 1000); // delay avoids rapid loop
      }
    };

    if (!isSpeakingRef.current) {
      setTimeout(() => {
        safeRecognition();
      }, 1000); // delay avoids rapid loop
    }

    recognition.onerror = (event) => {
      console.warn("Recognition error:", event.error);

      isRecognizingRef.current = false;
      setListening(false);

      if (event.error !== "aborted" && !isSpeakingRef.current) {
        setTimeout(() => {
          safeRecognition();
        }, 1000);
      }
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();

      if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {


        recognition.stop();
        isRecognizingRef.current = false;
        setListening(false);
        const data = await getGeminiResponse(transcript);
        console.log(data);
        // speak(data.response); 
        handleCommand(data);
      }
      console.log("heard:", transcript);
    }


    const fallback = setInterval(() => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {

        safeRecognition();
      }
    }, 10000);
    safeRecognition();
    return () => {
      recognition.stop();
      setListening(false);
      isRecognizingRef.current = false;
      clearInterval(fallback);
    }
  }, [])

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#020236] flex justify-center items-center  flex-col p-[20px] gap-[15px]'>

      <button className="min-w-[150px] mt-[25px] h-[50px] text-black font-semibold absolute top-[20px] right-[20px]  bg-white rounded-full text-[17px] cursor-pointer" onClick={handleLogout} >Logout </button>

      <button className="min-w-[150px] mt-[25px] h-[50px] text-black font-semibold absolute top-[100px] right-[20px] bg-white rounded-full text-[17px] cursor-pointer px-[20px] py-[10px]" onClick={() => navigate("/customize")}>Customize Your Assistant</button>

      <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>

        <img src={userData?.assistantImage} alt="" className='h-full object-cover' />
      </div>
      <h1 className='text-white text-[30px] font-semibold'>{userData?.assistantName}</h1>
    </div>
  )
}
