import "./App.css";
import { addEffect } from "@react-three/fiber";
import Lenis from "@studio-freight/lenis";
import EmergingImage from "./components/EmergingImage";
import Scene from "./Scene";
import { useState, useEffect } from "react";

const lenis = new Lenis();
addEffect((t) => lenis.raf(t));

function App() {
  const [type, setType] = useState(0);

  return (
    <>
      <Scene />
      <main>
        <div className="frame">
          <h1 className="frame__title">
            Revealing <br />
            WebGL Images
          </h1>
        </div>
        <div className="grid">
          {[
            {
              title: "Embrace of Heat",
              year: "2023",
              img: "./img/1.jpg",
              style: { "--r": 1, "--c": 1, "--s": 4 },
            },
            {
              title: "Silence in Sand",
              year: "2022",
              img: "./img/2.jpg",
              style: { "--r": 2, "--c": 5, "--s": 3 },
            },
            {
              title: "Whispers of Earth",
              year: "2024",
              img: "./img/3.jpg",
              style: { "--r": 3, "--c": 3, "--s": 2 },
            },
            {
              title: "Mirage in Time",
              year: "2021",
              img: "./img/4.jpg",
              style: { "--r": 4, "--c": 1, "--s": 2 },
            },
            {
              title: "Veiled in Gold",
              year: "2023",
              img: "./img/5.jpg",
              style: { "--r": 5, "--c": 3, "--s": 5 },
            },
            {
              title: "Ancient Sands Speak",
              year: "2022",
              img: "./img/6.jpg",
              style: { "--r": 6, "--c": 2 },
            },
            {
              title: "Dreams of Dust",
              year: "2024",
              img: "./img/7.jpg",
              style: { "--r": 7, "--c": 3, "--s": 3 },
            },
            {
              title: "Gilded Sands Sing",
              year: "2021",
              img: "./img/8.jpg",
              style: { "--r": 8, "--c": 6, "--s": 2 },
            },
            {
              title: "Mirrored Illusions Fade",
              year: "2023",
              img: "./img/9.jpg",
              style: { "--r": 9, "--c": 1, "--s": 5 },
            },
            {
              title: "Ripples in Time",
              year: "2022",
              img: "./img/10.jpg",
              style: { "--r": 10, "--c": 6, "--s": 3 },
            },
            {
              title: "Essence of Silence",
              year: "2024",
              img: "./img/11.jpg",
              style: { "--r": 11, "--c": 4, "--s": 2 },
            },
            {
              title: "Luxury in Lines",
              year: "2021",
              img: "./img/12.jpg",
              style: { "--r": 12, "--c": 1, "--s": 3 },
            },
            {
              title: "Escape in Shadows",
              year: "2023",
              img: "./img/13.jpg",
              style: { "--r": 13, "--c": 4, "--s": 5 },
            },
          ].map((item, index) => (
            <figure key={index} className="grid__item" style={item.style}>
              <div className="grid__item-img">
                <EmergingImage
                  type={type}
                  url={item.img}
                  className="grid__item-img-inner"
                />
              </div>
              <figcaption className="grid__item-caption">
                <h3>{item.title}</h3> <span>{item.year}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <section className="outro">
          <h2 className="outro__title">More you might like</h2>
          <div className="card-wrap">
            <div className="card">
              <a
                href="http://tympanus.net/Development/GridToSlider/"
                className="card__image"
                style={{
                  backgroundImage:
                    "url(https://tympanus.net/codrops/wp-content/uploads/2023/05/gridtoslider_feat.jpg",
                }}
              ></a>
              <h3 className="card__title">
                <a href="http://tympanus.net/Development/GridToSlider/">
                  Grid to Slideshow Switch Animations
                </a>
              </h3>
            </div>
            <div className="card">
              <a
                href="https://tympanus.net/Development/GridFlowEffect/"
                className="card__image"
                style={{
                  backgroundImage:
                    "url(https://tympanus.net/codrops/wp-content/uploads/2023/07/gridflow_featured-1.jpg",
                }}
              ></a>
              <h3 className="card__title">
                <a href="http://tympanus.net/Development/GridFlowEffect/">
                  Grid Flow Animation
                </a>
              </h3>
            </div>
          </div>
        </section>
        <p className="credits">
          Made by <a href="https://twitter.com/akella">@akella</a> for{" "}
          <a href="https://twitter.com/codrops">@codrops</a>
        </p>
      </main>
    </>
  );
}

export default App;
