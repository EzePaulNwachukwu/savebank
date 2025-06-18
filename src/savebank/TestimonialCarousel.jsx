import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function TestimonialCarousel() {
    const testimonials = [
        { name: "John smith", quote: "With SpendXP, I finally have control over my expenses. The insights are invaluable!", rank: "★★★★★", image: "https://spendxp.netlify.app/assets/testimonial4-Cwbu355t.jpg" },
        { name: "Emmy Williams", quote: "SpendXP has completely changed how I handle my budget. It’s intuitive and empowering.", image: "https://spendxp.netlify.app/assets/testimonial3-Dr_B-V0s.jpg", rank: "★★★★★" },
        { name: "Charlie", quote: "Tracking expenses is a breeze with SpendXP. Budgeting feels effortless, and I’m saving more!", image: "https://spendxp.netlify.app/assets/testimonial2-BsTiqfBQ.jpg", rank: "★★★★★" },
        { name: "Diana", quote: "SpendXP has revolutionized how I manage my finances. It's simple, efficient, and effective.", rank: "★★★★★", image: "https://spendxp.netlify.app/assets/testimonial1-3gnRBd3T.jpg" },
        { name: "John smith", quote: "With SpendXP, I finally have control over my expenses. The insights are invaluable!", rank: "★★★★★", image: "https://spendxp.netlify.app/assets/testimonial4-Cwbu355t.jpg" },
        { name: "Emmy Williams", quote: "SpendXP has completely changed how I handle my budget. It’s intuitive and empowering.", image: "https://spendxp.netlify.app/assets/testimonial3-Dr_B-V0s.jpg", rank: "★★★★★" },
        { name: "Charlie", quote: "Tracking expenses is a breeze with SpendXP. Budgeting feels effortless, and I’m saving more!", image: "https://spendxp.netlify.app/assets/testimonial2-BsTiqfBQ.jpg", rank: "★★★★★" },
        { name: "Diana", quote: "SpendXP has revolutionized how I manage my finances. It's simple, efficient, and effective.", rank: "★★★★★", image: "https://spendxp.netlify.app/assets/testimonial1-3gnRBd3T.jpg" },

    ];
    const [index, setIndex] = useState(0);
    const imagesPerSlide = 4

    useEffect(() => {


        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 3000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [testimonials.length]);

    return (


        <div className="container mt-4 text-center citycarosel">

            <div style={{ paddingTop: "50px" }}>
                <div className=" row ">
                    {Array.from({ length: imagesPerSlide }).map((_, i) => {
                        // Ensure seamless looping by wrapping around
                        const imgIndex = (index + i) % testimonials.length;
                        return (
                            <div key={imgIndex} className="col-lg-3 col-md-3 col-sm-3 m-auto h-sm-50">
                                <div className="discovercard" >

                                    <div className="" style={{ width: "18rem" }}>
                                        <div style={{ color: "#FFE379", textAlign: "left" }} className="card-header ">{testimonials[imgIndex].rank}</div>
                                    </div>
                                    <p style={{ textAlign: "left" }}> {testimonials[imgIndex].quote} </p>

                                    <div className="d-flex gap-2 align-items-center">
                                        <div style={{ width: "30%" }}>
                                            <img style={{ width: "100%" }} src={testimonials[imgIndex].image} alt="" />
                                        </div>
                                        <b>{testimonials[imgIndex].name}</b>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>


    );
}


export default TestimonialCarousel;



