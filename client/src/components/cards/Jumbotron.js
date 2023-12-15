export default function Jumbotron({
  title,
  subTitle = "Welcome to My E-commerce",
  img = "./images/baobab.png.jpg",
}) {
  return (
    <div className="hero border-1 pb-3">
      <div className="card bg-dark text-white border-0 mx-3">
        <img
          src={img}
          className="img img-responsive"
          height="600px"
          alt="Baobab"
        />
        <div className="card-img-overlay d-flex align-items-center">
          <div className="container">
            <h5 className="card-title fs-1 text fw-lighter">{title}</h5>
            <p className="card-text fs-5 d-none d-sm-block ">{subTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
