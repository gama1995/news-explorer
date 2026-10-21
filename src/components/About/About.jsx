import "./About.css";
import authorPhoto from "../../images/author.webp";

function About() {
  return (
    <section className="about" aria-labelledby="about-title">
      <img
        className="about__photo"
        src={authorPhoto}
        alt="Daisy, author of NewsExplorer"
        width="464"
        height="464"
        loading="lazy"
      />

      <div className="about__content">
        <h2 className="about__title" id="about-title">
          About the author
        </h2>
        <p className="about__description">
          Hi, I'm Daisy, a software development student at TripleTen.
          I built NewsExplorer using React to help people discover news
          on topics that interest them.
        </p>
        <p className="about__description">
          Through this project, I'm practicing responsive design,
          reusable components, and working with external APIs.
        </p>
      </div>
    </section>
  );
}

export default About;
