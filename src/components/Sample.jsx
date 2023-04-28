import React, { useState } from 'react';
import Carousel from '../img/carousel-1.jpg'

const Sample = () =>{

    return (
        <>
        <div className="container-fluid bg-dark px-0">
            <div className="row gx-0">
                <div className="col-lg-3 bg-dark d-none d-lg-block">
                    <a href="index.php" className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">
                        <h1 className="m-0 text-primary text-uppercase">PAWESOME</h1>
                    </a>
                </div>
                <div className="col-lg-9">
                    <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
                        <a href="index.php" className="navbar-brand d-block d-lg-none">
                            <h1 className="m-0 text-primary text-uppercase">Pawesome</h1>
                        </a>
                        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav mr-auto py-0">
                                <a href="index.php" className="nav-item nav-link">Home</a>
                                <a href="varities.php" className="nav-item nav-link" >Varieties</a>
                                <a href="posting.php" className="nav-item nav-link">Post a pet</a>
                                <a href="testimonial.php" className="nav-item nav-link">Testimonials</a>
                                <a href="room.php" className="nav-item nav-link active">Pets</a>

                                <a href="contact.php" className="nav-item nav-link">Contact</a>
                                <a href="donation.php" className="nav-item nav-link">Donate</a>
                            </div>
                            <a href="http://localhost:8081/Pawsome/login.jsp" className="btn btn-primary rounded-0 py-4 px-md-5 d-none d-lg-block">Sign In / Log In<i className="fa fa-arrow-right ms-3"></i></a>                        </div>
                    </nav>
                </div>
            </div>
        </div>


        <div className="container-fluid page-header mb-5 p-0" style={{backgroundImage: `url(${Carousel})`}}>
            <div className="container-fluid page-header-inner py-5">
                <div className="container text-center pb-5">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">Pets 🐶</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb justify-content-center text-uppercase">
                            <li className="breadcrumb-item"><a href="index.php">Home</a></li>
                            <li className="breadcrumb-item text-white active" aria-current="page">Pets</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>


        <div className="container-fluid booking pb-5 wow fadeIn" data-wow-delay="0.1s">
            <div className="container">
                <div className="bg-white shadow" style={{padding: 35 + 'px'}}>
                    <div className="row g-2">
                        <div className="col-md-10">
                            <div className="row g-2">
                                <div className="col-md-6">
                                    <select className="form-select" id="filterId">
                                        <option selected value="all">All</option>
                                        <option value="dog">Dog</option>
                                        <option value="cat">Cat</option>
                                        <option value="rabbit">Rabbit</option>
                                        <option value="fish">Fish</option>
                                        <option value="rat">Rat</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary w-100" onclick="filter()">Filter</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    );
}
export default Sample;