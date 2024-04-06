const About = () => {
    return (
        <div className="main-container">
            <div className="main-display">
                <div className="center-container">
                    <h1>About this website</h1>
                    <h3>This app showcases the cool data that we have about space launches!</h3>
                    <h3>
                        It was created by <a href="https://github.com/lausan3" target="_blank">Anthony L</a> as a part of CodePath's WEB102 Intermediate Web Development course
                        where he learned React and how to build cool webapps!
                    </h3>
                    <h3>
                        This webapp uses <a href="https://ll.thespacedevs.com/2.2.0/swagger/#/" target="_blank">The Space Devs</a>'s 
                        Launch Data API!
                    </h3>
                </div>
            </div>
        </div>
    );
  };
  
  export default About;