import { Title } from "../cmps/Title";
import reem from '../assets/img/reem.jpeg';
export function About() {
    return (
        <div className="about">
            <Title classNames="title">About</Title>
            <div className="main-content">
                <div className="about-site">
                    <h1 className="about-site-title">So whats this site all about?</h1>
                    <p>
                        I've always had a dream of opening my own toy shop.
                        Unfortunately, I was born in Petah Tikva so Toys are not really... well,
                        popular. Knives are more hyped around here.
            </p>
                </div>
                <div className="about-me">
                    <h1 className="about-me-title">Who Am I?!</h1>
                    <div className="wrapper flex">
                        <div className="image-container">
                            <img className="profile-photo" src={reem} alt="" />
                        </div>
                        <p>My name is Reem Ben-David. 24 Years Old from Petah Tikva. Adore creative thinking and always enjoy a good laugh.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}