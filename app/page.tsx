"use client";
import React, { useState } from "react";
import Current from "./components/Current";
import Input from "./components/Input";
import WeekForecast from "./components/WeekForecast";
import WeatherDetails from "./components/WeatherDetails";

export default function Home() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const url = `https://api.weatherapi.com/v1/forecast.json?key=8364cbd722e8446380b33914230208&q=${location}&days=7&aqi=yes&alerts=yes`;

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setData(data);
        setLocation("");
        setError("");
      } catch (error) {
        setError("Ciudad no encontrada");
        setData({});
      }
    }
  };

  let content;
  if (Object.keys(data).length === 0 && error === "") {
    content = (
      <div className="text-white text-center h-screen mt-[5rem]">
        <h2 className="text-3xl font-semibold mb-4">Bienvenido a 630 Weather APP</h2>
        <p className="text-xl">Ingresa una ciudad para conocer su pronostico climatico</p>
      </div>
    );
  } else if (error !== "") {
    content = (
      <div className="text-white text-center h-screen mt-[5rem]">
        <h2 className="text-3xl font-semibold mb-4">Ciudad no encontrada!</h2>
        <p className="text-xl">Por favor, ingrese una ciudad valida</p>
      </div>
    );
  } else {
    content = (
      <>
        <div className="flex md:flex-row flex-col p-12 items-center justify-between mt-[-4rem] gap-10">
          <Current data={data} />
          <WeekForecast data={data} />
        </div>
        <div>
          <WeatherDetails data={data} />
        </div>
      </>
    );
  }

  return (
    <div className="bg-cover bg-gradient-to-r from-slate-400 to-slate-500 h-fit">
      <div className="bg-white/25 w-full rounded-lg flex flex-col h-fit">
        <div className="flex flex-col md:flex-row justify-between items-center p-12">
          <Input handleSearch={handleSearch} setLocation={setLocation} />
          <h1 className="mb-8 md:mb-0 order-1 text-white text-2xl py-2 px-4 rounded-xl">
            630 Weather APP
          </h1>
        </div>
        {content}
      </div>
    </div>
  );
}
